import styled from "styled-components";
import { GiCycle } from "react-icons/gi";
import { FiSend } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "axios";
const Chat = () => {
  //   const [obj, setObj] = useState({
  //     userId: "ugyh",
  //     partnerId: "yvu",
  //     text: "asdasd",
  //     time: "asdadfds",
  //   });
  //   useEffect(async () => {
  //     if (!obj.length) {
  //       const temp = await axios.post("http://localhost:8080/api/chat", {
  //         obj,
  //       });
  //     }
  //   }, []);
  return (
    <ChatBox>
      <LeftBox>
        <div>userName</div>
        <div>
          <ChatUser>
            <div>이미지</div>
            <div>닉네임</div>
          </ChatUser>
          <ChatUser>2</ChatUser>
          <ChatUser>2</ChatUser>
          <ChatUser>2</ChatUser>
          <ChatUser>2</ChatUser>
          <ChatUser>2</ChatUser>
          <ChatUser>2</ChatUser>
        </div>
      </LeftBox>
      <RightBox>
        <div>
          <div>
            <div>이미지</div>
            <div>닉네임</div>
          </div>
        </div>
        <div>2</div>
        <div>
          <div>
            <input type="text" />
          </div>
          <div>
            <FiSend />
          </div>
        </div>
      </RightBox>
    </ChatBox>
  );
};
export default Chat;

const ChatBox = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid red;
  box-sizing: border-box;
  flex-shrink: 0;
  font-size: 100%;
  width: 95%;
  height: 85%;
  font-size: 100%;
  padding: 20px;
  position: relative;
  vertical-align: baseline;
  margin-left: auto;
`;
const LeftBox = styled.div`
  display: flex;
  width: 350px;
  border: 0;
  box-sizing: border-box;
  align-items: stretch;
  flex-direction: column;
  flex-shrink: 0;
  font: inherit;
  font-size: 100%;
  height: 100%;
  margin: 0;
  overflow: hidden;
  padding: 0;
  position: relative;
  vertical-align: baseline;

  /* border-right: 1px solid rgb(var(--ig-elevated-separator)); */
  & > div:first-child {
    display: flex;
    box-sizing: border-box;
    flex-direction: row;
    flex-wrap: wrap;
    font-size: 16px;
    font-weight: 600;
    height: 60px;
    padding: 0 20px;
    width: 100%;
    z-index: 2;
    align-items: center;
    justify-content: center;
  }
  & > div:nth-child(2) {
    & > div {
      height: 56px;
    }
  }
`;
const ChatUser = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  padding-top: 8px;
  padding-bottom: 0px;
  height: calc(100%-44px);
  overflow: hidden;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 1px solid black;
  gap: 6px;
`;
const RightBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  box-sizing: border-box;
  width: 90%;
  height: 100%;
  align-items: center;
  justify-content: center;
  & > div:first-child {
    border-bottom: 1px solid black;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    font-size: 16px;
    font-weight: 600;
    padding: 0 10px;
    width: 100%;
    z-index: 2;
    height: 5%;
    & > div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  & > div:nth-child(2) {
    width: 100%;
    height: 70%;
    border: 1px solid black;
  }
  & > div:nth-child(3) {
    width: 90%;
    align-items: center;
    border: 1px solid black;
    border-radius: 22px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    font: inherit;
    font-size: 100%;
    margin: 0;
    min-height: 44px;
    padding: 0;
    padding-left: 11px;
    padding-right: 8px;
    position: relative;
    vertical-align: baseline;

    & > div:nth-child(3) {
      & > div:first-child input {
        display: flex;
        border: none;
        background-color: aqua;
      }
    }
  }
`;
