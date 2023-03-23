import Chat from "../Component/ChatComp";
import styled from "styled-components";
const ChatContain = () => {
  return (
    <ChatCt>
      <Chat />
    </ChatCt>
  );
};
export default ChatContain;
const ChatCt = styled.div`
  display: flex;
  width: 80%;
  align-items: center;
  justify-content: center;
`;
