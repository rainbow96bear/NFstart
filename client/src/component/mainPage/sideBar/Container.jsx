import SideBarComp from "./Component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const SideBarCont = () => {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const changeTheme = () => {
    dispatch({ type: "theme/change" });
  };
  let { params } = useParams();
  const navigate = useNavigate();
  return (
    <SideBarComp
      theme={theme}
      changeTheme={changeTheme}
      params={params}
      navigate={navigate}></SideBarComp>
  );
};
export default SideBarCont;
