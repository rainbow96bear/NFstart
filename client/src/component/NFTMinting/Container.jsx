import NFTMintingComponent from "./Component.jsx";

const NFTMintingContainer = ({
  registeringNFT,
  setRegisteringNFT,
  registeringNFTOnclick,
}) => {
  return (
    <>
      <NFTMintingComponent
        registeringNFTOnclick={registeringNFTOnclick}
        registeringNFT={registeringNFT}
        setRegisteringNFT={setRegisteringNFT}
      />
    </>
  );
};

export default NFTMintingContainer;
