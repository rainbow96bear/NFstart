function randomSize() {
    const randNum = Math.random() * 100; // 0부터 100 사이의 랜덤한 수 생성

    if (randNum < 80) {
        return "small";
    } else if (randNum < 95) {
        return "medium";
    } else {
        return "big";
    }
}


function randomAnimal() {
    const randNum = Math.random() * 100; // 0부터 100 사이의 랜덤한 수 생성
    if (randNum < 59.9) {
        return "dog";
    } else if (randNum < 79.9) {
        return "cat";
    } else if (randNum < 94.9) {
        return "raccoon";
    } else if (randNum < 99.9) {
        return "alphaca";
    } else {
        return "unicorn";
    }
}



const generateImage = async (req, res) => {
    const { prompt, size } = req.body;

    const imageSize = size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024";

    try {

        const animal = randomAnimal();
        console.log(animal);

        // 아래의 입력값을 토대로 AI Image를 생성한다.
        const response = await openai.createImage({

            // 확률 정보를 메타 데이터로 전달하기
            // 배열 6개를 만들어서 확률에 따라 
            // 나중에 랜덤으로 돌리기 - 배경(분홍색하늘/사이버펑크백룸), 동물(공양이/강아지/유니콘/해커), 아이템(농구공/붓/축구공), 스타일(앤디워홀/하이퀄리티/명화)
            // prompt: prompt + ", High quality photorealistic oil painting",
            // prompt: "white background, center " + prompt + " coin, High quality photorealistic oil painting",
            // prompt: "white background, center" + prompt + " basketball, High quality photorealistic oil painting",
            // prompt: "center big " + prompt + ", cyberpunk backroom background, basketball, High quality photorealistic oil painting",
            // prompt: "center big " + prompt + ", High quality photorealistic oil painting",
            // prompt: "center big " + animal + ", High quality photorealistic oil painting",

            prompt: "center big " + animal + ", High quality photorealistic oil painting",
            n: 2,
            size: imageSize,
        });

        const imageUrl = response.data.data[0].url;

        res.status(200).json({
            success: true,
            data: imageUrl,
        });


    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
        res.status(400).json({
            success: false,
            error: "API Key가 만료되었습니다. 키를 새로 생성해 주세요. (https://platform.openai.com/account/api-keys)",
        });
    }
};

module.exports = { randomSize, randomAnimal, generateImage }