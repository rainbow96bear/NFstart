import styled from "styled-components";
import { AiOutlineHome, AiFillHome, AiOutlinePoweroff } from "react-icons/ai";
import { BsPlusSquare, BsPlusSquareFill } from "react-icons/bs";
import {
  IoSearchCircleOutline,
  IoSearchCircleSharp,
  IoSettingsSharp,
  IoSettingsOutline,
} from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdExitToApp } from "react-icons/md";
import { BsList } from "react-icons/bs";
import { MdOutlineDraw } from "react-icons/md";
import { CgGames } from "react-icons/cg";
//chat
import { IoChatbubblesOutline } from "react-icons/io5";

import NFTMintingContainer from "../NFTMinting/Container";
import { useDispatch, useSelector } from "react-redux";
import { action } from "../../modules/userInfo";
import { useEffect, useState } from "react";

import ThemeBtn from "../../customComp/ThemeBtn";
import LoadingComp from "../Loading/LoadingComp";
import { useLocation } from "react-router-dom";

const SideBarComp = ({
  theme,
  changeTheme,
  navigate,
  registeringNFT,
  setRegisteringNFT,
}) => {
  const { nickName, account } = useSelector((state) => state.userInfo);

  const dispatch = useDispatch();
  const location = useLocation();
  const [layer, setLayer] = useState(false);

  const onClickPop = (e) => {
    setLayer((prev) => (prev ? false : true));
  };

  return (
    <SideBarArea>
      <SideItem
        theme={theme}
        onClick={() => {
          navigate("/");
        }}
      >
        {location.pathname == "/" ? (
          <AiFillHome size={"25"} />
        ) : (
          <AiOutlineHome size={"25"} />
        )}{" "}
        <p>홈</p>
        {/* theme로 이미지를 나누는 것이 아니라 location.pathname에 따라 변하도록 */}
      </SideItem>
      <SideItem
        theme={theme}
        onClick={() => {
          navigate("/explore");
        }}
      >
        {location.pathname == "/explore" ? (
          <IoSearchCircleSharp size={"25"} />
        ) : (
          <IoSearchCircleOutline size={"25"} />
        )}
        <p>검색</p>
      </SideItem>

      {/* NFT 등록 */}
      <SideItem
        theme={theme}
        onClick={() => {
          setRegisteringNFT(true);
        }}
      >
        <BsPlusSquare size={"25"} />
        <p>NFT 등록</p>
        <NFTMintingContainer
          registeringNFT={registeringNFT}
          setRegisteringNFT={setRegisteringNFT}
        />
      </SideItem>
      {account == "" ? (
        <></>
      ) : (
        <>
          <SideItem
            theme={theme}
            onClick={() => {
              navigate(`/mypage/:${account}`);
            }}
          >
            <CgProfile size={"25"} />
            <p>{nickName}'s 프로필</p>
          </SideItem>
        </>
      )}

      <SideItem
        theme={theme}
        onClick={() => {
          navigate("/chat");
        }}
      >
        <IoChatbubblesOutline size={"25"} />
        <p>채팅</p>
      </SideItem>
      <SideItem
        theme={theme}
        onClick={() => {
          changeTheme();
        }}
      >
        <ThemeBtn
          size={"25"}
          innerText={`${theme == "dark" ? "밝은 모드" : "어두운 모드"}`}
        ></ThemeBtn>
      </SideItem>
      <>
        <SideItem
          theme={theme}
          onClick={() => {
            onClickPop();
          }}
        >
          <BsList size={"25"} />
          <p>더보기</p>
        </SideItem>
        <PopItem theme={theme}>
          {layer ? (
            <>
              <div
                onClick={() => {
                  navigate("/setting");
                  onClickPop();
                }}
              >
                <p>설정</p>
                <IoSettingsOutline size={"25"} />
              </div>
              <div
                onClick={() => {
                  navigate("/create");
                  onClickPop();
                }}
              >
                <p>NFT 그리기</p>
                <MdOutlineDraw size={"25"} />
              </div>
              <div
                onClick={() => {
                  navigate("/loading");
                  onClickPop();
                }}
              >
                <p>미니게임</p>
                <CgGames size={"25"} />
              </div>
              <div
                onClick={() => {
                  dispatch(action.asyncLogOut);
                  dispatch({ type: "userInfo/logout" });
                  onClickPop();
                }}
              >
                <p>로그아웃</p>
                <MdExitToApp size={"25"} />
              </div>
            </>
          ) : (
            <></>
          )}
        </PopItem>
      </>
    </SideBarArea>
  );
};
export default SideBarComp;

const SideBarArea = styled.div`
  width: 50%;
  max-width: 300px;
  height: 100vh;
  border-right: 1px solid #5a5a5a;
  padding: 20px;
  flex-direction: column;
`;
const SideItem = styled.div`
  border-radius: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props.theme == "dark" ? "#5a5a5a" : "#e0e0e0"};
  }
  > p {
    padding: 0 50px 0 10px;
  }
`;
const PopItem = styled.div`
  width: 100%;
  border-radius: 5px;
  background-color: ${(props) =>
    props.theme == "dark" ? "#1e1e2e" : "#d4d3d3"};

  div {
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
    > p {
      padding: 0 50px 0 10px;
    }
    cursor: pointer;
    &:hover {
      background-color: ${(props) =>
        props.theme == "dark" ? "#5a5a5a" : "#e0e0e0"};
    }
  }
`;
