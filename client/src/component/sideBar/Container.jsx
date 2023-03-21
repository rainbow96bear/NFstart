import SideBarComp from "./Component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const SideBarCont = ({ account }) => {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const changeTheme = () => {
    dispatch({ type: "theme/change" });
  };
  let { params } = useParams();
  const navigate = useNavigate();

  const [registeringNFT, setRegisteringNFT] = useState(false);

  return (
    <SideBarComp
      theme={theme}
      changeTheme={changeTheme}
      params={params}
      navigate={navigate}
      registeringNFT={registeringNFT}
      setRegisteringNFT={setRegisteringNFT}
    ></SideBarComp>
  );
};
export default SideBarCont;
