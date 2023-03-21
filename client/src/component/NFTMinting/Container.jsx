import NFTMintingComponent from "./Component.jsx";

const NFTMintingContainer = ({ account, web3, registeringNFT, setRegisteringNFT, registeringNFTOnclick }) => {

    console.log(account);

    return (
        <>
            <NFTMintingComponent account={account} registeringNFTOnclick={registeringNFTOnclick} registeringNFT={registeringNFT} setRegisteringNFT={setRegisteringNFT} />
        </>
    );
}

export default NFTMintingContainer;