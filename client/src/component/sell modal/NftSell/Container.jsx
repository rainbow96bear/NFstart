import NftSellModal from "./Component";
import { useSelector } from "react-redux";
import Web3 from "web3";
const SellModalContain = ({ Buysell, NFlist, hash }) => {
  const user = useSelector((state) => state.userInfo);
  const web3 = new Web3(window.ethereum);
  console.log("유우져", user);
  return (
    <>
      <NftSellModal
        Buysell={Buysell}
        NFlist={NFlist}
        hash={hash}
        user={user}
        web3={web3}
      />
    </>
  );
};
export default SellModalContain;
