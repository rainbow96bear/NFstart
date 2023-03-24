import MainComp from "./Component";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const MainCont = () => {
  const [NFlist, setNFlist] = useState([]);

  const templist = async () => {
    const _NFlist = (await axios.post("/api/nft/tomain")).data;
    setNFlist(_NFlist);
  };
  useEffect(() => {
    templist();
  }, []);

  return <MainComp NFlist={NFlist}></MainComp>;
};
export default MainCont;
