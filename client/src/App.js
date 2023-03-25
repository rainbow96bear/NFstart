import "./App.css";
import UserContainer from "./component/User/UserContainer";
import ReactModal from "react-modal";
import { Routes, Route, useNavigate } from "react-router-dom";
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
import { useEffect } from "react";
import axios from "axios";

ReactModal.setAppElement("#root");
function App() {
  const theme = useSelector((state) => state.theme);
  const { account } = useSelector((state) => state.userInfo);
  const cookieValue = document.cookie.match(
    "(^|;) ?" + "logout" + "=([^;]*)(;|$)"
  );

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
    if (cookieValue != null) {
      if (cookieValue[2] == "false") {
        const getAccount = async () => {
          const [_account] = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          const data = (
            await axios.post("/api/user/info", { account: _account })
          ).data;
          const { account, nickName, chainId, balance } = data.nickData;
          dispatch({
            type: "userInfo/login",
            payload: { account, nickName, chainId, balance },
          });
        };
        getAccount();
        navigate("/main");
      }
    } else {
      navigate("/");
    }
  }, [account]);

  return (
    <Frame>
      <GlobalStyle
        theme={theme == "dark" ? darkTheme : lightTheme}></GlobalStyle>
      {account == "" ? <></> : <SideBarCont></SideBarCont>}
      <Routes>
        <Route path="/main" element={<MainCont></MainCont>}></Route>
        <Route path="/explore" element={<ExploreCont></ExploreCont>}></Route>
        <Route path="/" element={<UserContainer />}></Route>
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
