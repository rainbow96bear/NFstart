import { useState } from "react";
import UserComp from "./UserComp";

const UserContainer = () => {
  const [web3, setWeb3] = useState();
  return <UserComp />;
};

export default UserContainer;
