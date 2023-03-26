import UserComp from "./UserComp";
import { action } from "../../modules/userInfo";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Web3 from "web3";
import { useEffect, useState } from "react";

const UserContainer = ({ cookieValue }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const account = useSelector((state) => state.userInfo);

  // const Enter = () => {
  //   if (cookieValue) {
  //     navigate("/main");
  //   }
  // };
  // axios
  //   .post("/api/user/login", {
  //     account,
  //   })
  //   .then((data) => {
  //     navigate(`/${data.data.location}`);
  //   });
  // useEffect(() => {
  //   Enter();
  // }, [cookieValue]);

  return <UserComp cookieValue={cookieValue} />;
};

export default UserContainer;
