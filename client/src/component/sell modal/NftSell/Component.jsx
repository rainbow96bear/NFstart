import Modal from "react-modal";
import styled from "styled-components";
import { BsCalendar } from "react-icons/bs";
import { MdAttachMoney } from "react-icons/md";

// 판매 등록 페이지(모달)
const SellModal = ({ Buysell }) => {
  console.log(Buysell);
  return (
    <>
      <DetailAndBuyWrap isOpen={Buysell}>
        <div
          style={{ fontWeight: "600", marginBottom: "10px" }}
          onClick={() => {
            alert("price : 가격선택");
          }}
        >
          <Price>
            <div>price :</div>
            <div>
              <input type="text" />
              <label>Price</label>
              <span></span>
            </div>
          </Price>
        </div>

        {/* <IoClose
            style={{ cursor: "pointer" }}
            onClick={() => click()}
            size={"40"}
          /> */}

        {/* Heart Btn */}
        <div
          style={{
            fontWeight: "600",
            marginBottom: "10px",
            marginBottom: "30px",
          }}
          onClick={() => {
            alert("Duration : 날짜선택");
          }}
        >
          <div>
            <div>
              <BsCalendar />
            </div>
            <div>날짜</div>
          </div>
          <div>내용</div>
        </div>

        <div
          style={{
            fontWeight: "600",
            marginBottom: "50px",
            borderRadius: "10px",
            padding: "12px",
          }}
        >
          <div>
            <MdAttachMoney />
          </div>
          <div>fees</div>
        </div>

        <div
          style={{
            marginBottom: "50px",
            borderRadius: "10px",
            padding: "12px",
          }}
        >
          <div>
            <button>판매</button>
          </div>
        </div>
      </DetailAndBuyWrap>
    </>
  );
};

export default SellModal;

const DetailAndBuyWrap = styled.div`
  display: flex;
  width: 100%;
  /* background-color: #6f67f1; */
  background-color: #1c1c1cd2;
  flex-direction: column;
  justify-content: space-around;

  align-items: center;
  & > div:first-child {
    display: flex;
    justify-content: space-between;
  }
  & > div:nth-child(2) {
    display: flex;
    flex-direction: row;
    font-size: 18px;
    justify-content: space-between;
    width: 50%;
    & > div:first-child {
      display: flex;
    }
  }
  & > div:nth-child(3) {
    display: flex;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    flex-wrap: wrap;
    overflow: hidden;
  }
  & > div:nth-child(4) {
    display: flex;
    & > div button {
      cursor: pointer;
      background-color: #616161;
      position: relative;
      display: inline-block;
      padding: 15px 150px;
      border-radius: 15px;
      transition: 0.6s cubic-bezier(0.77, 0, 0.175, 1); // ease-in-out-quartic;
      font-size: 18px;
      background: transparent;
      background-image: linear-gradient(0.47turn, #e2938f, #ae7dbe, #6f67f1);
      color: white;

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
    }
  }
`;
const Price = styled.div`
  display: flex;
  width: 100%;

  font-size: 1rem;
  & > div:first-child {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > div:nth-child(2) {
    position: relative;
    width: 300px;
    margin-left: 50px;
    margin-top: 100px;

    & > input {
      font-size: 15px;
      color: #222222;
      width: 300px;
      border: none;
      border-bottom: solid #aaaaaa 1px;
      padding-bottom: 10px;
      padding-left: 10px;
      position: relative;
      background: none;
      z-index: 5;
    }

    & > label {
      position: absolute;
      color: #aaa;
      left: 10px;
      font-size: 20px;
      bottom: 8px;
      transition: all 0.2s;
    }

    & > span {
      display: block;
      position: absolute;
      bottom: 0;
      left: 0%; /* right로만 바꿔주면 오 - 왼 */
      background-color: #666;
      width: 0;
      height: 2px;
      border-radius: 2px;
      transition: 0.5s;
    }

    & > input::placeholder {
      color: #aaaaaa;
    }
    & > input:focus {
      outline: none;
    }
    & > input:focus ~ label,
    input:valid ~ label {
      font-size: 16px;
      bottom: 40px;
      color: #666;
      font-weight: bold;
    }

    & > input:focus ~ span,
    input:valid ~ span {
      width: 100%;
    }
  }
`;
