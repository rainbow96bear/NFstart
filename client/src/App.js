import "./App.css";
import SellModalContain from "./component/sell modal/Container/SellModalContain";
import ReactModal from "react-modal";
import { Routes, Route } from "react-router-dom";

import MainCont from "./component/mainPage/Container";
import GlobalStyle from "./styles/globalStyles";
import { lightTheme, darkTheme } from "./styles/theme";
import { useSelector } from "react-redux";

ReactModal.setAppElement("#root");
function App() {
  const theme = useSelector((state) => state.theme);
  return (
    <div className="App">
      <GlobalStyle
        theme={theme == "dark" ? darkTheme : lightTheme}></GlobalStyle>
      <Routes>
        <Route path="/" element={<MainCont></MainCont>}></Route>
        <Route path="/:params" element={<MainCont></MainCont>}></Route>
        <Route
          path="/sellmodal"
          element={<SellModalContain></SellModalContain>}></Route>
      </Routes>
    </div>
  );
}

export default App;
