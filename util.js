const { Configuration, OpenAIApi } = require("openai");

const fs = require("fs");

// Configuration 라이브러리를 통해 나의 OpenAI API Key를 설정한다.
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// 이미지 생성을 위해 OpenAIAPI 라이브러리를 가져온다.
const openai = new OpenAIApi(configuration);

// 1. 사이즈 랜덤 : small : 80%, medium : 15%, big : 5%
// 2. 드로잉 방식 랜덤 : 스튜디오, 유화, 앤디워홀, 모네, 
// 3. 동물 랜덤 : 고양이 : 20%, 강아지 : 59.9%, 라쿤 : 15%, 알파카 : 5%, 유니콘 : 0.1%
// 4. 동물 색상 랜덤
// 5. 동물 속성 랜덤
// 6. 배경 랜덤 : 사이버 펑크 백룸, 
// 기본 : 

// 1. 사이즈 랜덤
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
// 3. 동물 랜덤
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

// 이미지 생성 함수
const generateImage = async (req, res) => {
  const { prompt, size } = req.body;

  // 요청받은 값을 토대로 이미지 사이즈를 설정한다. 
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

    // 생성된 이미지의 URL 추출
    const imageUrl = response.data.data[0].url;

    // API 로 해당 정보 보내기

    // 생성된 이미지의 URL과 성공되었다는 결과값 리턴
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

module.exports = { generateImage };