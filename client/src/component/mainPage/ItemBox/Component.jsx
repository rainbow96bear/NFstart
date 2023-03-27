import { useState } from "react";
import styled from "styled-components";
import { IoChatbubblesOutline } from "react-icons/io5";
import SellModal from "../../sell modal/Container/SellModalContain";

const ItemBoxComp = ({
  handleMouseOver,
  handleMouseOut,
  zIndex,
  setMain,
  main,
  theme,
  NFlist,
  item,
  nowPageUser,
}) => {
  const [on, setOn] = useState(false);
  const click = () => {
    setOn(!on);
  };

  return (
    <ItemBox>
      <ItemCase>
        <NameBox theme={theme}>
          {item.nickName} <IoChatbubblesOutline size={"30"} />
        </NameBox>

        <MainImg
          theme={theme}
          zIndex={zIndex}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onClick={() => {
            click();
          }}
        >
          {main && <img alt="" src={`/uploads/${main.filename}`} />}
        </MainImg>
        <SubBox theme={theme}>
          {NFlist?.map((item, idx) => (
            <div
              key={`subImg-${idx}`}
              onClick={() => {
                setMain(item);
              }}
            >
              {main && <img alt="" src={`/uploads/${item.filename}`} />}
            </div>
          ))}
        </SubBox>
      </ItemCase>
      <SellModal
        isOpen={on}
        setIsOpen={setOn}
        click={click}
        main={main}
        nowPageUser={nowPageUser}
      />
    </ItemBox>
  );
};
// 가로 세로는 반응형 생각해서 다시 잡기
const ItemBox = styled.div`
  width: 80%;
  max-width: 400px;
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
  justify-content: space-between;
  align-items: center;
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
    width: 100%;
    padding: 10px;
    height: 100%;
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
