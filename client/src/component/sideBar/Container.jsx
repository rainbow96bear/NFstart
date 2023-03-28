import SideBarComp from "./Component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SideBarCont = () => {
  const theme = useSelector((state) => state.theme);
  const account = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const changeTheme = async () => {
    dispatch({ type: "theme/change" });
    await axios.put("/api/theme/set", { theme });
  };

  const navigate = useNavigate();

  let { params } = useParams();

  const [registeringNFT, setRegisteringNFT] = useState(false);

  return (
    <SideBarComp
      theme={theme}
      changeTheme={changeTheme}
      params={params}
      navigate={navigate}
      account={account}
      registeringNFT={registeringNFT}
      setRegisteringNFT={setRegisteringNFT}
    ></SideBarComp>
  );
};
export default SideBarCont;
