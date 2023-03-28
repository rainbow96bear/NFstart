import NFTMintingComponent from "./Component.jsx";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Web3 from "web3";

const NFTMintingContainer = ({
  registeringNFT,
  setRegisteringNFT,
  registeringNFTOnclick,
  setDrawingFile,
  drawingFile,
  drawingDataUrl,

}) => {
  const { account } = useSelector((state) => state.userInfo);

  // GOERLI_API_KEY 요청 보내는 것으로 바꾸기
  // ganache
  const web3 = new Web3(window.ethereum);

  return (
    <>
      <NFTMintingComponent
        registeringNFTOnclick={registeringNFTOnclick}
        registeringNFT={registeringNFT}
        setRegisteringNFT={setRegisteringNFT}
        account={account}
        web3={web3}
        setDrawingFile={setDrawingFile}
        drawingFile={drawingFile}
        drawingDataUrl={drawingDataUrl}

      />
    </>
  );
};

export default NFTMintingContainer;
