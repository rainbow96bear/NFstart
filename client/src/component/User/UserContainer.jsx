import UserComp from "./UserComp";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

const UserContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // login 할 경우 localStorage에 account로 저장
  const localValue = localStorage.getItem("account");

  const Enter = () => {
    // localStorage로 판단하여 라우터 이동 | 성진 git에서 문제 없을 경우 app으로 옮기기
    if (localValue != null) {
      const getAccount = async () => {
        const [_account] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const data = (await axios.post("/api/user/info", { account: _account }))
          .data;
        const { account, nickName, chainId, balance } = data.nickData;
        dispatch({
          type: "userInfo/login",
          payload: { account, nickName, chainId, balance },
        });
      };
      getAccount();
      navigate("/main");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    Enter();
  }, [localValue]);

  return <UserComp Enter={Enter} />;
};

export default UserContainer;
