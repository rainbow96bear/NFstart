import SideBarComp from "./Component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { action } from "../../modules/userInfo";

const SideBarCont = ({ cookieValue }) => {
  const theme = useSelector((state) => state.theme);
  const account = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const changeTheme = async () => {
    dispatch({ type: "theme/change" });
    await axios.put("/api/theme/set", { theme });
  };

  useEffect(() => {
    const test = async () => {
      const _theme = await axios.get("/api/theme/get", {
        theme,
      });
      if (theme != _theme) {
        dispatch({ type: "theme/change" });
      }
    };
    test();
  }, []);

  let { params } = useParams();
  const navigate = useNavigate();

  const [registeringNFT, setRegisteringNFT] = useState(false);

  return (
    <SideBarComp
      theme={theme}
      changeTheme={changeTheme}
      params={params}
      navigate={navigate}
      account={account}
      cookieValue={cookieValue}
      registeringNFT={registeringNFT}
      setRegisteringNFT={setRegisteringNFT}
    ></SideBarComp>
  );
};
export default SideBarCont;
