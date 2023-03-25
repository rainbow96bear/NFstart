import MainComp from "./Component";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const MainCont = () => {
  const [NFlist, setNFlist] = useState([]);
  const [mainId, setMainId] = useState([]);
  const { account } = useSelector((state) => state.userInfo);

  const templist = async () => {
    const _NFlist = (await axios.post("/api/nft/tomain", { account })).data;
    setNFlist(_NFlist);
  };
  const tempId = async () => {
    const _MainId = (await axios.post("/api/nft/tomainAll")).data;
    // console.log("id", _MainId);

    setMainId(_MainId);
  };
  useEffect(() => {
    templist();
    tempId();
  }, []);
  // console.log("어카", { account });
  // console.log("nflist", NFlist);
  // console.log("location", mainId);

  return <MainComp NFlist={NFlist} mainId={mainId}></MainComp>;
};
export default MainCont;
