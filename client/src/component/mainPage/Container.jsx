import MainComp from "./Component";
import { useEffect, useState } from "react";
import axios from "axios";

const MainCont = () => {
  const [NFlist, setNFlist] = useState([]);

  const templist = async () => {
    const _NFlist = (await axios.post("http://localhost:8080/api/nft/tomain"))
      .data;
    setNFlist(_NFlist);
  };
  useEffect(() => {
    templist();
  }, []);

  return <MainComp NFlist={NFlist}></MainComp>;
};
export default MainCont;
