import styled from "styled-components";
import ItemBoxCont from "./ItemBox/Container";

const MainComp = () => {
  const testArr = [
    {
      seller: "test1",
      name: "lee",
      view: 55345,
      favorites: 456456,
      PFPS: 345344,
      price: 342,
      rank: 32,
      number: 20,
      img: "https://cover.millie.co.kr/service/cover/179561364/59ede77dd98f4da8bbc057bd8282ad17.jpg?w=125&q=80",
    },
    {
      img: "https://cover.millie.co.kr/service/cover/179548325/60e43be598bb4da9ab50b39f70c11895.jpg?w=125&q=80",
    },
    {
      img: "https://cover.millie.co.kr/service/cover/179574180/196635eb017a477385fbe7cec0e7dbf0.jpg?w=125&q=80",
    },
    {
      img: "https://cover.millie.co.kr/service/cover/179559925/fe449328632a454aadc7be506b0658e5.jpg?w=125&q=80",
    },
  ];
  return (
    <Main>
      {testArr.map((item, index) => (
        <ItemBoxCont item={item} index={index} />
      ))}
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
