import SellModal from "../Component/SellModal";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Web3 from "web3";

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

  const { account } = useSelector((state) => state.userInfo);
  const web3 = new Web3(window.ethereum);
  const [buybuy, setBuybuy] = useState();

  const goBuybuy = async () => {
    const _butbuy = (
      await axios.post(`/api/nft/buybuy`, { data: main.hash, account: account })
    ).data;
    console.log("넘어오는거", _butbuy);
    setBuybuy(_butbuy);
    const buyInfo = await web3.eth.sendTransaction(_butbuy.BuyObj);
    const render = (
      await axios.post(`/api/nft/render`, { data: main.hash, account: account })
    ).data;
  };
  return (
    <>
      <SellModal
        theme={theme}
        buybuy={buybuy}
        goBuybuy={goBuybuy}
        click={click}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        main={main}
        nowPageUser={nowPageUser}
        NFlist={NFlist}
      />
    </>
  );
};
export default SellModalContain;
