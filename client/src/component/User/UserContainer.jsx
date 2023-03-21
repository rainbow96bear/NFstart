import { useEffect, useState } from "react";
import axios from "axios";

import UserComp from "./UserComp";
import { useWeb3 } from "../../modules/useWeb3";
import { useNavigate } from "react-router-dom";

const UserContainer = () => {
  const { web3, account, chainId, linkMeta } = useWeb3();
  const [balance, setBalance] = useState(undefined);
  const [connect, setConnect] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getMoney = async () => {
      const _balance = await web3?.eth.getBalance(account);
      setBalance(_balance / 10 ** 18);
    };
    getMoney();
  }, [account]);

  useEffect(() => {
    const isConnected = window.ethereum.isConnected();
    if (balance != undefined) {
      if (isConnected) {
        axios.post("http://localhost:8080/userInfo", {
          account,
          chainId,
          balance,
        });
      }
    }
  }, [balance]);

  return (
    <UserComp
      web3={web3}
      account={account}
      balance={balance}
      chainId={chainId}
      linkMeta={linkMeta}
    />
  );
};

export default UserContainer;
