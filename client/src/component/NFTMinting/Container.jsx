import NFTMintingComponent from "./Component.jsx";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const NFTMintingContainer = ({
  registeringNFT,
  setRegisteringNFT,
  registeringNFTOnclick,
}) => {

  const account = useSelector((state) => state.account);

  return (
    <>
      <NFTMintingComponent
        registeringNFTOnclick={registeringNFTOnclick}
        registeringNFT={registeringNFT}
        setRegisteringNFT={setRegisteringNFT}
        account={account}
      />
    </>
  );
};

export default NFTMintingContainer;
