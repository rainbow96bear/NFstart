import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import Web3 from "web3";

export const useWeb3 = () => {
  const dispatch = useDispatch();
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState("");
  const [chainId, setChainId] = useState("");

  const linkMeta = useCallback(async () => {
    try {
      if (window.ethereum) {
        const _web3 = new Web3(window.ethereum);
        setWeb3(_web3);
        const [_account] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        if (_account) {
          dispatch({ type: "account/set", payload: { input: _account } });
        }
        window.ethereum.on("accountsChanged", async () => {
          if (window.ethereum) {
            const [_account] = await window.ethereum.request({
              method: "eth_requestAccounts",
            });
            setAccount(_account);
          }
        });
        const _chainId = window.ethereum.networkVersion;
        if (_chainId) {
          dispatch({ type: "chainId/get", payload: { input: _chainId } });
        }

        if (chainId != "0x5") {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x5" }],
          });
        }
      } else {
        console.log("MetaMask is not exist");
      }
    } catch (err) {
      console.log(err);
    }
  }, []);
  return { web3, account, chainId, linkMeta };
};
