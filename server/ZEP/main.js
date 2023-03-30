// load sprite
let monster = App.loadSpritesheet('monster.png', 96, 96, {
    // 정의된 기본 애니메이션
    left: [8, 9, 10, 11],
    up: [12, 13, 14, 15],
    down: [4, 5, 6, 7],
    right: [16, 17, 18, 19],
}, 8);

const STATE_INIT = 3000;
const STATE_READY = 3001;
const STATE_PLAYING = 3002;
const STATE_JUDGE = 3004;
const STATE_END = 3005;

let _start = false; // 게임 시작 여부
let _players = App.players; // App.players : 총 플레이어 수
let _lastSurvivor = null;
let _zombieKing = [];
let _state = STATE_INIT;
let _stateTimer = 0; // 상태 값을 확인하는 타이머
let _live = 0; // 생존자 수
let _resultstr;

function startApp() {
    if (_players.length > 2) {
        // 좀비 수 설정
        let zombiCnt = Math.floor(_players.length * 0.1);
        if (zombiCnt < 1)
            zombiCnt = 1;

        let allPlayer = [];
        let zombieIdx = [];

        for (let i = 0; i < _players.length; ++i) {
            allPlayer.push(_players[i]);
        }

        for (let i = 0; i < zombiCnt; ++i) {
            let index = Math.floor(allPlayer.length * Math.random());
            if (!zombieIdx.includes(allPlayer[index].id)) {
                zombieIdx.push(allPlayer[index].id);
                allPlayer.splice(index, 1);
            }
        }

        // 플레이어에게 좀비 속성 부여
        for (let i in _players) {
            let p = _players[i];
            // 태그를 이용한 옵션 데이터 생성 및 활용
            p.tag = {};
            if (zombieIdx.includes(p.id)) {
                p.tag.zombie = true;
                p.tag.attack = 0;
            }
            else {
                p.tag.zombie = false;
                p.tag.attack = 0;
                _live++;
            }

            // 플레이어 속성 변경 시 반드시 호출하여 업데이트 한다.
            p.sendUpdated();
        }

        _start = true;
    }
    else {
        App.showCenterLabel(`플레이 가능 인원: 3명 이상`);
        startState(STATE_END);
    }
}



// 플레이어들이 채팅창에 입력하는 모든 채팅에 대해 호출 되는 이벤트
// !로 시작하는 텍스트는 채팅창에 나오지 않으나, onSay 함수에는 사용 가능
App.onSay.Add(function (player, text) {
    if (text == "/start") {
        // 게임 시작
        App.showCenterLabel(`${player}님이 게임을 시작하고 싶어 합니다.`);
        startState(true);
    } else {
        App.showCenterLabel(`${player}님이 ${text} 라고 말하였습니다.`);
    }
});

function startState(state) {
    _state = state;
    _stateTimer = 0;

    switch (_state) {
        case STATE_INIT:
            startApp();
            break;
        case STATE_READY:
            App.showCenterLabel("The game will start soon.");
            for (let i in _players) {
                let p = _players[i];
                p.moveSpeed = 0;
                // 좀비 속성 변경
                if (p.tag.zombie) {
                    p.title = '<P:ZERO>';
                    p.sprite = monster;
                }
                p.sendUpdated();
            }
            break;
        case STATE_PLAYING:
            for (let i in _players) {
                let p = _players[i];
                // 플레이어 상태에 따라 속도 및 레이블 텍스트 변경
                if (p.tag.zombie) {
                    p.moveSpeed = 85;
                    p.showCenterLabel('사람들을 감염시키세요!');
                }
                else {
                    p.moveSpeed = 80;
                    p.showCenterLabel('좀비로부터 살아남으세요!');
                }
                p.sendUpdated();
            }
            break;
        case STATE_JUDGE:
            for (let i in _players) {
                let p = _players[i];
                p.moveSpeed = 0;
                p.sendUpdated();
            }

            judgement(_live);
            break;
        case STATE_END:
            _start = false;

            for (let i in _players) {
                let p = _players[i];
                p.moveSpeed = 80;
                p.title = null;
                p.sprite = null;
                p.sendUpdated();
            }

            // 맵의 모든 객체 지우기
            Map.clearAllObjects();
            break;
    }

}

function checkSuvivors() {
    let resultlive = 0;
    for (let i in _players) {
        let p = _players[i];
        if (!p.tag.zombie) {
            _lastSurvivor = p;
            ++resultlive;
        }
    }

    return resultlive;
}

function judgement(number) {
    // 모든 플레이어 중 가장 많은 공격 횟수
    let attack = 0;

    for (let i in _players) {
        let p = _players[i];

        if (p.tag.attack > attack)
            attack = p.tag.attack;
    }

    zombieKing = [];
    for (let i in _players) {
        let p = _players[i];

        if (p.tag.attack == attack)
            zombieKing.push(p);
    }

    let index = Math.floor(Math.random() * zombieKing.length);

    if (number == 1)
        // 생존자가 1명 남았을 때(승리)
        // 승리했을 때 api 요청 보내기
        // 승리 : ai 뽑기, 좀비 : 좀비 뽑기 티켓 +1 api 요청
        resultstr = `${_lastSurvivor.name} 이(가) 마지막 생존자입니다!\n최강 좀비 : [` + zombieKing[index].name + '] 감염시킨 횟수 : ' + attack;
    else if (number == 0)
        // 생존자가 없을 때
        resultstr = `No survivors.\nThe Strongest Zombie [` + zombieKing[index].name + '] Number of infections : ' + attack;
}

App.onStart.Add(function () {
    startState(STATE_INIT);
});

// 플레이어가 스페이스에 입장 했을 때 이벤트
App.onJoinPlayer.Add(function (p) {
    p.tag = {
        zombie: false,
        attack: 0,
    };

    if (_start) {
        p.tag.zombie = true;
        p.sprite = monster;
        p.sendUpdated();

        judgement(checkSuvivors());
    }
    _players = App.players;
});

// 플레이어가 스페이스를 나갔을 때 이벤트
App.onLeavePlayer.Add(function (p) {
    if (_start) {
        judgement(checkSuvivors());
    }

    p.title = null;
    p.sprite = null;
    p.moveSpeed = 80;
    p.sendUpdated();

    _players = App.players;
});


// 게임 블록을 밟았을 때 호출되는 이벤트
App.onDestroy.Add(function () {
    App.stopSound();
});

// 플레이어가 다른 플레이어와 부딪혔을 때 
App.onPlayerTouched.Add(function (sender, target, x, y) {
    if (_state != STATE_PLAYING)
        return;

    if (!sender.tag.zombie)
        return;

    if (target.tag.zombie)
        return;

    target.tag.zombie = true;
    target.sprite = monster;
    sender.tag.attack += 1;
    target.sendUpdated();

    _live = checkSuvivors();
    if (_live >= 2) {
        App.showCenterLabel(`${target.name} 님이 감염되었습니다!\n(${_live} 생존자!)`);
        return;
    }
    else
        startState(STATE_JUDGE);
});

// 20ms 마다 호출되는 업데이트
// param1 : deltatime ( elapsedTime )
App.onUpdate.Add(function (dt) {
    if (!_start)
        return;

    _stateTimer += dt;

    switch (_state) {
        case STATE_INIT:
            App.showCenterLabel("좀비가 되어 사람들을 감염시키세요. 호스트가 더 빠릅니다.\n사람들은 최선을 다해 도망치고 마지막 생존자가 되면 승리합니다.");

            if (_stateTimer >= 5)
                startState(STATE_READY);
            break;
        case STATE_READY:
            if (_stateTimer >= 3)
                startState(STATE_PLAYING);
            break;
        case STATE_PLAYING:
            break;
        case STATE_JUDGE:
            App.showCenterLabel(resultstr);

            if (_stateTimer >= 5)
                startState(STATE_END);
            break;
        case STATE_END:
            break;
    }
});





















// 플레이어가 들어왔을 때, 그 사람의 metamask 계좌를 출력한다.
App.onJoinPlayer.Add(function (player) {
    App.showCenterLabel(`${player} 님이 입장하셨습니다.`);
    // 칭호를 붙인다.
});

// 플레이어가 지정된 키를 눌렀을 때 실행(90 : z)
App.addOnKeyDown(90, () => {
    App.showCenterLabel(`z 키를 눌렀습니다.`);
});



// // App 실행 시에 최초로 호출되는 이벤트 (유저 진입 전)
// // Normal App과 Sidebar App은 Script 적용 후 맵이 실행될 때 호출
// App.onInit.Add(function () {
//     App.showCenterLabel(`App이 실행되었습니다.`);
// });

// // 플레이어 모두 진입 시 최초로 시작되는 이벤트
// App.onStart.Add(function () {
//     App.showCenterLabel(`무언가 시작되었다.`);
// });

// // 20ms 마다 호출되는 이벤트
// // dt: deltatime(전 프레임이 완료되기까지 걸린 시간)
// App.onUpdate.Add(function (dt) {
// });

// // App 종료 시 모든 플레이어를 App에서 나가게 함
// App.onLeavePlayer.Add(function (player) {
// });

// // App 종료 시 마지막으로 호출
// // Normal App과 Sidebar App은 별도의 종료
// App.onDestroy.Add(function () {
//     // 여기에서 해당 정보를 저장하는 database 저장 api를 호출하면 될듯
// });



// // EC2 연결 후 주소 변경하기
// App.httpPost("https://postman-echo.com/post", {
//     }, {
//         name: 'zepscript'
//     }, (res) => {
//         res = JSON.parse(res);
//         App.sayToAll(`요청링크 ${res.url}`, 0xFFFFFF);
//         App.sayToAll(`이름은 ${res.form.name}`, 0xFFFFFF);
// });


// App.players : 모든 플레이어 리스트



// App.httpGet("https://postman-echo.com/get?name=tommy&age=18", null, (res) => {
//     res = JSON.parse(res);

//     App.sayToAll(`이름은 ${res.args.name}`, 0xFFFFFF);
//     App.sayToAll(`나이는 ${res.args.age}`, 0xFFFFFF);
// });

// App.httpPost("http://localhost:8080/api/", {
// }, {
//     name: 'zepscript'
// }, (res) => {
//     res = JSON.parse(res);
//     App.sayToAll(`요청링크 ${res.url}`, 0xFFFFFF);
//     App.sayToAll(`이름은 ${res.form.name}`, 0xFFFFFF);
// });