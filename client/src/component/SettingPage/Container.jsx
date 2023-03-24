import SettingComp from "./Component";
// HOOK
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// axios
import axios from "axios";

const SettingCont = () => {
  const theme = useSelector((state) => state.theme);

  return <SettingComp theme={theme}></SettingComp>;
};

export default SettingCont;
