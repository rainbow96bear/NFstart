import { useState } from "react";
import styled from "styled-components";

const ItemBoxComp = () => {
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
      <MainImg
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
      <SubBox>
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
    </ItemBox>
  );
};
// 가로 세로는 반응형 생각해서 다시 잡기
const ItemBox = styled.div`
  width: 500px;
  height: 640px;
  border: 1px solid red;
  margin: 20px 0;
`;
// MainImg는 반응형 정사각형 만들어야한다.
const MainImg = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  & > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid blue;
    z-index: ${(props) => {
      return props.zIndex.toString();
    }};
  }
  & > div {
    font-size: 3rem;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background-color: lightblue;
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
  height: 140px;
  padding: 20px;
  justify-content: space-between;

  & div > img {
    border: 1px solid yellow;
    width: 100px;
    height: 100px;
  }
`;

export default ItemBoxComp;
