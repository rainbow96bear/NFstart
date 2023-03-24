import "./App.css";
import UserContainer from "./component/User/UserContainer";
import ReactModal from "react-modal";
import { Routes, Route } from "react-router-dom";
import NFTMintingContainer from "./component/NFTMinting/Container";
import SideBarCont from "./component/sideBar/Container";
import MainCont from "./component/mainPage/Container";
import GlobalStyle from "./styles/globalStyles";
import { lightTheme, darkTheme } from "./styles/theme";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import MypageCont from "./component/MyPage/Container";
import CreateCont from "./component/Create/Container";
import ChatCont from "./component/Chat/Container/ChatContain";
import { action } from "./modules/userInfo";

ReactModal.setAppElement("#root");
function App() {
  const theme = useSelector((state) => state.theme);
  const cookieValue = document.cookie.match(
    "(^|;) ?" + "logout" + "=([^;]*)(;|$)"
  );

  const dispatch = useDispatch();

  window.ethereum.on("accountsChanged", async () => {
    if (window.ethereum) {
      const changeAccount = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (changeAccount) {
        dispatch(action.asyncLogIn());
      }
    }
  });

  return (
    <Frame>
      <GlobalStyle
        theme={theme == "dark" ? darkTheme : lightTheme}
      ></GlobalStyle>
      <SideBarCont cookieValue={cookieValue}></SideBarCont>
      <Routes>
        <Route path="/" element={<MainCont></MainCont>}></Route>
        <Route path="/:params" element={<MainCont></MainCont>}></Route>
        <Route path="/login" element={<UserContainer />}></Route>
        <Route path="/mypage/:account" element={<MypageCont />}></Route>
        <Route path="/create" element={<CreateCont />}></Route>
        <Route path="/chat" element={<ChatCont />}></Route>
      </Routes>
    </Frame>
  );
}

export default App;

const Frame = styled.div`
  display: flex;
  width: 100vw;
  overflow-x: hidden;
`;
