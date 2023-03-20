import "./App.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import MainCont from "./component/mainPage/Container";
import GlobalStyle from "./styles/globalStyles";
import { lightTheme, darkTheme, Theme } from "./styles/theme";
import { useSelector } from "react-redux";

function App() {
  const theme = useSelector((state) => state.theme);

  return (
    <div className="App">
      <GlobalStyle
        theme={theme == "dark" ? darkTheme : lightTheme}></GlobalStyle>
      <Routes>
        <Route path="/" element={<MainCont></MainCont>}></Route>
        <Route path="/:params" element={<MainCont></MainCont>}></Route>
      </Routes>
    </div>
  );
}

export default App;
