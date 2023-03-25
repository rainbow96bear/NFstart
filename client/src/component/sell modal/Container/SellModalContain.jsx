import SellModal from "../Component/SellModal";
// import ReactModal from "react-modal";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

import axios from "axios";

const SellModalContain = ({ isOpen, setIsOpen, click, main }) => {
  let { account } = useParams();

  const theme = useSelector((state) => state.theme);
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
      />
    </>
  );
};
export default SellModalContain;
// const ModalBox = styled.div``;
