import NFTMintingComponent from "./Component.jsx";

const NFTMintingContainer = ({ account, web3, registeringNFT, setRegisteringNFT, registeringNFTOnclick }) => {

    // console.log(account);
    // console.log(web3);

    return (
        <>
            <NFTMintingComponent registeringNFTOnclick={registeringNFTOnclick} registeringNFT={registeringNFT} setRegisteringNFT={setRegisteringNFT} />
        </>
    );
}

export default NFTMintingContainer;