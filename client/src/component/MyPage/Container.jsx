import MypageComp from "./Component";
// HOOK
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// axios
import axios from "axios";

const MypageCont = () => {
  // HOOK
  const [open, setOpen] = useState(false);
  const [NFlist, setNFlist] = useState([]);
  let { account } = useParams();
  //login
  const location = useLocation();
  const { nickName } = useSelector((state) => state.userInfo);

  const templist = async () => {
    const _NFlist = (await axios.post(`/api/nft/toMypage`, { account })).data;
    setNFlist(_NFlist);
  };
  // const tempNft= async()=>{
  //   const _
  // }
  useEffect(() => {
    templist();
  }, []);

  return (
    <>
      {location.pathname != "/login" ? (
        <MypageComp
          open={open}
          setOpen={setOpen}
          NFlist={NFlist}
          nickName={nickName}
        ></MypageComp>
      ) : (
        // account 를 확인해서
        <></>
        // 로그인 화면으로 넘어가게 만들어
      )}
    </>
  );
};

export default MypageCont;
