import styled from "styled-components";
import { AiOutlineHome, AiFillHome, AiOutlinePoweroff } from "react-icons/ai";
import { BsPlusSquare } from "react-icons/bs";
import {
  IoSearchCircleOutline,
  IoSearchCircleSharp,
  IoSettingsSharp,
  IoSettingsOutline,
} from "react-icons/io5";
//chat
import { IoChatbubblesOutline } from "react-icons/io5";
//
import { RiEdit2Line, RiEdit2Fill } from "react-icons/ri";
import ThemeBtn from "../../customComp/ThemeBtn";
import NFTMintingContainer from "../../component/NFTMinting/Container";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { action } from "../../modules/userInfo";

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
  return (
    <SideBarArea>
      <SideItem
        theme={theme}
        onClick={() => {
          navigate("/main");
        }}>
        {location.pathname == "/main" ? (
          <AiFillHome size={"25"} />
        ) : (
          <AiOutlineHome size={"25"} />
        )}{" "}
        <p>홈</p>
        {/* theme로 이미지를 나누는 것이 아니라 params에 따라 변하도록 */}
      </SideItem>
      <SideItem
        theme={theme}
        onClick={() => {
          navigate("/explore");
        }}>
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
        }}>
        <BsPlusSquare size={"25"} />
        <p>NFT 등록</p>
        <NFTMintingContainer
          registeringNFT={registeringNFT}
          setRegisteringNFT={setRegisteringNFT}
        />
      </SideItem>

      <SideItem
        theme={theme}
        onClick={() => {
          navigate("/create");
        }}>
        {location.pathname == "/create" ? (
          <RiEdit2Fill size={"25"} />
        ) : (
          <RiEdit2Line size={"25"} />
        )}
        <p>NFT 그리기</p>
      </SideItem>

      {account == "" ? (
        <SideItem
          theme={theme}
          onClick={() => {
            navigate("/");
          }}>
          <AiOutlinePoweroff size={"25"} />
          <p>로그인</p>
        </SideItem>
      ) : (
        <SideItem theme={theme}>
          <AiOutlinePoweroff size={"25"} />
          <p>{nickName}</p>
          <button
            onClick={() => {
              dispatch({ type: "userInfo/logout" });
              dispatch(action.asyncLogOut);
            }}>
            로그아웃
          </button>
        </SideItem>
      )}

      <SideItem
        theme={theme}
        onClick={() => {
          navigate("/setting");
        }}>
        {location.pathname == "/setting" ? (
          <IoSettingsSharp size={"25"} />
        ) : (
          <IoSettingsOutline size={"25"} />
        )}{" "}
        <p>설정</p>
      </SideItem>
      <SideItem
        theme={theme}
        onClick={() => {
          navigate("/chat");
        }}>
        <IoChatbubblesOutline size={"25"} />
        <p>채팅</p>
      </SideItem>
      <SideItem
        theme={theme}
        onClick={() => {
          changeTheme();
        }}>
        <ThemeBtn
          size={"25"}
          innerText={`${
            theme == "dark" ? "밝은 모드" : "어두운 모드"
          }`}></ThemeBtn>
      </SideItem>
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
