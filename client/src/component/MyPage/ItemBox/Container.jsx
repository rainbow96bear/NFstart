import ItemBoxComp from "./Component";
import { useState } from "react";
import { useSelector } from "react-redux";

const ItemBoxCont = ({ item, index }) => {
  const theme = useSelector((state) => state.theme);
  const testArr = [
    "https://cover.millie.co.kr/service/cover/179561364/59ede77dd98f4da8bbc057bd8282ad17.jpg?w=125&q=80",
    "https://cover.millie.co.kr/service/cover/179548325/60e43be598bb4da9ab50b39f70c11895.jpg?w=125&q=80",
    "https://cover.millie.co.kr/service/cover/179574180/196635eb017a477385fbe7cec0e7dbf0.jpg?w=125&q=80",
    "https://cover.millie.co.kr/service/cover/179559925/fe449328632a454aadc7be506b0658e5.jpg?w=125&q=80",
  ];
  const [mainImg, setMainImg] = useState(testArr[0]);
  const [zIndex, setZindex] = useState("3");

  const handleMouseOver = () => {
    setZindex("1");
  };

  const handleMouseOut = () => {
    setZindex("3");
  };
  return <ItemBoxComp item={item} theme={theme}></ItemBoxComp>;
};

export default ItemBoxCont;
