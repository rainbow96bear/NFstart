import ItemBoxComp from "./Component";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

const ItemBoxCont = ({ item, index, NFlist }) => {
  const theme = useSelector((state) => state.theme);

  const location = useLocation();

  const [zIndex, setZindex] = useState("3");

  const handleMouseOver = () => {
    setZindex("1");
  };

  const handleMouseOut = () => {
    setZindex("3");
  };
  return <ItemBoxComp item={item} theme={theme} NFlist={NFlist}></ItemBoxComp>;
};

export default ItemBoxCont;
