import "./App.css";
import { useNavigate } from "react-router";
import SellModalContain from "./component/sell modal/Container/SellModalContain";
import UserContainer from "./component/User/UserContainer";
import ReactModal from "react-modal";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NFTMintingContainer from "./component/NFTMinting/Container";

import MainCont from "./component/mainPage/Container";
import GlobalStyle from "./styles/globalStyles";
import { lightTheme, darkTheme, Theme } from "./styles/theme";
import { useSelector } from "react-redux";

ReactModal.setAppElement("#root");
function App() {
  const theme = useSelector((state) => state.theme);
  return (
    <div className="App">
      <GlobalStyle
        theme={theme == "dark" ? darkTheme : lightTheme}
      ></GlobalStyle>
      <Routes>
        <Route path="/" element={<MainCont></MainCont>}></Route>
        <Route path="/:params" element={<MainCont></MainCont>}></Route>
        <Route path="/login" element={<UserContainer />}></Route>
        <Route path="/sellmodal" element={<SellModalContain />}></Route>
        {/* <Route path="/modal" element={<NFTMintingContainer />}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
