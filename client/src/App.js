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
import axios from "axios";
import { action } from "./modules/userInfo";
import { useEffect, useState } from "react";
import RandomContainer from "./component/Random/Container";

ReactModal.setAppElement("#root");
function App() {
  const theme = useSelector((state) => state.theme);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { account } = useSelector((state) => state.userInfo);

  // 쿠키 정보 가져오기
  const cookieValue = document.cookie.match(
    "(^|;) ?" + "logout" + "=([^;]*)(;|$)"
  );
  // metamask 계정 변경 시 실행
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
  // 새로고침 할 경우 account가 있을 경우 실행 (로그인 여부 판단)
  useEffect(() => {
    if (account) {
      const getAccount = async () => {
        const [_account] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const data = (await axios.post("/api/user/info", { account: _account }))
          .data;
        const { account, nickName, chainId, balance } = data.nickData;
        dispatch({
          type: "userInfo/login",
          payload: { account, nickName, chainId, balance },
        });
      };
      getAccount();
    } else {
      navigate("/");
    }
  }, [account]);

  return (
    <>
      {/* 로딩 페이지 적용하려고 했었음... */}
      {/* {loading && <LoadingComp />} */}
      <Frame>
        <GlobalStyle
          theme={theme == "dark" ? darkTheme : lightTheme}
        ></GlobalStyle>
        <SideBarCont cookieValue={cookieValue}></SideBarCont>
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
