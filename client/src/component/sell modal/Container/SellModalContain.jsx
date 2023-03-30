import SellModal from "../Component/SellModal";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import axios from "axios";

const SellModalContain = ({
  isOpen,
  setIsOpen,
  click,
  main,
  nowPageUser,
  NFlist,
}) => {
  // redux
  const theme = useSelector((state) => state.theme);
  // Hook
  const account = useSelector((state) => state.userInfo);
  const [buybuy, setBuybuy] = useState();
  // const favDbData = NFlist.map((item) => {
  //   item.favorite;
  // });
  const [count, setCount] = useState(1);

  // const goBuybuy = async () => {
  //   const _butbuy = (await axios.post(`/api/nft/buybuy`, { account })).data;
  //   setBuybuy(_butbuy);
  // };

  const favClick = async () => {
    setCount(count + 1);
    const abc = await axios.post("/api/user/info", { account });
    console.log(abc);
    // const countData = (
    //   await axios.post(`/api/nft/favorite`, { account, count })
    // ).data;
    // console.log(countData);
  };

  // useEffect(() => {
  //   goBuybuy();
  // }, []);

  // const loveNft = async () => {
  //   const count = (await axios.post(`/api/nft/favorite`, { account })).data;
  //   console.log(count + 1);
  // };

  // useEffect(()=>{
  //   loveNft()
  // },[])

  return (
    <>
      <SellModal
        theme={theme}
        buybuy={buybuy}
        click={click}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        main={main}
        favClick={favClick}
        nowPageUser={nowPageUser}
        NFlist={NFlist}
      />
    </>
  );
};
export default SellModalContain;
