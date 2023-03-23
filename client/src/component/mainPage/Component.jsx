import styled from "styled-components";
import ItemBoxCont from "./ItemBox/Container";

const MainComp = ({ NFlist }) => {
  return (
    <Main>
      <ItemBoxCont NFlist={NFlist}></ItemBoxCont>
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
