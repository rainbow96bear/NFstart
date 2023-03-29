import MypageComp from "./Component";
// HOOK
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// axios
import axios from "axios";
import { useSelector } from "react-redux";

const MypageCont = () => {
  // HOOK
  const [open, setOpen] = useState(false);
  const [NFlist, setNFlist] = useState([]);
  const [sellNft, setSellNft] = useState([]);
  const [User, setUser] = useState([]);
  const [isModal, setIsModal] = useState(true);
  const [userProfile, setUserProfile] = useState("");

  //login 인한 지갑주소
  const location = useLocation();
  const navigate = useNavigate();

  // path 지갑주소
  let tempPath = location.pathname;
  let path = tempPath.slice(9, tempPath.length);
  const { account } = useSelector((state) => state.userInfo);
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
    (async () => {
      if (account) {
        await axios
          .post("/api/user/findProfile", { account })
          .then((data) => setUserProfile(data.data[0].profile));
      }
    })();
  }, [account]);

  return (
    <MypageComp
      open={open}
      setOpen={setOpen}
      User={User}
      NFlist={NFlist}
      path={path}
      isModal={isModal}
      userProfile={userProfile}
      setIsModal={setIsModal}
      modalClick={modalClick}
      sellNft={sellNft}
    ></MypageComp>
    // account 를 확인해서 // 로그인 화면으로 넘어가게 만들어
  );
};

export default MypageCont;
