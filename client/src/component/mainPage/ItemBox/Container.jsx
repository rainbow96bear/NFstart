import ItemBoxComp from "./Component";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ItemBoxCont = ({ NFlist }) => {
  const theme = useSelector((state) => state.theme);
  const [main, setMain] = useState("");
  useEffect(() => {
    setMain(NFlist[0]);
  }, [NFlist]);
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
    ></ItemBoxComp>
  );
};

export default ItemBoxCont;
