import { useSelector } from "react-redux";
import styled from "styled-components";
import ItemBoxCont from "./ItemBox/Container";

const ExploreComp = ({ handleSubmit, setKeyword, searchData }) => {
  const theme = useSelector((state) => state.theme);
  return (
    <ExplorePage>
      <Frame>
        <InputArea>
          <InputBox theme={theme}>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="검색"
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
              ></input>
            </form>
          </InputBox>
        </InputArea>
        <ItemBox>
          {searchData.map((item, idx) => (
            <ItemBoxCont item={item} key={`Item-${idx}`}></ItemBoxCont>
          ))}
        </ItemBox>
      </Frame>
    </ExplorePage>
  );
};
const ExplorePage = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  overflow-y: scroll;
`;
const Frame = styled.div`
  width: 100%;
`;
const InputArea = styled.div`
  border-bottom: 1px solid #5a5a5a;
  padding: 20px;
`;
const InputBox = styled.div`
  width: fit-content;
  margin: auto;
  background-color: ${(props) =>
    props.theme == "dark" ? "#5a5a5a" : "#e0e0e0"};
  border-radius: 5px;
  overflow: hidden;
  input {
    padding: 15px;
    width: 300px;
    height: 30px;
    border: none;
    background-color: ${(props) =>
      props.theme == "dark" ? "#5a5a5a" : "#e0e0e0"};
  }
`;

const ItemBox = styled.div`
  width: 50%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
`;

export default ExploreComp;
