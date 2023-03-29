import styled from "styled-components";
import Modal from "react-modal";
import { useCallback, useEffect, useRef, useState } from "react";
import { FcAddImage } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// registeringNFT : 기본 false, 클릭시 true
const NFTMintingComponent = ({
  web3,
  account,
  registeringNFT,
  setRegisteringNFT,
  drawingFile,
  setDrawingFile,
  drawingDataUrl,
}) => {
  Modal.setAppElement("#root");

  const navigate = useNavigate();

  // 버튼과 인풋 연결
  const imgInput = useRef();
  const addBtnClick = () => {
    imgInput.current.click();
  };

  // 파일 선택
  const [file, setFile] = useState();
  const [img, setImg] = useState("");
  const [image, setImage] = useState("");
  const fileChange = useCallback((e) => {
    setFile(e.target.files[0]);

    // 이미지 경로 세팅
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      if (reader.result) {
        setImg(reader.result);
        setImage(reader.result);
      }
    };
  }, []);

  // 모달창 삭제를 위한 랜더링
  useEffect(() => {
    if (!img) {
      setRegisteringNFT(false);
    }
  }, [img]);

  // 그림판 이미지 세팅
  useEffect(() => {
    if (drawingFile) {
      setFile(drawingFile);

      // 이미지 경로 세팅
      if (drawingDataUrl) {
        setImg(drawingDataUrl);
        setImage(drawingDataUrl);
      }
    }
  }, [drawingFile]);

  // NFT 등록을 위한 상태값 (+ image, account-users 연결, web3)
  const [isDetail, setIsDetail] = useState(false); // 상세 정보 작성중인가?
  const [name, setName] = useState(); // NFT 이름
  const [desc, setDesc] = useState(); // NFT 설명
  const [num, setNum] = useState(1); // NFT 개수

  // 판매 설정 관련
  const [nftDescHeight, setHeight] = useState(135);
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [sellPrice, setSellPrice] = useState(0);
  const [sellFees, setSellFees] = useState(0);

  // NFT 등록 로딩
  const [loading, setLoading] = useState(false);
  // 서명 로딩
  const [signLoading, setSignLoading] = useState(false);

  // NFT 등록 Data 요청 함수
  const registReq = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("num", num);
    formData.append("account", account);
    setLoading(true);
    const registered = (await axios.post("/api/nft/regist", formData)).data;
    console.log("NFT 등록 Data : ", registered);
    setLoading(false);
    return registered;
  };

  // NFT 등록 트랜잭션 함수
  const sendTransactionReq = async (registData) => {
    console.log(registData);
    setSignLoading(true);
    await web3.eth.sendTransaction(registData.obj);
    setSignLoading(false);
    const obj = { ...registData.saveData, sellPrice, sellFees };
    const saved = (await axios.post("/api/nft/save", obj)).data;
    console.log(saved);
  };

  // 로그인 확인
  if (isDetail || registeringNFT) {
    if (!account) {
      alert("로그인 후 이용해 주시기 바랍니다.");
      setRegisteringNFT(false);
      navigate("/login");
      return;
    }
  }

  // 초기화 함수
  function init() {
    setImg(undefined);
    setImage("");
    setIsDetail(false);
    setLoading(false);
    setSignLoading(false);
    if (drawingFile) setDrawingFile("");
    setHeight(135);
    setIsAdvanced(false);
  }

  return (
    <>
      {isDetail ? (
        // 상세 정보 작성중일 때 출력
        <Modal
          style={ModalStyle2}
          isOpen={isDetail && registeringNFT}
          onRequestClose={() => {
            const confirm = window.confirm("NFT 등록을 취소하시겠습니까?");
            if (confirm) {
              if (loading || signLoading) {
                alert("NFT 등록 진행중입니다.");
                return;
              }

              init();
              if (img == undefined) {
                setImg("");
              }
            }
          }}
        >
          <AllWrap>
            <Title>새 NFT 만들기</Title>

            <DetailContentWrap>
              {loading && (
                <Loading>
                  <img
                    alt="등록"
                    src={`https://images.velog.io/images/leeseooo/post/de8c4bcc-40dc-474a-a4ef-2086127a6f3d/%EB%AC%B4%EC%A7%80%EA%B0%9C%EA%B3%A0%EC%96%91%EC%9D%B4.gif`}
                  ></img>
                  <div>NFT 등록중...</div>
                </Loading>
              )}
              {signLoading && (
                <Loading>
                  <img
                    width={"35%"}
                    alt=""
                    src={`https://steamuserimages-a.akamaihd.net/ugc/586909633581902758/BCAF264131B1B1792A7F985BFDCB749844A7DB8B/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false`}
                  ></img>
                  <div style={{ marginTop: "5%" }}>NFT 등록중...</div>
                </Loading>
              )}

              {/* 위 */}
              <DetailContent>
                {/* 왼쪽 */}
                <DetailNFTImage src={image.toString()} alt={"NFT"} />
                {/* 오른쪽 */}
                <DetailInputWrap>
                  <ProfileWrap style={{ textAlign: "left" }}>
                    <h4>프로필 이미지, 이름</h4>
                  </ProfileWrap>

                  <h4>NFT 이름</h4>
                  <NFTDesc
                    contentEditable="true"
                    value={name}
                    onInput={(e) => {
                      setName(e.target.innerText);
                    }}
                  ></NFTDesc>

                  <h4>NFT 설명</h4>
                  <NFTDesc
                    contentEditable="true"
                    placeholder="NFT 설명"
                    value={desc}
                    style={{
                      height: `${nftDescHeight}px`,
                      overflowY: "scroll",
                      transition: "all 1s",
                    }}
                    onInput={(e) => {
                      setDesc(e.target.innerText);
                    }}
                  ></NFTDesc>

                  <h4>발행 개수</h4>
                  <NFTDesc>1</NFTDesc>

                  <div
                    style={{
                      padding: "3px 0",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "inline-block",
                        fontWeight: "600",
                        fontSize: "14px",
                        color: "rgb(66,66,66)",
                        padding: "0px 8px",
                      }}
                    >
                      판매 설정
                    </div>
                    <div
                      style={{
                        display: "inline-block",
                        marginBottom: "4px",
                        width: "50px",
                        height: "25px",
                        borderRadius: "20px",
                        margin: "3px 5px 0 3px",
                        backgroundColor: "white",
                        position: "relative",
                      }}
                    >
                      {/* Button */}
                      {isAdvanced ? (
                        <>
                          {/* 판매중 */}
                          <div
                            style={{
                              backgroundColor: "rgb(65, 187, 181)",
                              border: "1px solid rgb(225, 225, 225)",
                              transition: "all 0.5s",
                              marginTop: "3.5px",
                              marginLeft: "27px",
                              cursor: "pointer",
                              width: "18px",
                              height: "18px",
                              borderRadius: "20px",
                            }}
                            onClick={() => {
                              setHeight(135);
                              setIsAdvanced(false);
                            }}
                          ></div>
                          <div
                            style={{
                              width: "200px",
                              position: "absolute",
                              left: "-150%",
                              top: "100%",
                            }}
                          >
                            <h4>판매 금액</h4>
                            <input
                              style={{ width: "100%", height: "30px" }}
                              placeholder="Ether"
                              onInput={(e) => {
                                setSellPrice(e.target.value);
                              }}
                            ></input>
                            <h4>수수료</h4>
                            <input
                              style={{ width: "100%", height: "30px" }}
                              placeholder="5~20%"
                              onInput={(e) => {
                                setSellFees(e.target.value);
                              }}
                            ></input>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* 기본 */}
                          <div
                            style={{
                              backgroundColor: "rgb(225, 225, 225)",
                              transition: "all 0.5s",
                              marginTop: "3.5px",
                              marginLeft: "29px",
                              marginTop: "4px",
                              marginLeft: "3.5px",
                              cursor: "pointer",
                              width: "18px",
                              height: "18px",
                              borderRadius: "20px",
                            }}
                            onClick={() => {
                              setHeight(32);
                              setIsAdvanced(true);
                            }}
                          ></div>
                        </>
                      )}
                    </div>
                  </div>
                </DetailInputWrap>
              </DetailContent>

              {/* 아래 */}
              <DetailBtnWrap>
                <NextBtn
                  onClick={() => {
                    const confirm =
                      window.confirm("이전으로 돌아가시겠습니까?");
                    if (confirm) {
                      setIsDetail(false);
                      setImage("");
                    }
                  }}
                >
                  이전
                </NextBtn>
                <NextBtn
                  onClick={async () => {
                    alert("NFT 등록을 시도합니다. 약 30초 가량 소요됩니다.");

                    // NFT 등록 요청을 보낸다.
                    const registData = await registReq();

                    try {
                      // 트랜잭션 요청을 보낸다.
                      await sendTransactionReq(registData);
                    } catch (error) {
                      console.error(error);
                      alert("서명이 취소 되었습니다.");
                      setLoading(false);
                      setSignLoading(false);
                      return;
                    }

                    alert("NFT 가 Goerli Network에 등록되었습니다.");
                    init();
                  }}
                >
                  NFT 등록
                </NextBtn>
              </DetailBtnWrap>
            </DetailContentWrap>
          </AllWrap>
        </Modal>
      ) : (
        // 상세 정보 작성 이전 출력
        <Modal
          style={ModalStyle}
          isOpen={registeringNFT}
          onRequestClose={() => {
            const confirm = window.confirm("NFT 등록을 취소하시겠습니까?");
            if (confirm) {
              // 초기화가 아니라 그냥 취소만 되도록 수정
              init();
              if (img == undefined) {
                setImg("");
              }
            }
          }}
        >
          <AllWrap>
            <Title>새 NFT 만들기</Title>
            <ContentWrap
              onDrop={(e) => {
                e.preventDefault();
                setFile(e.dataTransfer.files[0]);
                const reader = new FileReader();
                reader.readAsDataURL(e.dataTransfer.files[0]);
                reader.onload = () => {
                  if (reader.result) {
                    setImg(reader.result);
                    setImage(reader.result);
                  }
                };
              }}
              onDragOver={(e) => {
                e.preventDefault();
              }}
            >
              {image ? (
                <div>
                  <NFTImage src={image.toString()} alt={"NFT"} />
                  <NextBtn
                    onClick={() => {
                      const confirm =
                        window.confirm("이전으로 돌아가시겠습니까?");
                      if (confirm) {
                        setImage("");
                      }
                    }}
                  >
                    이전
                  </NextBtn>
                  <NextBtn
                    onClick={async () => {
                      setIsDetail(true);
                    }}
                  >
                    다음
                  </NextBtn>
                </div>
              ) : (
                <div onDoubleClick={addBtnClick}>
                  <FcAddImage size="100" color="#fff" />
                  <ImgAddDesc>
                    사진과 동영상을 여기에 끌어다 놓으세요
                  </ImgAddDesc>
                  <ImgAddInput
                    type={"file"}
                    ref={imgInput}
                    onChange={fileChange}
                  />
                  <ImgAddBtn onClick={addBtnClick}>컴퓨터에서 선택</ImgAddBtn>
                </div>
              )}
            </ContentWrap>
          </AllWrap>
        </Modal>
      )
      }
    </>
  );
};

export default NFTMintingComponent;

export const ModalStyle = {
  overlay: {
    position: "fixed",
    backgroundColor: "rgba(21, 21, 21, 0.89)",
    zIndex: 4,
  },
  content: {
    display: "flex",
    justifyContent: "center",
    overflow: "auto",
    top: "12vh",
    left: "32vw",
    right: "32vw",
    bottom: "12vh",
    WebkitOverflowScrolling: "touch",
    borderRadius: "10px",
    outline: "none",
    zIndex: 10,
    padding: "0px",
    transition: "all 1s",
  },
};

export const ModalStyle2 = {
  overlay: {
    position: "fixed",
    backgroundColor: "rgba(21, 21, 21, 0.89)",
    zIndex: 4,
  },
  content: {
    display: "flex",
    justifyContent: "center",
    overflow: "auto",
    top: "12vh",
    left: "24vw",
    right: "24vw",
    bottom: "12vh",
    WebkitOverflowScrolling: "touch",
    borderRadius: "10px",
    outline: "none",
    zIndex: 10,
    padding: "0px",
    transition: "all 1s",
  },
};

const AllWrap = styled.div`
  width: 100vw;
  color: #272727;
  overflow: hidden;
`;

const Title = styled.div`
  text-align: center;
  border-bottom: 1px solid rgba(176, 176, 176, 0.425);
  padding: 10px 0;
  font-size: 14px;
  font-weight: 600;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const ContentWrap = styled.div`
  text-align: center;
  color: #4c4c4c;
  font-size: 15px;
  height: 70vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ImgAddDesc = styled.div`
  margin: 20px 0 70px 0;
  font-size: 15px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const ImgAddInput = styled.input`
  visibility: hidden;
  display: none;
`;

const ImgAddBtn = styled.button`
  background-color: #3e3e3e;
  color: white;
  font-size: 14px;
  padding: 6px 10px;
  border-radius: 5px;
  text-align: center;
  width: 140px;
  cursor: pointer;
  display: inline-block;
  border: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  &:hover {
    transition: all 0.5s;
    background-color: #41bbb5;
  }
`;

const NFTImage = styled.img`
  width: 25vw;
  display: block;
  margin: 30px auto 14px auto;
`;

const NextBtn = styled.div`
  background-color: #363636;
  color: white;
  font-size: 14px;
  padding: 6px 10px;
  border-radius: 5px;
  text-align: center;
  width: 100px;
  cursor: pointer;
  display: inline-block;
  border: none;
  margin: 30px;
  &:hover {
    transition: all 0.5s;
    background-color: #41bbb5;
  }
`;

const DetailContentWrap = styled.div`
  color: #4c4c4c;
  font-size: 15px;
  height: 70vh;
  box-sizing: border-box;
  text-align: center;
`;

const DetailContent = styled.div`
  display: inline-block;
  display: flex;
  justify-content: space-between;
  padding: 50px;
  padding-bottom: 10px;
  padding-top: 60px;
`;

const DetailNFTImage = styled.img`
  width: 52%;
  border-radius: 3px;
  margin-left: 10px;
`;

const DetailInputWrap = styled.div`
  background-color: rgb(239, 239, 239);
  display: inline-block;
  width: 40%;
  margin-right: 10px;
  text-align: left;
  border-radius: 3px;
  & h4 {
    margin-top: 10px;
    font-size: 14px;
    font-weight: 600;
    padding: 3px 8px;
    color: #424242;
  }
  & input {
    border: 3px solid rgb(239, 239, 239);
    border-radius: 5px;
    padding: 5px;
    font-weight: 600;
  }
`;

const DetailBtnWrap = styled.div`
  text-align: center;
`;

const ProfileWrap = styled.div`
  height: 32px;
  border-radius: 5px;
  /* background-color: #ff000079; */
  line-height: 28px;
`;

const NFTDesc = styled.div`
  border-radius: 5px;
  /* overflow-y: scroll; */
  text-align: left;
  padding: 5px;
  outline: none;
  font-size: 14px;
  color: #3d3d3d;
  border: 3px solid rgb(239, 239, 239);
  background-color: white;
  line-height: 20px;
  font-weight: 600;
  height: 32px;
  width: 100%;
  overflow: hidden;
`;

const Loading = styled.div`
  /* width: inherit; */
  height: inherit;
  background-color: #013368;
  z-index: 5;
  font-size: 20px;
  font-weight: 600;
  animation: rainbow 1s infinite;
  margin: 0 auto;
  /* display: flex;
    align-items: center;
    justify-content: center; */
  padding-top: 20%;
  @keyframes rainbow {
    0% {
      color: rgb(255, 0, 0);
    }
    8% {
      color: rgb(255, 127, 0);
    }
    16% {
      color: rgb(255, 255, 0);
    }
    25% {
      color: rgb(127, 255, 0);
    }
    33% {
      color: rgb(0, 255, 0);
    }
    41% {
      color: rgb(0, 255, 127);
    }
    50% {
      color: rgb(0, 255, 255);
    }
    58% {
      color: rgb(0, 127, 255);
    }
    66% {
      color: rgb(0, 0, 255);
    }
    75% {
      color: rgb(127, 0, 255);
    }
    83% {
      color: rgb(255, 0, 255);
    }
    91% {
      color: rgb(255, 0, 127);
    }
  }
`;
