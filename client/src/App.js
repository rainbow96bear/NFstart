import "./App.css";
import UserContainer from "./component/User/UserContainer";
import ReactModal from "react-modal";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import NFTMintingContainer from "./component/NFTMinting/Container";
import SideBarCont from "./component/sideBar/Container";
import SettingCont from "./component/SettingPage/Container";
import MainCont from "./component/mainPage/Container";
import GlobalStyle from "./styles/globalStyles";
import { lightTheme, darkTheme } from "./styles/theme";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import MypageCont from "./component/MyPage/Container";
import CreateCont from "./component/Create/Container";
import ChatCont from "./component/Chat/Container/ChatContain";
import LoadingComp from "./component/Loading/LoadingComp";
import { action } from "./modules/userInfo";
import { useEffect, useState } from "react";

ReactModal.setAppElement("#root");
function App() {
  const theme = useSelector((state) => state.theme);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookieValue = document.cookie.match(
    "(^|;) ?" + "logout" + "=([^;]*)(;|$)"
  );
  console.log(cookieValue);
  // const stateLog = document.cookie.split("; ").includes("logout=false");
  // if (stateLog) {
  //   dispatch(action.asyncLogIn());
  //   console.log("쿠키의 상태", document.cookie.split("; "));
  // }

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
    <>
      {/* {loading && <LoadingComp />} */}
      <Frame>
        <GlobalStyle
          theme={theme == "dark" ? darkTheme : lightTheme}
        ></GlobalStyle>
        <SideBarCont></SideBarCont>
        <Routes>
          <Route
            path="/"
            element={<UserContainer cookieValue={cookieValue} />}
          />
          <Route path="/main" element={<MainCont />} />
          <Route path="/:params" element={<MainCont />} />
          <Route path="/mypage/:idaccount" element={<MypageCont />}></Route>
          <Route path="/setting" element={<SettingCont />} />
          <Route path="/create" element={<CreateCont />} />
          <Route path="/chat" element={<ChatCont />} />
        </Routes>
      </Frame>
    </>
  );
}

export default App;

const Frame = styled.div`
  display: flex;
  width: 100%;
  overflow-x: hidden;
`;
