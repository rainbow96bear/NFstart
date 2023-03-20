import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const ItemBoxComp = () => {
  const theme = useSelector((state) => state.theme);
  const testArr = [
    "https://cover.millie.co.kr/service/cover/179561364/59ede77dd98f4da8bbc057bd8282ad17.jpg?w=125&q=80",
    "https://cover.millie.co.kr/service/cover/179548325/60e43be598bb4da9ab50b39f70c11895.jpg?w=125&q=80",
    "https://cover.millie.co.kr/service/cover/179574180/196635eb017a477385fbe7cec0e7dbf0.jpg?w=125&q=80",
    "https://cover.millie.co.kr/service/cover/179559925/fe449328632a454aadc7be506b0658e5.jpg?w=125&q=80",
  ];
  const [mainImg, setMainImg] = useState(testArr[0]);
  const [zIndex, setZindex] = useState("3");

  const handleMouseOver = () => {
    setZindex("1");
  };

  const handleMouseOut = () => {
    setZindex("3");
  };

  return (
    <ItemBox>
      <ItemCase>
        <NameBox theme={theme}>유저 닉네임 혹은 아이디</NameBox>
        <MainImg
          theme={theme}
          zIndex={zIndex}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}>
          <img src={mainImg} />
          <div
            onClick={() => {
              console.log("사러가기");
            }}>
            구매
          </div>
        </MainImg>
        <SubBox theme={theme}>
          {testArr.map((item, idx) => (
            <div
              key={`subImg-${idx}`}
              onClick={() => {
                setMainImg(item);
              }}>
              <img src={item}></img>
            </div>
          ))}
        </SubBox>
      </ItemCase>
    </ItemBox>
  );
};
// 가로 세로는 반응형 생각해서 다시 잡기
const ItemBox = styled.div`
  width: 80%;
  max-width: 500px;
  border: none;
  border-radius: 22px;
  margin: 20px 0;
  padding: 6px;
  box-shadow: 6px 6px 2px 1px rgba(0, 0, 255, 0.2);
  background-image: linear-gradient(0.47turn, #e2938f, #ae7dbe, #6f67f1);
`;
const ItemCase = styled.div`
  border-radius: 22px;
  overflow: hidden;
`;
// MainImg는 반응형 정사각형 만들어야한다.
const NameBox = styled.div`
  display: flex;
  padding: 20px 20px 10px 20px;
  background-color: ${(props) =>
    props.theme == "dark" ? "#00002a" : "#fdfdfd"};
`;
const MainImg = styled.div`
  position: relative;
  width: 100%;
  background-color: ${(props) =>
    props.theme == "dark" ? "#00002a" : "#fdfdfd"};
  &::after {
    display: block;
    content: "";
    padding-bottom: 100%;
  }
  & > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 10px;
    height: 100%;
    // border: 1px solid blue;
    z-index: ${(props) => {
      return props.zIndex.toString();
    }};
  }
  & > div {
    font-size: 3rem;
    width: 100%;
    height: 100%;
    padding: 10px;
    position: absolute;
    top: 0;
    background-color: ${(props) =>
      props.theme == "dark" ? "#00002a" : "#fdfdfd"};
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.5;
    z-index: 2;
  }
`;
// SubBox안의 div는 반응형 원 만들어야한다.
const SubBox = styled.div`
  display: flex;
  height: fit-content;
  justify-content: space-between;
  padding: 20px;
  background-color: ${(props) =>
    props.theme == "dark" ? "#00002a" : "#fdfdfd"};
  & > div {
    // border: 1px solid blue;
    border-radius: 30%;
    overflow: hidden;
    position: relative;
    width: 20%;
  }
  & > div::after {
    display: block;
    content: "";
    padding-bottom: 100%;
  }
  & > div > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export default ItemBoxComp;
