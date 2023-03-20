import "./App.css";
import { useNavigate } from "react-router";
import SellModalContain from "./component/sell modal/Container/SellModalContain";
import ReactModal from "react-modal";
ReactModal.setAppElement("#root");
function App() {
  // const nav = useNavigate();
  return (
    <div className="App">
      <SellModalContain />
    </div>
  );
}

export default App;
