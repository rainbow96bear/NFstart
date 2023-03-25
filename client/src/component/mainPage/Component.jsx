import styled from "styled-components";
import ItemBoxCont from "./ItemBox/Container";

const MainComp = ({ mainId }) => {
  return (
    <Main>
      {mainId?.map((item, index) => {
        return (
          <Box key={index}>
            <ItemBoxCont item={item} key={index}></ItemBoxCont>
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
