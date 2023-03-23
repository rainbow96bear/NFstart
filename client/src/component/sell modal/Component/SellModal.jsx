// import styled from "react-styled";
import { SiMaterialdesign } from "react-icons/si";
import { MdLocalOffer } from "react-icons/md";
import { FaEthereum } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import {
  AiOutlineTeam,
  AiOutlineMenu,
  AiOutlineThunderbolt,
  AiOutlineFieldTime,
} from "react-icons/ai";

import { BsShareFill, BsThreeDots, BsFillHeartFill } from "react-icons/bs";
import { TbArrowBarToDown } from "react-icons/tb";

import Modal from "react-modal";
import ReactModal from "react-modal";
import styled from "styled-components";

const SellModal = ({ click, isOpen, main }) => {
  Modal.setAppElement("#root");
  console.log(main);
  return (
    <ReactModal isOpen={isOpen}>
      <ModalBox>
        <div>
          <MpRemoteImg>
            <div>
              <div>
                <img src="/imgs/eth.png" />
                <span>{main?.price}</span>
              </div>
            </div>
            <div>
              <img
                src={`http://localhost:8080/uploads/${main?.filename}.png`}
              />
            </div>
          </MpRemoteImg>
          <MpMenue>
            <div>
              <div>
                <div>
                  <AiOutlineMenu size={"30"} />
                </div>
                <div>collection</div>
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
                <div>By publisher </div>
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
          </MpMenue>
        </div>
        <div>
          <MpDt>
            <div>
              {main?.hash}
              <div onClick={() => click()}>
                <ImCross size={"30"} />
              </div>
            </div>
            <div>
              <div>{main?.name}</div>
              <div>Ownd by {main?.owner}</div>
            </div>

            <div>
              <div>
                <BsFillHeartFill size={"30"} />
                {main?.favorites}
              </div>
            </div>
            <div>
              <div>
                <AiOutlineFieldTime size={"25"} />
                sale ends{" "}
              </div>
              <div>
                <div>Hour : "hours"</div>
                <div>Minutes</div>
                <div>Seconds</div>
              </div>
            </div>
            <div>
              <div>
                <div>
                  <FaEthereum size={"25"} />
                  Current price
                </div>
                <div>{main?.price} ETH</div>
              </div>
              <div>
                <div>
                  <button>
                    {" "}
                    <AiOutlineThunderbolt size={"20"} />
                    Buy now
                  </button>
                </div>
              </div>
            </div>
          </MpDt>

          <MyOf>
            <div>
              {" "}
              <MdLocalOffer size={"25"} /> Offers
            </div>
            <div>
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
          </MyOf>
        </div>
      </ModalBox>
    </ReactModal>
  );
};
export default SellModal;
const MpRemoteImg = styled.div`
  display: flex;

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
  }
  & > div:nth-child(2) {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: 1px solid rgba(53, 56, 64, 0.3);
    border-top: none;
    align-items: center;
    justify-content: center;

    img {
      border-radius: 10px;
      width: 70%;
      object-fit: contain;
    }
  }
`;
const MpMenue = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  font-size: 20px;

  & > div:first-child {
    display: flex;
    width: 100%;

    flex-direction: row;
    justify-content: space-between;
    border: 1px solid rgba(53, 56, 64, 0.3);
    & > div:first-child {
      display: flex;
    }

    & > div:nth-child(2) {
      display: flex;
      flex-direction: row;
    }
  }
  & > div:nth-child(2) {
    display: flex;
    width: 100%;

    flex-direction: row;
    justify-content: space-between;
    border: 1px solid rgba(53, 56, 64, 0.3);
    & > div:first-child {
      display: flex;
    }

    & > div:nth-child(2) {
      display: flex;
      flex-direction: row;
    }
  }
  & > div:nth-child(3) {
    display: flex;
    width: 100%;

    flex-direction: row;
    justify-content: space-between;
    border: 1px solid rgba(53, 56, 64, 0.3);
    & > div:first-child {
      display: flex;
    }

    & > div:nth-child(2) {
      display: flex;
      flex-direction: row;
    }
  }
`;

const MpDt = styled.div`
  height: 72%;
  display: flex;
  width: 100%;
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
      justify-content: space-around;
      margin-bottom: 10px;
    }
    & > div:nth-child(2) {
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
    width: 100%;
    flex-direction: column;
    font-size: 1.2rem;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    flex-wrap: wrap;
    overflow: hidden;

    & > div:nth-child(2) {
      display: flex;
      justify-content: space-around;
      font-size: 1.7rem;
      margin-top: 5px;
    }
  }
  & > div:nth-child(5) {
    display: flex;
    width: 100%;
    font-size: 16px;
    flex-direction: column;

    & > div:first-child {
      display: flex;
      flex-direction: column;
      font-size: 28px;
      justify-content: center;

      & > div:first-child {
        display: flex;
        font-size: 20px;
      }
      & > div:last-child {
        display: flex;
        justify-content: center;
      }
    }
    & > div:nth-child(2) {
      display: flex;
      width: 100%;
      justify-content: space-around;
      margin-top: 5%;
      text-align: center;
      & > div button {
        background-color: lightcyan;
        position: relative;
        border: 1px solid black;
        display: inline-block;
        padding: 15px 150px;
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
`;
const MyOf = styled.div`
  height: 20%;
  display: flex;
  flex-direction: column;

  & > div {
    display: flex;
    margin-top: 4%;
    border: 1px solid rgba(53, 56, 64, 0.3);
  }
  & > div:nth-child(2) {
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    & > div:nth-child(3) {
      display: flex;
      justify-content: space-around;
      font-size: 18px;
    }
  }
`;

const ModalBox = styled.div`
  display: flex;
  width: 95%;
  height: 100%;
  background-color: rgb(245, 245, 245);
  justify-content: space-around;
  margin: 0 auto;
  font-size: 20px;
  & > div:first-child {
    display: flex;
    flex-direction: column;
    width: 45%;
    justify-content: space-around;

    & > div {
      display: flex;
      flex-direction: column;
    }
  }

  & > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    width: 45%;
    justify-content: space-around;
  }
`;
