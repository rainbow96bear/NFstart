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

  const goBuybuy = async () => {
    const _butbuy = (await axios.post(`/api/nft/buybuy`, { account })).data;
    setBuybuy(_butbuy);
  };

  useEffect(() => {
    goBuybuy();
  }, []);

  return (
    <>
      <SellModal
        theme={theme}
        buybuy={buybuy}
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
