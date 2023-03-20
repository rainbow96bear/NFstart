import styled from "styled-components";
import { AiOutlineHome, AiFillHome, AiOutlinePoweroff } from "react-icons/ai";
import { BsPlusSquare, BsPlusSquareFill } from "react-icons/bs";
import {
  IoSearchCircleOutline,
  IoSearchCircleSharp,
  IoSettingsSharp,
  IoSettingsOutline,
} from "react-icons/io5";

import ThemeBtn from "../../../customComp/ThemeBtn";
import NFTMintingContainer from "../../NFTMinting/Container";

const SideBarComp = ({ theme, changeTheme, params, navigate, registeringNFT, setRegisteringNFT }) => {


  return (
    <SideBarArea>
      <SideItem
        theme={theme}
        onClick={() => {
          navigate("/");
        }}>
        {params == undefined ? (
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
        {params == "explore" ? (
          <IoSearchCircleSharp size={"25"} />
        ) : (
          <IoSearchCircleOutline size={"25"} />
        )}
        <p>검색</p>
      </SideItem>

      {/* NFT 등록 */}
      <SideItem theme={theme} onClick={() => {
        setRegisteringNFT(true);
      }}>
        <BsPlusSquare size={"25"} />
        <p>NFT 등록</p>
        <NFTMintingContainer registeringNFT={registeringNFT} setRegisteringNFT={setRegisteringNFT} />
      </SideItem>

      <SideItem theme={theme} onClick={() => { }}>
        <AiOutlinePoweroff size={"25"} />
        <p>로그인</p>
      </SideItem>
      <SideItem
        theme={theme}
        onClick={() => {
          navigate("/setting");
        }}>
        {params == "setting" ? (
          <IoSettingsSharp size={"25"} />
        ) : (
          <IoSettingsOutline size={"25"} />
        )}{" "}
        <p>설정</p>
      </SideItem>
      <SideItem
        theme={theme}
        onClick={() => {
          changeTheme();
        }}>
        <ThemeBtn
          size={"25"}
          innerText={`${theme == "dark" ? "밝은 모드" : "어두운 모드"
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
    padding-left: 10px;
  }
`;
