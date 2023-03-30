// icon
import { SiMaterialdesign } from "react-icons/si";
import { MdLocalOffer } from "react-icons/md";
import { FaEthereum } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { BsFillHeartFill } from "react-icons/bs";
import { RiArrowDownSLine } from "react-icons/ri";
import { TbArrowBarToDown } from "react-icons/tb";
import {
  AiOutlineTeam,
  AiOutlineMenu,
  AiOutlineThunderbolt,
  AiOutlineFieldTime,
} from "react-icons/ai";

import Modal from "react-modal";
import ReactModal from "react-modal";
import styled from "styled-components";

// Hook
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

// 주소
import NftSell from "../NftSell/Container";

const SellModal = ({
  click,
  isOpen,
  setIsOpen,
  main,
  nowPageUser,
  NFlist,
  favClick,
  buybuy,
  goBuybuy,
}) => {
  Modal.setAppElement("#root");
  const theme = useSelector((state) => state.theme);
  const [hash, setHash] = useState("");
  const [Buysell, setBuySell] = useState(false);

  // const favorite = NFlist.map((item) => {
  //   item.favorite;
  // });

  useEffect(() => {
    setHash(main?.hash);
  }, []);

  return (
    // Modal
    <ReactModal
      style={ModalStyle}
      isOpen={isOpen}
      onRequestClose={() => {
        setIsOpen(false);
      }}
    >
      <ModalBox theme={theme} className={"modalBox"}>
        {/* 왼쪽 */}
        <LeftWrap>
          <ImgWrap className="MpRemoteImg">
            <ImgTop>
              {/* <img src="/imgs/eth.png" alt="Ethereum" /> */}
              <FaEthereum
                size={"25"}
                style={{
                  marginRight: "5px",
                  color: "rgba(165, 68, 255, 0.744)",
                }}
              />
              <span>{main?.price}</span>
            </ImgTop>
            <ImgDiv>
              <NFTImg alt="" src={`/uploads/${main?.filename}`} />
            </ImgDiv>
          </ImgWrap>
          <LeftBottomWrap className="LeftBottomWrap">
            <div>
              <div>
                <div style={{ marginRight: "10px" }}>
                  <AiOutlineMenu size={"30"} />
                </div>
                <div>collection</div>
              </div>
              <div>
                <RiArrowDownSLine size={"30"} style={{ cursor: "pointer" }} />
              </div>
            </div>

            <div>
              <div>
                <div style={{ marginRight: "10px" }}>
                  <AiOutlineTeam size={"30"} />{" "}
                </div>
                <div>By publisher </div>
              </div>
              <div>
                <RiArrowDownSLine size={"30"} style={{ cursor: "pointer" }} />
              </div>
            </div>

            <div>
              <div>
                <div style={{ marginRight: "10px" }}>
                  <SiMaterialdesign size={"30"} />
                </div>
                <div>details</div>
              </div>
              <div>
                <RiArrowDownSLine size={"30"} style={{ cursor: "pointer" }} />
              </div>
            </div>
          </LeftBottomWrap>
        </LeftWrap>

        {/* 오른쪽 */}
        <RightWrap>
          <DetailAndBuyWrap>
            {/* Hash & Close */}
            <RightTop>
              <div style={{ fontWeight: "600", marginBottom: "10px" }}>
                #{main?.hash}
              </div>
              <IoClose
                style={{ cursor: "pointer" }}
                onClick={() => click()}
                size={"40"}
              />
            </RightTop>

            {/* NFT Name & Owner Account */}
            <div style={{ marginBottom: "30px" }}>
              <div style={{ fontWeight: "600", fontSize: "20px" }}>
                {main?.name}
              </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  alert("해당 Owner의 계정 정보로 이동");
                }}
              >
                Ownd by {main?.owner}
              </div>
            </div>

            {/* Heart Btn */}
            <div style={{ marginBottom: "30px" }}>
              <div>
                <BsFillHeartFill
                  size={"30"}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    favClick();
                  }}
                />
                {main?.favorites}
              </div>
            </div>

            <div
              style={{
                marginBottom: "50px",
                borderRadius: "10px",
                padding: "12px",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                    fontSize: "18px",
                  }}
                >
                  <FaEthereum size={"25"} style={{ marginRight: "5px" }} />
                  Current price
                </div>
                <div>{main?.price} ETH</div>
              </div>
              <div>
                <div>
                  {/* 만약 주인이 아니면 */}
                  {nowPageUser != main?.owner ? (
                    <BuyNowBtn
                      onClick={() => {
                        goBuybuy();
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "left",
                        }}
                      >
                        <AiOutlineThunderbolt
                          size={"20"}
                          style={{ marginRight: "5px" }}
                        />
                        Buy now
                      </div>
                    </BuyNowBtn>
                  ) : (
                    // 주인이면
                    <SellNowBtn
                      style={{ backgroundColor: "red" }}
                      onClick={(e) => {
                        // alert("판매");
                        setBuySell(true);
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "left",
                        }}
                      >
                        <AiOutlineThunderbolt
                          size={"20"}
                          style={{ marginRight: "5px" }}
                        />
                        Sell now
                      </div>
                    </SellNowBtn>
                  )}
                  <ReactModal
                    style={ModalStyle2}
                    isOpen={Buysell}
                    onRequestClose={() => {
                      setBuySell(false);
                    }}
                  >
                    {/* Buysell에 true 값만 전달되는 현상 */}
                    <NftSell
                      className={"modalBox"}
                      Buysell={Buysell}
                      NFlist={NFlist}
                      hash={main?.hash}
                    />
                  </ReactModal>
                </div>
              </div>
            </div>
          </DetailAndBuyWrap>

          <OffersWrap>
            <OffersTitle>
              <MdLocalOffer size={"25"} style={{ margin: "0 5px 3px 0" }} />{" "}
              Offers
            </OffersTitle>
            <OffersDetail>
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
            </OffersDetail>
          </OffersWrap>
        </RightWrap>
      </ModalBox>
    </ReactModal>
  );
};
export default SellModal;

export const ModalStyle = {
  overlay: {
    position: "fixed",
    backgroundColor: "rgba(28, 28, 28, 0.89)",
    zIndex: 4,
  },
  content: {
    display: "flex",
    justifyContent: "center",
    overflow: "auto",
    top: "5vh",
    left: "13vw",
    right: "13vw",
    bottom: "5vh",
    WebkitOverflowScrolling: "touch",
    borderRadius: "10px",
    outline: "none",
    zIndex: 999,
    transition: "all 1s",
    background: "none",
    padding: "none",
  },
};

export const ModalStyle2 = {
  overlay: {
    position: "fixed",
    backgroundColor: "rgba(28, 28, 28, 0.89)",
    zIndex: 11,
  },
  content: {
    display: "flex",
    justifyContent: "center",
    overflow: "auto",
    top: "15vh",
    left: "22vw",
    right: "22vw",
    bottom: "15vh",
    WebkitOverflowScrolling: "touch",
    borderRadius: "10px",
    outline: "none",
    zIndex: 12,
    transition: "all 1s",
    background: "none",
    padding: "none",
    margin: "none",
  },
};

const ModalBox = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  background-color: ${(props) =>
    props.theme == "dark" ? "#00002a" : "#fdfdfd"};
  justify-content: space-between;
  font-size: 18px;
  padding: 40px 60px;
`;

const LeftWrap = styled.div`
  width: 45%;
  & > div {
    display: flex;
    flex-direction: column;
  }
`;

const ImgWrap = styled.div`
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid rgb(232, 232, 232);
`;

const ImgTop = styled.div`
  height: 40px;
  line-height: 40px;
  display: flex;
  align-items: center;
  justify-content: left;
  padding-left: 5px;
  font-weight: 600;
  & > img {
    width: 25px;
    cursor: pointer;
    margin-right: 2px;
  }
`;

const ImgDiv = styled.div``;

const NFTImg = styled.img`
  width: 100%;
  object-fit: cover;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const LeftBottomWrap = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 18px;
  font-weight: 600;

  /* 각각의 메뉴 */
  & > div {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
    font-weight: 500;
    & > div:first-child {
      display: flex;
      align-items: center;
    }
    & > div:nth-child(2) {
      display: flex;
      flex-direction: row;
    }
  }
`;

const RightWrap = styled.div`
  width: 50%;
`;

// 이 놈
const DetailAndBuyWrap = styled.div`
  & > div:first-child {
    display: flex;
    justify-content: space-between;
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
      justify-content: space-around;
    }
  }
  /* & > div:nth-child(3) {
    display: flex;
    font-size: 18px;
    justify-content: space-around;
  } */
  & > div:nth-child(3) {
    display: flex;
    width: 100%;
    flex-direction: column;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    flex-wrap: wrap;
    overflow: hidden;

    & > div:nth-child(1) {
      display: flex;
      justify-content: space-around;
      margin-top: 5px;
    }
  }
  & > div:nth-child(4) {
    display: flex;
    width: 100%;
    font-size: 16px;
    flex-direction: column;

    & > div:first-child {
      display: flex;
      flex-direction: column;
      font-size: 20px;
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
  }
`;

const RightTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  line-height: 30px;
  margin-bottom: 20px;
`;

const OffersWrap = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: rgb(245,245,245); */
  border-radius: 10px;
  padding: 12px;
`;

const OffersTitle = styled.div`
  display: flex;
`;

const OffersDetail = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  & > div:nth-child(3) {
    display: flex;
    justify-content: space-around;
    font-size: 18px;
  }
`;

const BuyNowBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: left;
  border: none;
  box-sizing: border-box;
  &:hover {
    background-color: white;
    /* border: 3px solid #c070c2; */
  }
`;
const SellNowBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: left;
  border: none;
  box-sizing: border-box;
  &:hover {
    background-color: white;
    /* border: 3px solid #c070c2; */
  }
`;
