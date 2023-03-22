import ItemBoxComp from "./Component";
import { useState } from "react";
import { useSelector } from "react-redux";

const ItemBoxCont = ({ testArr }) => {
  const theme = useSelector((state) => state.theme);

  const [main, setMain] = useState(testArr[0]);
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
      testArr={testArr}
    ></ItemBoxComp>
  );
};

export default ItemBoxCont;
