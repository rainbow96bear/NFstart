import NFTMintingComponent from "./Component.jsx";

const NFTMintingContainer = ({ registeringNFT, setRegisteringNFT, registeringNFTOnclick }) => {


    return (
        <>
            <NFTMintingComponent registeringNFT={registeringNFT} setRegisteringNFT={setRegisteringNFT} />
        </>
    );
}

export default NFTMintingContainer;