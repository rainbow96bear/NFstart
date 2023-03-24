import axios from "axios";
import Web3 from "web3";

const TYPE = {
  LOGIN: "userInfo/login",
  LOGOUT: "userInfo/logOut",
};

const logIn = (account, balance, chainId, nick) => {
  return {
    type: TYPE.LOGIN,
    payload: { account, balance, chainId, nick },
  };
};

const asyncLogIn = () => {
  return async (dispatch) => {
    try {
      const web3 = new Web3(window.ethereum);
      if (window.ethereum) {
        const [account] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const isConnected = window.ethereum.isConnected();
        if (isConnected) {
          const balance = (await web3?.eth.getBalance(account)) / 10 ** 18;
          const chainId = window.ethereum.networkVersion;

          if (chainId != "0x5") {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: "0x5" }],
            });
          }

          const adjective = [
            "가엾은",
            "괜찮은",
            "커다란",
            "더러운",
            "동그란",
            "뛰어난",
            "멋진",
            "예쁜",
            "빠른",
            "지혜로운",
          ];
          const words = ["어피치", "네오", "튜브", "라이언", "춘식이", "짱구"];
          const sliceAccount = account.slice(-2);

          const acArray = sliceAccount.split("");
          console.log(acArray);
          const alphabetArray = [];
          for (let i = 97; i <= 102; i++) {
            const alphabet = String.fromCharCode(i);
            alphabetArray.push(alphabet);
          }
          console.log(alphabetArray);

          let a;
          switch (acArray[0]) {
            case "0":
              a = adjective[0];
              break;
            case "1":
              a = adjective[1];
              break;
            case "2":
              a = adjective[2];
              break;
            case "3":
              a = adjective[3];
              break;
            case "4":
              a = adjective[4];
              break;
            case "5":
              a = adjective[5];
              break;
            case "6":
              a = adjective[6];
              break;
            case "7":
              a = adjective[7];
              break;
            case "8":
              a = adjective[8];
              break;
            case "9":
              a = adjective[9];
              break;
            default:
              break;
          }

          let b;
          switch (acArray[1]) {
            case "a":
              b = words[0];
              break;
            case "b":
              b = words[1];
              break;
            case "c":
              b = words[2];
              break;
            case "d":
              b = words[3];
              break;
            case "e":
              b = words[4];
              break;
            case "f":
              b = words[5];
              break;
            default:
              break;
          }
          const nickName = a + " " + b;

          axios.post("http://localhost:8080/api/user/regist", {
            account,
            nickName,
            balance,
            chainId,
          });
          dispatch({
            type: "userInfo/login",
            payload: { account, balance, chainId, nickName },
          });
        }
      } else {
        console.log("MetaMask is not exist");
      }
    } catch (err) {
      dispatch({ type: "error", payload: err });
    }
  };
};

const asyncLogOut = () => {};

export const action = { logIn, asyncLogIn };

export const initialize = {
  userInfo: { account: "", balance: -1, chainId: "", nick: "" },
};

export const reducer = (state = initialize, action) => {
  const { type, payload } = action;
  console.log(payload);
  switch (type) {
    case TYPE.LOGIN:
      return { ...state, ...payload };
    case TYPE.LOGOUT:
      return state;
    default:
      return state;
  }
};
