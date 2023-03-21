import MypageComp from "./Component";
import { useState } from "react";

const MypageCont = () => {
  const [open, setOpen] = useState(false);
  // const modalOpen = () => {
  //   setOpen();
  // };
  return <MypageComp open={open} setOpen={setOpen}></MypageComp>;
};

export default MypageCont;
