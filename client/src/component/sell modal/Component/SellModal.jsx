// import styled from "react-styled";
import { SiMaterialdesign } from "react-icons/si";
import { BiFoodMenu } from "react-icons/bi";
import { AiOutlineTeam, AiOutlineMenu } from "react-icons/ai";

import Modal from "react-modal";
import ReactModal from "react-modal";
import styled from "styled-components";
const SellModal = ({ isOpen, onCancel }) => {
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
            <img src="/imgs/1.png" />
          </div>
          <div>
            <AiOutlineMenu size={"30"} />
            <div>description</div>
          </div>
          <div>
            <AiOutlineTeam size={"30"} />
            By Team Name
          </div>
          <div>Attributes</div>
          <div>만들어진 구성들 박스에 담아서..</div>
          <div>
            <BiFoodMenu size={"30"} />
            About seller Team
          </div>
          <div>
            <SiMaterialdesign size={"30"} />
            details
          </div>
        </div>
        <div>
          <div>판매자</div>
          <div>판매할 NFT#123</div>
          <div>view , favorite PFPs</div>
          <div>time</div>
          <div>
            ETH
            <div>addcart</div>
            <div>make offer</div>
          </div>
          <div>grap</div>
          <div>Listing</div>
          <div>Offers</div>
        </div>

        <div>
          <button onClick={() => {}}>확인</button>

          <button
            onClick={() => {
              onCancel();
            }}
          >
            취소
          </button>
        </div>
      </ModalBox>
    </ReactModal>
  );
};
export default SellModal;

const ModalBox = styled.div`
  display: flex;
  width: 100%;
  background-image: linear-gradient(0.47turn, #e2938f, #ae7dbe, #6f67f1);
  font-size: 20px;
  & > div:first-child {
    display: flex;
    flex-direction: column;
    width: 45%;
    border: 1px solid red;
    & > div:first-child {
      display: flex;
      align-items: center;
      font-weight: 50px;
      height: 42px;
      width: 100%;
      /* background-color: beige; */
      justify-content: space-between;
      & > div:first-child {
        display: flex;
        width: 100%;

        & > img {
          display: flex;
          width: 15%;
        }
      }
      & > div:nth-child(2) {
        display: flex;
        width: 100%;
        flex-direction: row-reverse;
        & > img {
          display: flex;
          width: 15%;
        }
      }
      & > div:nth-child(3) {
        display: flex;
        width: 100%;
        flex-direction: row-reverse;
        & > img {
          display: flex;
          width: 15%;
        }
      }
    }
    & > div:nth-child(2) {
      display: flex;
      width: 100%;
      & > img {
        width: 100%;
      }
    }
    & > div:nth-child(3) {
      display: flex;
      width: 80%;
      /* background-color: red; */
      flex-direction: row;
      font-size: 20px;
      & > div:first-child img {
        display: flex;
        width: 60%;
      }
    }
    & > div:nth-child(5) {
      display: flex;
      width: 40%;
      font-size: 20px;

      & > div img {
        display: flex;
        width: 38%;
      }
    }
  }
  & > div:nth-child(2) {
    display: flex;
    width: 50%;
    flex-direction: column;
    border: 1px solid blue;
    & > div:first-child {
      display: flex;
      width: 14%;
    }
  }
`;
