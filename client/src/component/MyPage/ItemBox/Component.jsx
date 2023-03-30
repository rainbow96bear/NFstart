import styled from "styled-components";
import SellModalContain from "../../sell modal/Container/SellModalContain";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { useState } from "react";

const ItemBoxComp = ({ item, nowPageUser, NFlist }) => {
  const [on, setOn] = useState(false);
  const click = () => {
    setOn(!on);
  };
  // console.log(item);
  return (
    <>
      <ItemBox
        onClick={() => {
          click();
        }}
      >
        {item && (
          <>
            <div className="icon">
              <div>
                <div>
                  <p>
                    <AiFillHeart size={"25"} />
                  </p>
                  <p>{item.favorite}</p>
                </div>
                {item.price == 0 ? (
                  <></>
                ) : (
                  <div>
                    <p>
                      <AiOutlineDollarCircle size={"25"} />
                    </p>
                    <p>{item.price}</p>
                  </div>
                )}
              </div>
              <div>
                <img alt="" src={`/uploads/${item.filename}`} />
              </div>
            </div>
          </>
        )}
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
  //전체
  position: relative;
  width: 33%;
  height: 33%;
  // 아이콘들 배치
  .icon {
    display: flex;
    width: 100%;
    height: 220px;
    justify-content: center;
    align-items: center;
    z-index: 5;
    //
    > div:first-child {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      > div {
        width: 35%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        > p {
          width: 30px;
          display: flex;
          align-items: center;
          padding: 5px;
        }
      }
    }
    > div:last-child {
      width: 220px;
      height: 220px;
      position: relative;
      > img {
        padding: 3px;
        position: absolute;
        top: 0;
        left: 0;
        width: inherit;
        height: inherit;
        cursor: pointer;
      }
      & > img:hover {
        opacity: 0.3;
      }
    }
  }
`;
