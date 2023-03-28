import MypageComp from "./Component";
// HOOK
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// axios
import axios from "axios";

const MypageCont = () => {
  // HOOK
  const [open, setOpen] = useState(false);
  const [NFlist, setNFlist] = useState([]);
  const [sellNft, setSellNft] = useState([]);
  const [User, setUser] = useState([]);
  const [isModal, setIsModal] = useState(true);

  //login 인한 지갑주소
  const location = useLocation();

  // path 지갑주소
  let tempPath = location.pathname;
  let path = tempPath.slice(9, tempPath.length);

  const templist = async () => {
    const _User = (await axios.post(`/api/nft/toMypage`, { path })).data;
    setUser(_User);
  };
  const tempNF = async () => {
    const _NFlist = (await axios.post(`/api/nft/myNFT`, { path })).data;

    setNFlist(_NFlist);
  };

  const modalClick = () => {
    setIsModal(!isModal);
  };

  const sellNftList = async () => {
    const _sellNft = (await axios.post(`/api/nft/mySellNft`, { path })).data;

    setSellNft(_sellNft);
  };
  useEffect(() => {
    templist();
    tempNF();
    sellNftList();
  }, []);

  return (
    <MypageComp
      open={open}
      setOpen={setOpen}
      User={User}
      NFlist={NFlist}
      path={path}
      isModal={isModal}
      setIsModal={setIsModal}
      modalClick={modalClick}
      sellNft={sellNft}
    ></MypageComp>
    // account 를 확인해서 // 로그인 화면으로 넘어가게 만들어
  );
};

export default MypageCont;
