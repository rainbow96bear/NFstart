// import styled from "react-styled";
import { SiMaterialdesign } from "react-icons/si";
import { BiFoodMenu } from "react-icons/bi";

import {
  AiOutlineTeam,
  AiOutlineMenu,
  AiOutlineThunderbolt,
} from "react-icons/ai";
import { MdEditAttributes, MdTimeline } from "react-icons/md";

import {
  BsShareFill,
  BsThreeDots,
  BsEye,
  BsArrowThroughHeart,
} from "react-icons/bs";
import { TbTriangleSquareCircle, TbArrowBarToDown } from "react-icons/tb";

import Modal from "react-modal";
import ReactModal from "react-modal";
import styled from "styled-components";

const SellModal = ({ click, isOpen, item }) => {
  console.log("item", item);
  Modal.setAppElement("#root");
  return (
    <ReactModal isOpen={isOpen}>
      <ModalBox>
        <div>
          <div>
            <div>
              <img src="/imgs/eth.png" />
            </div>
            <div>
              <img src="/imgs/openInNew.png" />
            </div>
            <div>
              <img src="/imgs/heart.png" />
            </div>
          </div>
          <div>
            <img src={item.img} />
          </div>
          <div>
            <div>
              <div>
                <AiOutlineMenu size={"30"} />
              </div>
              <div>description</div>
            </div>
            <div>
              <TbArrowBarToDown size={"30"} />
            </div>
          </div>
          <div>
            <div>
              <div>
                <AiOutlineTeam size={"30"} />{" "}
              </div>
              <div>By Team Name </div>
            </div>
            <div>
              <TbArrowBarToDown size={"30"} />
            </div>
          </div>
          <div>
            <div>
              <div>
                <div>
                  <MdEditAttributes size={"30"} />
                </div>
                <div>Attributes</div>
              </div>
              <div>
                <TbArrowBarToDown size={"30"} />
              </div>
            </div>
            <div>
              <div>box1</div>
              <div>box2</div>
              <div>box3</div>
              <div>box4</div>
            </div>
          </div>

          <div>
            <div>
              <div>
                <BiFoodMenu size={"30"} />
              </div>
              <div>About seller Team</div>
            </div>
            <div>
              <TbArrowBarToDown size={"30"} />
            </div>
          </div>
          <div>
            <div>
              <div>
                <SiMaterialdesign size={"30"} />
              </div>
              <div>details</div>
            </div>
            <div>
              <TbArrowBarToDown size={"30"} />
            </div>
          </div>
        </div>
        <div>
          <div>
            {item.seller}
            <div>
              <BsShareFill size={"30"} /> <BsThreeDots size={"30"} />
            </div>
          </div>
          <div>
            {item.name}#{item.number}
            <div>Ownd by 45666</div>
          </div>

          <div>
            <div>
              {" "}
              <BsEye size={"30"} />
              {item.view}views
            </div>
            <div>
              <BsArrowThroughHeart size={"30"} />
              {item.favorites}
              favorites
            </div>
            <div>
              <TbTriangleSquareCircle size={"30"} /> {item.PFPS}favorite PFPs
            </div>
          </div>
          <div>
            <div>sale ends (year)년 (month)월 (days)일 </div>
            <div>
              <div>
                Hour <div>time(Hour)</div>
              </div>
              <div>
                Minutes <div>time(Minutes)</div>
              </div>
              <div>
                Seconds <div>time(Seconds)</div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div>Current price</div>
              <div>{item.price} ETH</div>
            </div>
            <div>
              <div>
                <button>Buy now</button>
              </div>
              <div>
                <button>make offer</button>{" "}
              </div>
            </div>
          </div>
          <div>
            <div>
              <div>
                <MdTimeline size={"30"} />
              </div>
              <div>Price History</div>
            </div>
            <div>Grap</div>
          </div>
          <div>
            <div>Listing</div>
            <div>
              <div>Price</div>
              <div>USD Price</div>
              <div>Expiration</div>
              <div>From</div>
            </div>
            <div>
              <div>Price :Eth</div>
              <div>USD Price :$</div>
              <div>Expiration :in number hours</div>
              <div>Form : ID</div>
            </div>
            <div>
              <button>
                <AiOutlineThunderbolt size={"20"} />
                Buy
              </button>
            </div>
          </div>
          <div>
            <div>Offers</div>
            <div>
              <div>Price</div>
              <div>USD Price</div>
              <div>Expiration</div>
              <div>From</div>
            </div>
            <div>
              <div>Price :Eth</div>
              <div>USD Price :$</div>
              <div>Expiration :in number hours</div>
              <div>Form : ID</div>
            </div>
          </div>
        </div>
      </ModalBox>

      <Okbutton>
        <button onClick={() => {}}>확인</button>

        <button
          onClick={() => {
            click();
          }}
        >
          취소
        </button>
      </Okbutton>
    </ReactModal>
  );
};
export default SellModal;

const ModalBox = styled.div`
  display: flex;
  width: 85%;
  height: 95%;
  background-color: rgb(245, 245, 245);
  /* background-image: linear-gradient(0.47turn, #e2938f, #ae7dbe, #6f67f1); */
  justify-content: space-around;
  margin: auto;
  font-size: 20px;
  & > div:first-child {
    display: flex;
    flex-direction: column;
    width: 45%;
    justify-content: space-around;

    & > div:first-child {
      display: flex;
      align-items: center;
      font-weight: 50px;
      height: 42px;
      width: 100%;
      justify-content: space-between;
      border: 1px solid rgba(53, 56, 64, 0.3);
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      border-bottom: none;
      & > div:first-child {
        display: flex;
        width: 7%;
        margin-left: 3%;
        & > img {
          display: flex;
          width: 100%;
        }
      }
      & > div:nth-child(2) {
        display: flex;
        width: 7%;
        margin-left: 55%;

        flex-direction: row-reverse;
        & > img {
          display: flex;
          width: 100%;
        }
      }
      & > div:nth-child(3) {
        display: flex;
        width: 7%;
        flex-direction: row-reverse;
        margin-right: 5%;

        & > img {
          display: flex;
          width: 100%;
        }
      }
    }
    & > div:nth-child(2) {
      position: relative;
      display: flex;
      width: 100%;
      height: 60%;
      overflow: hidden;
      margin: 0 auto;
      border: 1px solid rgba(53, 56, 64, 0.3);
      border-top: none;

      img {
        border-radius: 10px;
        width: 100%;
        object-fit: contain;
      }
    }
    & > div:nth-child(3) {
      display: flex;
      width: 100%;
      flex-direction: row;
      font-size: 20px;
      border: 1px solid rgba(53, 56, 64, 0.3);

      justify-content: flex-start;

      & > div:first-child {
        display: flex;
        width: 100%;

        & > div:nth-child(2) {
          display: flex;
          flex-direction: row;
        }
      }
      & > div:last-child {
        display: flex;
      }
    }
    & > div:nth-child(4) {
      display: flex;
      border: 1px solid rgba(53, 56, 64, 0.3);
      justify-content: space-between;
      text-align: center;

      align-items: center;
      & > div:first-child {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      & > div:last-child {
        display: flex;
      }
    }
    & > div:nth-child(5) {
      display: flex;
      width: 100%;
      font-size: 20px;
      border: 1px solid rgba(53, 56, 64, 0.3);
      flex-direction: column;

      & > div:first-child {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        & > div:first-child {
          align-items: center;
          justify-content: flex-start;
          text-align: center;
          display: flex;
        }
        & > div:last-child {
          display: flex;
          justify-content: space-between;
        }
      }
      & > div:last-child {
        display: flex;
      }

      & > div img {
        display: flex;
        width: 38%;
      }
    }
    & > div:nth-child(6) {
      display: flex;
      border: 1px solid rgba(53, 56, 64, 0.3);

      justify-content: space-between;
      & > div:first-child {
        align-items: center;
        justify-content: flex-start;
        text-align: center;
        display: flex;
      }
      & > div:last-child {
        display: flex;
        justify-content: space-between;
      }
    }
    & > div:nth-child(7) {
      display: flex;
      border: 1px solid rgba(53, 56, 64, 0.3);
      justify-content: space-between;
      & > div:first-child {
        align-items: center;
        justify-content: flex-start;
        text-align: center;
        display: flex;
      }
      & > div:last-child {
        display: flex;
        justify-content: space-between;
      }
    }
  }
  & > div:nth-child(2) {
    display: flex;
    width: 50%;
    flex-direction: column;
    justify-content: space-around;
    font-size: 30px;

    & > div:first-child {
      display: flex;
      width: 100%;
      justify-content: space-between;
      & > div {
        display: flex;
        gap: 13px;
      }
    }
    & > div:nth-child(2) {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      text-align: center;
      & > div:first-child {
        display: flex;
        font-size: 20px;
        justify-content: space-around;
      }
    }
    & > div:nth-child(3) {
      display: flex;
      font-size: 28px;
      justify-content: space-around;
    }
    & > div:nth-child(4) {
      display: flex;
      flex-direction: column;
      font-size: 22px;
      border: 1px solid rgba(53, 56, 64, 0.3);
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;

      & > div:nth-child(2) {
        display: flex;
        justify-content: space-around;
        font-size: 30px;
      }
    }
    & > div:nth-child(5) {
      display: flex;
      width: 100%;
      font-size: 16px;
      border: 1px solid rgba(53, 56, 64, 0.3);
      flex-direction: column;
      & > div:first-child {
        display: flex;
        flex-direction: column;
        font-size: 28px;

        & > div:first-child {
          display: flex;
          font-size: 20px;
        }
      }
      & > div:nth-child(2) {
        display: flex;
        width: 100%;
        justify-content: space-around;
        & > div button {
          position: relative;
          border: 1px solid black;
          display: inline-block;
          padding: 15px 30px;
          border-radius: 15px;
          transition: 0.6s cubic-bezier(0.77, 0, 0.175, 1); // ease-in-out-quartic;

          &::before {
            position: absolute;
            content: "";
            top: 0;
            left: 0;
            z-index: -1;
            width: 100%;
            height: 100%;
            background: var(--btn-bg);
            transform: scaleX(0);
            transform-origin: right;
            transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1);
          }

          &:hover {
            color: white;
            background: transparent;
            background-image: linear-gradient(
              0.47turn,
              #e2938f,
              #ae7dbe,
              #6f67f1
            );

            &::before {
              transform: scaleX(1);
              transform-origin: left;
            }
          }
        }
      }
    }
    & > div:nth-child(6) {
      display: flex;
      flex-direction: column;
      border: 1px solid rgba(53, 56, 64, 0.3);
      & > div:first-child {
        display: flex;
      }
    }
    & > div:nth-child(7) {
      display: flex;
      flex-direction: column;
      border: 1px solid rgba(53, 56, 64, 0.3);

      & > div:first-child {
        display: flex;
      }
      & > div:nth-child(2) {
        display: flex;
        width: 80%;
        justify-content: space-around;
      }
      & > div:nth-child(3) {
        display: flex;
        width: 80%;
        justify-content: space-around;
        font-size: 15px;
      }
      & > div:nth-child(4) {
        display: flex;
        flex-direction: row-reverse;
        font-size: 15px;
      }
      & > div button {
        position: relative;
        border: 1px solid black;
        display: inline-block;
        padding: 15px 30px;
        border-radius: 15px;
        transition: 0.6s cubic-bezier(0.77, 0, 0.175, 1); // ease-in-out-quartic;

        &::before {
          position: absolute;
          content: "";
          top: 0;
          left: 0;
          z-index: -1;
          width: 100%;
          height: 100%;
          background: var(--btn-bg);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1);
        }

        &:hover {
          color: white;
          background: transparent;
          background-image: linear-gradient(
            0.47turn,
            #e2938f,
            #ae7dbe,
            #6f67f1
          );

          &::before {
            transform: scaleX(1);
            transform-origin: left;
          }
        }
      }
    }
    & > div:nth-child(8) {
      display: flex;
      flex-direction: column;
      border: 1px solid rgba(53, 56, 64, 0.3);
      & > div:nth-child(2) {
        display: flex;
        justify-content: space-around;
      }
      & > div:nth-child(3) {
        display: flex;
        justify-content: space-around;
        font-size: 18px;
      }
    }
  }
`;
const Okbutton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > button {
    width: 15%;
    position: relative;
    border: 1px solid black;
    display: inline-block;
    padding: 8px 10px;
    border-radius: 15px;

    transition: 0.6s cubic-bezier(0.77, 0, 0.175, 1); // ease-in-out-quartic;

    &::before {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      background: var(--btn-bg);
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1);
    }

    &:hover {
      color: white;
      background: transparent;
      background-image: linear-gradient(0.47turn, #e2938f, #ae7dbe, #6f67f1);

      &::before {
        transform: scaleX(1);
        transform-origin: left;
      }
    }
  }
`;
