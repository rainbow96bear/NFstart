import ItemBoxComp from "./Component";
import { useState } from "react";
import { useSelector } from "react-redux";

const ItemBoxCont = ({ item, index }) => {
  const theme = useSelector((state) => state.theme);

  const [zIndex, setZindex] = useState("3");

  const handleMouseOver = () => {
    setZindex("1");
  };

  const handleMouseOut = () => {
    setZindex("3");
  };
  return (
    <>
      {location.pathname != "login" ? (
        <ItemBoxComp item={item} theme={theme}></ItemBoxComp>
      ) : (
        <></>
      )}
    </>
  );
};

export default ItemBoxCont;
