import styled from "styled-components";
import UserContainer from "./component/User/UserContainer";
import FooterContainer from "./component/Footer/FooterContainer";

function App() {
  return (
    <AppBox>
      <UserContainer />
      <FooterContainer />
    </AppBox>
  );
}

export default App;

const AppBox = styled.div`
  width: 100%;
  box-sizing: border-box;
`;
