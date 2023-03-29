import styled from "styled-components";
import SellModalContain from "../../sell modal/Container/SellModalContain";
import { useState } from "react";

const ItemBoxComp = ({ item, nowPageUser, NFlist }) => {
  const [on, setOn] = useState(false);
  const click = () => {
    setOn(!on);
  };

  return (
    <>
      <ItemBox
        onClick={() => {
          click();
        }}
      >
        <div className="icon"></div>
        {item && <img alt="" src={`/uploads/${item.filename}`} />}
      </ItemBox>
      <SellModalContain
        isOpen={on}
        setIsOpen={setOn}
        click={click}
        main={item}
        nowPageUser={nowPageUser}
        NFlist={NFlist}
      />
    </>
  );
};
export default ItemBoxComp;
// 가로 세로는 반응형 생각해서 다시 잡기
const ItemBox = styled.div`
  position: relative;
  width: 33%;

  &::after {
    display: block;
    content: "";
    padding-bottom: 100%;
  }
  & > img {
    padding: 3px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  & > img:hover {
    > img {
      opacity: 0.5;
    }
    position: absolute;
    z-index: 999;
    background-color: rgba(0, 187, 255, 0.2);
  }
`;
