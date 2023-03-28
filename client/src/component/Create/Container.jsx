import { useState } from "react";
import CreateComp from "./Component";

const CreateCont = () => {
  const [registeringNFT, setRegisteringNFT] = useState(false);
  return (
    <CreateComp
      setRegisteringNFT={setRegisteringNFT}
      registeringNFT={registeringNFT}></CreateComp>
  );
};
export default CreateCont;