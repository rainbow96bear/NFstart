import MypageComp from "./Component";
import { useState, useEffect } from "react";
import axios from "axios";
const MypageCont = () => {
  const [open, setOpen] = useState(false);
  const [NFlist, setNFlist] = useState([]);
  const templist = async () => {
    const _NFlist = (await axios.post("http://localhost:8080/api/nft/tomain"))
      .data;
    setNFlist(_NFlist);
  };
  useEffect(() => {
    templist();
  }, []);

  return (
    <MypageComp open={open} setOpen={setOpen} NFlist={NFlist}></MypageComp>
  );
};

export default MypageCont;
