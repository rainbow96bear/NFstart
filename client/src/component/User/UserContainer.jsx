import { useEffect, useState } from "react";
import axios from "axios";

import UserComp from "./UserComp";
import { useWeb3 } from "../../modules/useWeb3";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserContainer = () => {
  const { web3, linkMeta } = useWeb3();
  const [balance, setBalance] = useState(undefined);
  const [nickName, setNickName] = useState("");

  const account = useSelector((state) => state.account);
  const chainId = useSelector((state) => state.chainId);

  const navigate = useNavigate();

  // const makeNick = () => {
  //   const adjective = [
  //     "가냘픈",
  //     "가는",
  //     "가엾은",
  //     "거센",
  //     "검은",
  //     "건조한",
  //     "게으른",
  //     "고달픈",
  //     "괜찮은",
  //     "귀여운",
  //     "그리운",
  //     "커다란",
  //     "더러운",
  //     "고운",
  //     "나쁜",
  //     "난데없는",
  //     "날랜",
  //     "너그러운",
  //     "느닷없는",
  //     "느린",
  //     "네모난",
  //     "다른",
  //     "더러운",
  //     "더운",
  //     "딱한",
  //     "동그란",
  //     "뛰어난",
  //     "멋진",
  //     "매마른",
  //     "못난",
  //     "못된",
  //     "무서운",
  //     "미친",
  //     "뽀얀",
  //     "빠른",
  //     "비싼",
  //     "부드러운",
  //     "보잘것없는",
  //     "서툰",
  //     "성가신",
  //     "센",
  //     "수다스러운",
  //     "쉬운",
  //     "슬픈",
  //     "쏜살같은",
  //     "아니꼬운",
  //     "아름다운",
  //     "안된",
  //     "안쓰러운",
  //     "어린",
  //     "약은",
  //     "언짢은",
  //     "엄청난",
  //     "예쁜",
  //     "외로운",
  //     "우스운",
  //     "의심쩍은",
  //     "이른",
  //     "잘빠진",
  //     "잘난",
  //     "젊은",
  //     "점잖은",
  //     "좋은",
  //     "지혜로운",
  //     "짓궂은",
  //     "짧은",
  //     "큰",
  //     "턱없는",
  //     "한결같은",
  //     "희망찬",
  //     "힘겨운",
  //     "힘찬",
  //   ];
  //   const words = [
  //     "무지",
  //     "콘",
  //     "어피치",
  //     "제이지",
  //     "프로도",
  //     "네오",
  //     "튜브",
  //     "라이언",
  //     "춘식이",
  //     "짱구",
  //     "잼민이",
  //   ];
  //   const nickFirst = adjective[Math.floor(Math.random() * words.length)];
  //   const nickLast = words[Math.floor(Math.random() * words.length)];
  //   setNickName(nickFirst + " " + nickLast);
  // };

  useEffect(() => {
    const getMoney = async () => {
      const _balance = await web3?.eth.getBalance(account);
      setBalance(_balance / 10 ** 18);
    };
    getMoney();
  }, []);

  useEffect(() => {
    const isConnected = window.ethereum.isConnected();
    if (balance != undefined) {
      if (isConnected) {
        // 통신은 되지만, balance: NaN이 찍힘
        console.log(balance);
        axios.post("http://localhost:8080/regist", {
          account,
          chainId,
          balance,
        });
      }
    }
  }, [account]);

  // useEffect(() => {
  //   const isConnected = window.ethereum.isConnected();
  //   if (balance != undefined) {
  //     if (isConnected) {
  //       axios.post("http://localhost:8080/regist", {
  //         account,
  //         nickName
  //         chainId,
  //         balance,
  //       });
  //     }
  //   }
  // }, [balance]);

  const logIned = useSelector((state) => state.account);
  if (logIned) {
    navigate("/mypage");
  }

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
