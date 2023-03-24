import styled from "styled-components";
import ItemBoxCont from "./ItemBox/Container";

const MainComp = ({ NFlist, mainId }) => {
  console.log("nf리스트", NFlist);
  console.log("nfId", mainId);
  return (
    <Main>
      {mainId?.reverse().map((item, index) => {
        return (
          <Box>
            <ItemBoxCont NFlist={NFlist} item={item}></ItemBoxCont>
          </Box>
        );
      })}
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
const Box = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
