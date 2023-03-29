import SettingComp from "./Component";
// HOOK
import { useSelector } from "react-redux";

// axios
const SettingCont = () => {
  const theme = useSelector((state) => state.theme);

  return <SettingComp theme={theme}></SettingComp>;
};

export default SettingCont;
