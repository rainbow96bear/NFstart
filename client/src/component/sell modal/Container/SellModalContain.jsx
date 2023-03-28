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
  let { account } = useParams();
  const [button, setButton] = useState();

  const tempButton = async () => {
    const _button = (await axios.post(`/api/nft/modalBt`, { account })).data;
    setButton(_button);
  };
  useEffect(() => {
    tempButton();
  }, []);

  return (
    <>
      <SellModal
        theme={theme}
        button={button}
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
