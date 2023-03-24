import MainComp from "./Component";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const MainCont = () => {
  const [NFlist, setNFlist] = useState([]);
  const [mainId, setMainId] = useState([]);

  const templist = async () => {
    const _NFlist = (await axios.post("/api/nft/tomain")).data;
    setNFlist(_NFlist);
  };
  const tempId = async () => {
    const _MainId = (await axios.post("api/nft/tomainAll")).data;
    console.log("id", _MainId);

    setMainId(_MainId);
  };
  useEffect(() => {
    templist();
    tempId();
  }, []);

  return <MainComp NFlist={NFlist} mainId={mainId}></MainComp>;
};
export default MainCont;
