import "./App.css";
import UserContainer from "./component/User/UserContainer";
import ReactModal from "react-modal";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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
import ExploreCont from "./component/Explore/Container";
import { useEffect, useState } from "react";
import axios from "axios";

ReactModal.setAppElement("#root");
function App() {
  const theme = useSelector((state) => state.theme);
  const { account } = useSelector((state) => state.userInfo);

  const [logoutState, setLogoutState] = useState("");

  const navigate = useNavigate();
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
      console.log(data);
      if (data.toString() == "false") {
        dispatch(action.asyncLogIn());
      } else {
        navigate("/");
      }
    })();
  }, []);

  return (
    <Frame>
      <GlobalStyle
        theme={theme == "dark" ? darkTheme : lightTheme}></GlobalStyle>
      {account == "" ? <></> : <SideBarCont></SideBarCont>}
      <Routes>
        {account == "" ? (
          <Route path="/" element={<UserContainer />}></Route>
        ) : (
          <Route path="/" element={<MainCont />}></Route>
        )}
        <Route path="/explore" element={<ExploreCont></ExploreCont>}></Route>
        <Route path="/mypage/:idaccount" element={<MypageCont />}></Route>
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
