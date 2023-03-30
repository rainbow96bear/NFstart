import MypageComp from "./Component";
// HOOK
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// axios
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const MypageCont = () => {
  // HOOK
  const [open, setOpen] = useState(false);
  const [NFlist, setNFlist] = useState([]);
  const [sellNft, setSellNft] = useState([]);
  const [User, setUser] = useState([]);
  const [isModal, setIsModal] = useState(true);
  const [isNameModal, setIsNameModal] = useState(true);
  const [userProfile, setUserProfile] = useState("");
  const [userNick, setUserNick] = useState("");

  //login 인한 지갑주소
  const location = useLocation();
  const navigate = useNavigate();

  // path 지갑주소
  let tempPath = location.pathname;
  let path = tempPath.slice(9, tempPath.length);
  const dispatch = useDispatch();
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

  const nameModalClick = () => {
    setIsNameModal(!isNameModal);
  };

  const sellNftList = async () => {
    const _sellNft = (await axios.post(`/api/nft/mySellNft`, { path })).data;

    setSellNft(_sellNft);
  };

  const remove = async () => {
    await axios.post("/api/user/remove", { userProfile });
  };

  const replaceName = (name) => {
    console.log(name, account);
    axios
      .post("/api/user/replace", {
        nickName: name,
        account: account,
      })
      .then((data) => window.location.reload());
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
      remove={remove}
      isModal={isModal}
      replaceName={replaceName}
      isNameModal={isNameModal}
      userProfile={userProfile}
      userNick={userNick}
      setIsModal={setIsModal}
      setIsNameModal={setIsNameModal}
      nameModalClick={nameModalClick}
      modalClick={modalClick}
      sellNft={sellNft}
    ></MypageComp>
    // account 를 확인해서 // 로그인 화면으로 넘어가게 만들어
  );
};

export default MypageCont;
