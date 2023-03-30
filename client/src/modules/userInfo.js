import axios from "axios";
import Web3 from "web3";

const TYPE = {
  LOGIN: "userInfo/login",
  LOGOUT: "userInfo/logout",
};

const logIn = (account, balance, chainId, nick, profile) => {
  return {
    type: TYPE.LOGIN,
    payload: { account, balance, chainId, nick, profile },
  };
};

const logOut = () => {
  return {
    type: TYPE.LOGOUT,
  };
};

const name = (account, nick) => {
  return {
    type: TYPE.NAME,
    payload: { account, nick },
  };
};

// const set = (profile) => {
//   return {
//     type: TYPE.PROFILE,
//     payload: profile,
//   };
// };

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
          const abc = await axios.post("/api/user/info", { account });
          if (abc.data.nickData == null) {
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
            const words = [
              "어피치",
              "네오",
              "튜브",
              "라이언",
              "춘식이",
              "짱구",
            ];

            const nickFirst =
              adjective[Math.floor(Math.random() * adjective.length)];
            const nickLast = words[Math.floor(Math.random() * words.length)];

            const nickName = nickFirst + " " + nickLast;
            console.log(nickName);

            await axios
              .post("/api/user/regist", {
                account,
                nickName,
                balance,
                chainId,
              })
              .then(() => {
                dispatch({
                  type: "userInfo/login",
                  payload: { account, balance, chainId, nickName },
                });
              });
          } else {
            const nickName = abc.data.nickData.nickName;

            dispatch({
              type: "userInfo/login",
              payload: { account, balance, chainId, nickName },
            });
          }
          localStorage.setItem("account", account);
        }
        axios.post("/api/user/login", {
          account,
        });
      } else {
        console.log("MetaMask is not exist");
      }
    } catch (err) {
      dispatch({ type: "error", payload: err });
    }
  };
};

const asyncLogOut = () => {
  localStorage.clear();
  axios.post("/api/user/logout").then(() => {
    window.location.reload();
  });
};

export const action = {
  logIn,
  logOut,
  name,
  asyncLogIn,
  asyncLogOut,
};

export const initialize = {
  userInfo: {
    account: "",
    balance: -1,
    chainId: "",
    nickName: "",
    profile: "",
  },
};

export const reducer = (state = initialize, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPE.LOGIN:
      return { ...state, ...payload };
    case TYPE.LOGOUT:
      return { ...initialize };
    // case TYPE.PROFILE:
    //   return { ...state };
    default:
      return state;
  }
};
