import UserComp from "./UserComp";
import { action } from "../../modules/userInfo";
import { useDispatch } from "react-redux";
import axios from "axios";
import Web3 from "web3";
import { useEffect, useState } from "react";

const UserContainer = () => {
  const dispatch = useDispatch();
  const [change, setChange] = useState();

  return <UserComp />;
};

export default UserContainer;
