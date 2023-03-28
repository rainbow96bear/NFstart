import ItemBoxComp from "./Component";
import { useSelector } from "react-redux";

const ItemBoxCont = ({ item }) => {
  const theme = useSelector((state) => state.theme);

  return <ItemBoxComp item={item} theme={theme}></ItemBoxComp>;
};

export default ItemBoxCont;
