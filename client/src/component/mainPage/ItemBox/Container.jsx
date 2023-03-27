import ItemBoxComp from "./Component";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const ItemBoxCont = ({ item }) => {
  const [NFlist, setNFlist] = useState([]);
  const theme = useSelector((state) => state.theme);
  const [main, setMain] = useState("");

  const templist = async () => {
    const _NFlist = (
      await axios.post("/api/nft/tomain", { account: item.account })
    ).data;
    setNFlist(_NFlist);
  };
  useEffect(() => {
    setMain(NFlist[0]);
  }, [NFlist]);
  useEffect(() => {
    templist();
  }, []);
  const [zIndex, setZindex] = useState("3");

  const handleMouseOver = () => {
    setZindex("1");
  };

  const handleMouseOut = () => {
    setZindex("3");
  };
  return (
    <ItemBoxComp
      handleMouseOver={handleMouseOver}
      handleMouseOut={handleMouseOut}
      zIndex={zIndex}
      setMain={setMain}
      main={main}
      theme={theme}
      NFlist={NFlist}
      item={item}
    ></ItemBoxComp>
  );
};

export default ItemBoxCont;
