import UserComp from "./UserComp";
import { action } from "../../modules/userInfo";
import { useDispatch } from "react-redux";
import axios from "axios";
import Web3 from "web3";
import { useEffect } from "react";

const UserContainer = () => {
  const dispatch = useDispatch();

  // console.log(account);
  // const nickName = dispatch(action.nick);
  // const balance = dispatch(action.balance);
  // const chainId = dispatch(action.chainId);
  // axios.post("http://localhost:8080/api/user/regist", {
  //   account,

  // });

  window.ethereum.on("accountsChanged", async () => {
    if (window.ethereum) {
      const changeAccount = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (changeAccount) {
        dispatch(action.asyncLogIn());
      }
    }
  });

  return <UserComp />;
};

export default UserContainer;
