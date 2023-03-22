import styled from "styled-components";
import ItemBoxCont from "./ItemBox/Container";

const MainComp = () => {
  const testArr = [
    {
      seller: "test1",
      name: "lee",
      view: 787345,
      favorites: 456456,
      PFPS: 345344,
      price: 342,
      rank: 32,
      number: 20,
      img: "https://cover.millie.co.kr/service/cover/179561364/59ede77dd98f4da8bbc057bd8282ad17.jpg?w=125&q=80",
    },
    {
      seller: "test2",
      name: "gtr",
      view: 555675,
      favorites: 456456,
      PFPS: 345344,
      price: 67876876,
      rank: 32,
      number: 20,
      img: "https://cover.millie.co.kr/service/cover/179548325/60e43be598bb4da9ab50b39f70c11895.jpg?w=125&q=80",
    },
    {
      seller: "test3",
      name: "tyut",
      view: 556745,
      favorites: 456456,
      PFPS: 345344,
      price: 567568565,
      rank: 32,
      number: 20,
      img: "https://cover.millie.co.kr/service/cover/179574180/196635eb017a477385fbe7cec0e7dbf0.jpg?w=125&q=80",
    },
    {
      seller: "test4",
      name: "ghg",
      view: 12312,
      favorites: 456456,
      PFPS: 345344,
      price: 789798779,
      rank: 32,
      number: 20,
      img: "https://cover.millie.co.kr/service/cover/179559925/fe449328632a454aadc7be506b0658e5.jpg?w=125&q=80",
    },
  ];
  return (
    <Main>
      <ItemBoxCont testArr={testArr}></ItemBoxCont>
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
