import styled from "styled-components";
import ItemBoxCont from "./ItemBox/Container";

const MainComp = () => {
  return (
    <Main>
      <ItemBoxCont></ItemBoxCont>
      <ItemBoxCont></ItemBoxCont>
      <ItemBoxCont></ItemBoxCont>
      <ItemBoxCont></ItemBoxCont>
    </Main>
  );
};

export default MainComp;

const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  overflow-y: scroll;
`;
