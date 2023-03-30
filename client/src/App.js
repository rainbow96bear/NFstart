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
import ExploreCont from "./component/Explore/Container";
import axios from "axios";
import { action } from "./modules/userInfo";
import { useEffect, useState } from "react";
import RandomContainer from "./component/Random/Container";

ReactModal.setAppElement("#root");
function App() {
  const theme = useSelector((state) => state.theme);
  const { account } = useSelector((state) => state.userInfo);
  const [logoutState, setLogoutState] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // metamask 계정 변경 시 실행

  useEffect(() => {
    (async () => {
      const _theme = (
        await axios.get("/api/theme/get", {
          theme,
        })
      ).data.theme;
      if (theme != _theme) {
        dispatch({ type: "theme/change" });
      }
    })();
    (async () => {
      const data = (await axios.get("/api/user/logoutState")).data;
      setLogoutState(data);
      if (data.toString() == "false") {
        dispatch(action.asyncLogIn());
      } else {
        navigate("/");
      }
    })();
    (async () => {
      window.ethereum.on("accountsChanged", async () => {
        if (window.ethereum) {
          const changeAccount = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          if (changeAccount) {
            dispatch(action.asyncLogIn());
            navigate("/");
          }
        }
      });
    })();
  }, []);

  return (
    <>
      <Frame>
        <GlobalStyle
          theme={theme == "dark" ? darkTheme : lightTheme}
        ></GlobalStyle>
        {account == "" ? <></> : <SideBarCont></SideBarCont>}
        <Routes>
          {account == "" ? (
            <Route path="/" element={<UserContainer />}></Route>
          ) : (
            <Route path="/" element={<MainCont />}></Route>
          )}
          <Route path="/explore" element={<ExploreCont />} />
          <Route path="/mypage/:idaccount" element={<MypageCont />}></Route>
          <Route path="/setting" element={<SettingCont />} />
          <Route path="/create" element={<CreateCont />} />
          <Route path="/chat" element={<ChatCont />} />
          <Route path="/random" element={<RandomContainer />} />
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
