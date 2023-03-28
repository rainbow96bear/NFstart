import NftSellModal from "./Component";
const SellModalContain = ({ Buysell, NFlist, hash }) => {
  return (
    <>
      <NftSellModal Buysell={Buysell} NFlist={NFlist} hash={hash} />
    </>
  );
};
export default SellModalContain;
