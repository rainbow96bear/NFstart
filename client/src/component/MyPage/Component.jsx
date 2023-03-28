import styled from "styled-components";
import { CgProfile } from "react-icons/cg";
import { MdContentCopy } from "react-icons/md";
import ItemBoxCont from "./ItemBox/Container";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useCallback } from "react";
import axios from "axios";

const MypageComp = ({
  open,
  setOpen,
  User,
  NFlist,
  setIsModal,
  isModal,
  modalClick,
  sellNft,
}) => {
  const [file, setFile] = useState();
  const [image, setImage] = useState("");
  const [img, setImg] = useState("");
  const [myPageSell, setmyPageSell] = useState([]);
  const [price, setprice] = useState(false);

  // console.log("listNF", NFlist);
  const { nickName } = useSelector((state) => state.userInfo);
  const { account } = useSelector((state) => state.userInfo);

  const theme = useSelector((state) => state.theme);
  const imgInput = useRef();

  const addBtnClick = () => {
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
  const onUploadImage = useCallback((e) => {
    console.log(e.target.files[0]);
    // 이미지 경로 세팅
    setFile(e.target.files[0]);

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      if (reader.result) {
        setImg(reader.result);
        setImage(reader.result);
      }
    };
  }, []);

  const replaceReq = async () => {
    const formData = new FormData();
    formData.append("file", file);
    console.log(file);
    const replaced = (await axios.post("/api/user/change", formData)).data;
    // console.log(replaced);
    return replaced;
  };

  useEffect(() => {
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
            <ImgAddInput
              type={"file"}
              ref={imgInput}
              onChange={onUploadImage}
            />
            <div
              className="item"
              onClick={async () => {
                await replaceReq();
                // setImage("");
                // setImg("");
                addBtnClick();
              }}
            >
              사진 업로드
            </div>
            <div className="item">현재 사진 삭제</div>
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
      <MyPage>
        <MyPageFrame>
          <InfoBox>
            {image ? (
              <ProfileImgBox
                onClick={() => {
                  modalClick();
                }}
              >
                <img src={image.toString()} alt={"image"} />
              </ProfileImgBox>
            ) : (
              <ProfileImgBox>
                <CgProfile
                  size={"80%"}
                  onClick={() => {
                    modalClick();
                  }}
                />
              </ProfileImgBox>
            )}
            <Info>
              <div>
                {/* {User?.map((item) => (
                <div>{item.nickName}</div>
              ))} */}
                <div>{nickName}</div>
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
          <CategoryBox>
            <div
              style={{ curser: "pointer" }}
              onClick={() => {
                setprice(false);
              }}
            >
              전체
            </div>
            <div
              style={{ curser: "pointer" }}
              onClick={() => {
                setprice(true);
              }}
            >
              판매중
            </div>
          </CategoryBox>
          {price ? (
            <ItemBox>
              {myPageSell?.map((item, index) => (
                <ItemBoxCont
                  item={item}
                  index={index}
                  key={index}
                  NFlist={myPageSell}
                />
              ))}
            </ItemBox>
          ) : (
            <ItemBox>
              {NFlist?.map((item, index) => (
                <ItemBoxCont
                  item={item}
                  index={index}
                  key={index}
                  NFlist={NFlist}
                />
              ))}
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
  /* overflow-y 이걸 한 이유가 있음? */
  /* overflow-y: scroll; */
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
  & > div {
    padding: 10px 90px;
  }
`;
const ItemBox = styled.div`
  display: flex;
  flex-wrap: wrap;
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
    background-color: #202020;
  }
  .item {
    width: 400px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 14px;
    color: #fdfdfd;
  }
  .item:first-child {
    height: 70px;
    font-size: 20px;
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
