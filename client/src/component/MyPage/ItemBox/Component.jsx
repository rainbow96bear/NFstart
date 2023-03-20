import styled from "styled-components";

const ItemBoxComp = ({ mainImg }) => {
  return (
    <ItemBox>
      <img src={mainImg} />
    </ItemBox>
  );
};
export default ItemBoxComp;
// 가로 세로는 반응형 생각해서 다시 잡기
const ItemBox = styled.div`
  position: relative;
  width: 33%;
  &::after {
    display: block;
    content: "";
    padding-bottom: 100%;
  }
  & > img {
    padding: 3px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
