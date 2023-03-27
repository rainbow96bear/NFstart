import ItemBoxComp from "./Component";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

const ItemBoxCont = ({ item, index, NFlist }) => {
  const theme = useSelector((state) => state.theme);
  const user = useSelector((state) => state.userInfo);

  const [nowPageUser, setNowPageUser] = useState("");
  const location = useLocation();

  useEffect(() => {
    setNowPageUser(user.account);
  }, [user]);

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
        <ItemBoxComp
          item={item}
          theme={theme}
          NFlist={NFlist}
          nowPageUser={nowPageUser}
        ></ItemBoxComp>
      ) : (
        <></>
      )}
    </>
  );
};

export default ItemBoxCont;
