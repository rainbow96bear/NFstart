import styled from "styled-components";
import { CgProfile } from "react-icons/cg";
import { MdContentCopy } from "react-icons/md";
import { BsChatDots } from "react-icons/bs";
import { AiOutlineGitlab } from "react-icons/ai";
import { AiOutlineAppstore } from "react-icons/ai";
import { FaDollarSign } from "react-icons/fa";

import ItemBoxCont from "./ItemBox/Container";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useCallback } from "react";
import axios from "axios";
import { action } from "../../modules/userInfo";
import { useNavigate } from "react-router-dom";

const MypageComp = ({
  open,
  setOpen,
  User,
  NFlist,
  setIsModal,
  userNick,
  isModal,
  setIsNameModal,
  replaceName,
  isNameModal,
  modalClick,
  nameModalClick,
  userProfile,
  sellNft,
  remove,
}) => {
  const [file, setFile] = useState();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [myPageSell, setmyPageSell] = useState([]);
  const [price, setprice] = useState(false);

  const { nickName } = useSelector((state) => state.userInfo);
  const { account } = useSelector((state) => state.userInfo);
  const theme = useSelector((state) => state.theme);

  const imgInput = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addBtnClick = async () => {
    imgInput.current.click();
  };

  //
  const sync = async () => {
    setmyPageSell(sellNft);
  };
  useEffect(() => {
    sync();
  }, [price]);

  //
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
    // 요청 보내야함
  }, []);

  const registReq = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("account", account);

    const registered = (await axios.post("/api/user/imgUpload", formData)).data;
    console.log(registered);
    if (registered === "성공") {
      window.location.reload();
    }
  };

  // const removeReq = async () => {
  //   const formData = new FormData();
  //   formData.append("file", "");

  //   const registered = (await axios.post("/api/user/imgUpload", formData)).data;
  //   console.log(registered);
  //   if (registered === "성공") {
  //     window.location.reload();
  //   }
  // };

  useEffect(() => {
    registReq();
    setIsModal(isModal);
    if (img) {
      setIsModal(!isModal);
    }
  }, [img, setIsModal]);

  return (
    <>
      {!isModal ? (
        <ModalBox theme={theme}>
          <div className="box">
            <div className="item">
              <h1>프로필 사진 바꾸기</h1>
            </div>
            <ImgAddInput type={"file"} ref={imgInput} onChange={fileChange} />
            <div
              className="item"
              onClick={() => {
                addBtnClick();
              }}
            >
              사진 업로드
            </div>
            <div
              className="item"
              onClick={() => {
                // removeReq();
              }}
            >
              현재 사진 삭제
            </div>
            <div
              className="item"
              onClick={() => {
                modalClick();
                setImg("");
              }}
            >
              취소
            </div>
          </div>
        </ModalBox>
      ) : (
        <></>
      )}
      {!isNameModal ? (
        <ModalBox theme={theme}>
          <div className="box">
            <div className="item2">
              <h1>프로필 이름 바꾸기</h1>
            </div>
            <div className="item2">현재 프로필 이름 : {nickName}</div>
            <div className="item2">
              <input
                type="text"
                value={name}
                onInput={(e) => {
                  setName(e.target.value);
                }}
                placeholder={"변경할 프로필 이름 작성"}
              />
            </div>
            <div className="item2">
              <button
                onClick={() => {
                  nameModalClick();
                }}
              >
                취소
              </button>
              <button
                onClick={() => {
                  replaceName(name);
                  nameModalClick();
                }}
              >
                저장
              </button>
            </div>
          </div>
        </ModalBox>
      ) : (
        <></>
      )}
      <MyPage>
        <MyPageFrame>
          <InfoBox>
            {userProfile ? (
              <ProfileImgBox>
                <div
                  className="imgFrame"
                  theme={theme}
                  onClick={() => {
                    modalClick();
                  }}
                >
                  <p>편집</p>
                </div>
                <img src={`/uploads/${userProfile}`} alt={"image"} />
              </ProfileImgBox>
            ) : (
              <ProfileImgBox>
                <CgProfile
                  size={"80%"}
                  onClick={() => {
                    modalClick();
                  }}
                  title={"프로필 이미지 편집"}
                />
              </ProfileImgBox>
            )}
            <Info>
              <div>
                <div className="imgProfile">
                  <p>{nickName}</p>
                  <button
                    onClick={() => {
                      nameModalClick();
                    }}
                  >
                    프로필 편집
                  </button>
                </div>
              </div>
              <div className="acc">
                <span>{account.slice(0, 5)}&nbsp;···&nbsp;</span>
                <span> {account.slice(-4)}</span>
                <MdContentCopy
                  size={"17px"}
                  cursor="pointer"
                  onClick={() => navigator.clipboard.writeText(`${account}`)}
                />
              </div>

              <div className="ea">게시물 {NFlist.length}개</div>
            </Info>
          </InfoBox>
          <CategoryBox theme={theme}>
            <div
              style={{ curser: "pointer" }}
              onClick={() => {
                setprice(false);
              }}
            >
              <AiOutlineAppstore size={"20"} />
              <p>전체</p>
            </div>
            <div
              style={{ curser: "pointer" }}
              onClick={() => {
                setprice(true);
              }}
            >
              <FaDollarSign size={"20"} />
              <p>판매중</p>
            </div>
          </CategoryBox>
          {price ? (
            <ItemBox>
              {myPageSell.length == 0 ? (
                <>
                  <div className="nonft">
                    <AiOutlineGitlab size={"40"} />
                    <p>판매중인 NFT가 없습니다.</p>
                  </div>
                </>
              ) : (
                <>
                  {myPageSell?.map((item, index) => (
                    <ItemBoxCont
                      item={item}
                      index={index}
                      key={index}
                      NFlist={myPageSell}
                    />
                  ))}
                </>
              )}
            </ItemBox>
          ) : (
            <ItemBox>
              {NFlist.length == 0 ? (
                <>
                  <div className="nonft">
                    <BsChatDots size={"40"} />
                    <p>업로드한 NFT가 없습니다.</p>
                  </div>
                </>
              ) : (
                <>
                  {NFlist?.map((item, index) => (
                    <ItemBoxCont
                      item={item}
                      index={index}
                      key={index}
                      NFlist={NFlist}
                    />
                  ))}
                </>
              )}
            </ItemBox>
          )}
        </MyPageFrame>
      </MyPage>
    </>
  );
};
export default MypageComp;

const MyPage = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;
const MyPageFrame = styled.div`
  width: 100%;
  max-width: 676px;
`;
const InfoBox = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ProfileImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  flex: 1;
  cursor: pointer;
  img {
    border-radius: 100%;
    width: 145px;
    height: 145px;
    position: absolute;
  }
  .imgFrame {
    width: 145px;
    height: 145px;
    position: relative;
    z-index: 1;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    > p {
      display: none;
    }
  }
  .imgFrame:hover {
    > p {
      display: flex;
      color: red;
      font-size: 20px;
      font-weight: bold;
    }
    background-color: rgba(255, 255, 255, 0.4);
  }
`;
const Info = styled.div`
  flex: 2;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  & :nth-child(1) {
    display: flex;
    width: fit-content;
    font-size: 2rem;
  }
  .acc {
    display: flex;
    align-items: center;
    padding: 20px 0 20px 0;
    > span {
      font-size: 15px;
    }
    > span:nth-child(2) {
      margin: 0 10px 0 0;
    }
  }
  .imgProfile {
    button {
      cursor: pointer;
      margin-left: 20px;
    }
  }
  .ea {
    font-size: 20px;
  }
`;

const CategoryBox = styled.div`
  width: 100%;
  display: flex;
  font-size: 1.2rem;
  justify-content: center;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  & > div {
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 15px 90px;
    font-size: 17px;
    > p {
      margin-left: 20px;
    }
  }
  & > div:hover {
    cursor: pointer;
    background-color: ${(props) =>
      props.theme == "dark" ? "#e0e0e0" : "#5a5a5a"};
    color: ${(props) => (props.theme == "dark" ? "#5a5a5a" : "#e0e0e0")};
  }
`;
const ItemBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  .nonft {
    width: 100%;
    margin: 200px 0 0 0;
    display: block;
    text-align: center;
    > p {
      padding-top: 10px;
    }
  }
`;
const ImgAddInput = styled.input`
  visibility: hidden;
  display: none;
`;
const ModalBox = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(8, 8, 8, 0.3);
  backdrop-filter: blur(0.3rem);
  z-index: 999;
  .box {
    text-align: center;
    width: 400px;
    height: 220px;
    border-radius: 20px;
    background-color: ${(props) =>
      props.theme == "dark" ? "#202020" : "#e0e0e0"};
  }
  .item,
  .item2 {
    width: 400px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 14px;
    color: ${(props) => (props.theme == "dark" ? "#fdfdfd" : "#202020")};
  }
  .item:first-child,
  .item2:first-child {
    height: 70px;
    font-size: 20px;
  }
  .item:nth-child(3),
  .item2:nth-child(2) {
    border-top: 1px solid #5e5e5e;
    border-bottom: 1px solid #5e5e5e;
    color: #1877f2;
  }
  .item:nth-child(4),
  .item2:nth-child(3) {
    border-bottom: 1px solid #5e5e5e;
    color: #fa383e;
  }
  .item2 > input {
    padding: 10px;
    background-color: ${(props) =>
      props.theme == "dark" ? "#424242" : "#fdfdfd"};
    border: none;
    border-radius: 5px;
    color: ${(props) => (props.theme == "dark" ? "#fdfdfd" : "#202020")};
  }
  .item2 > button {
    border: none;
    width: 50%;
    cursor: pointer;
    font-weight: 600;
    color: ${(props) => (props.theme == "dark" ? "#fdfdfd" : "#202020")};
    background-color: inherit;
  }
  .item2 > button:hover {
    color: #fa383e;
  }
  .item:nth-child(3) {
    border-top: 1px solid #5e5e5e;
    border-bottom: 1px solid #5e5e5e;
    color: #1877f2;
  }
  .item:nth-child(4) {
    border-bottom: 1px solid #5e5e5e;
    color: #fa383e;
  }
  .item:hover {
    cursor: pointer;
  }
`;
