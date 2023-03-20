import "./App.css";
import SellModalContain from "./component/sell modal/Container/SellModalContain";
import UserContainer from "./component/User/UserContainer";
import ReactModal from "react-modal";
import { Routes, Route } from "react-router-dom";
import NFTMintingContainer from "./component/NFTMinting/Container";
import SideBarCont from "./component/sideBar/Container";
import MainCont from "./component/mainPage/Container";
import GlobalStyle from "./styles/globalStyles";
import { lightTheme, darkTheme } from "./styles/theme";
import { useSelector } from "react-redux";
import styled from "styled-components";
import MypageCont from "./component/MyPage/Container";

ReactModal.setAppElement("#root");
function App() {
  const theme = useSelector((state) => state.theme);
  return (
    <Frame>
      <GlobalStyle
        theme={theme == "dark" ? darkTheme : lightTheme}></GlobalStyle>
      <SideBarCont></SideBarCont>
      <Routes>
        <Route path="/" element={<MainCont></MainCont>}></Route>
        <Route path="/:params" element={<MainCont></MainCont>}></Route>
        <Route path="/login" element={<UserContainer />}></Route>
        <Route path="/sellmodal" element={<SellModalContain />}></Route>
        <Route path="/mypage" element={<MypageCont />}></Route>
      </Routes>
    </Frame>
  );
}

export default App;

const Frame = styled.div`
  display: flex;
`;
