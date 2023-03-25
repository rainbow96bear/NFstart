import MainComp from "./Component";
import { useEffect, useState } from "react";
import axios from "axios";

const MainCont = () => {
  const [mainId, setMainId] = useState([]);

  const tempId = async () => {
    const _MainId = (await axios.post("/api/nft/tomainAll")).data;
    setMainId(_MainId);
  };
  useEffect(() => {
    tempId();
  }, []);

  return <MainComp mainId={mainId}></MainComp>;
};
export default MainCont;
