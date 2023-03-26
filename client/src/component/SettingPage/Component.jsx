import styled from "styled-components";
import FooterCont from "../Footer/FooterContainer";

const SettingComp = ({ theme }) => {
  return (
    <SettingPage>
      <Title>
        <h1>설정</h1>
      </Title>
      <SettingFrame theme={theme}>
        <ItemBox theme={theme}>
          <p>프로필 편집</p>
          <p>프로필 편집</p>
        </ItemBox>
        <ItemBox theme={theme}>
          <p>프로필 편집</p>
          <p>프로필 편집</p>
        </ItemBox>
      </SettingFrame>
    </SettingPage>
  );
};
export default SettingComp;

const Title = styled.div`
  width: 100%;
  margin: auto;
  height: 40px;
`;
const SettingPage = styled.div`
  width: 100%;
  height: 100vh;
  margin: auto;
`;
const SettingFrame = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
`;
const ItemBox = styled.div`
  width: 40%;
  height: 80vh;
  border: 1px solid white;
  max-width: 676px;
  border: ${(props) =>
    props.theme == "dark" ? "1px solid white" : "1px solid black"};

  & p {
    padding: 20px;
  }
  & p:hover {
    cursor: pointer;
    background-color: ${(props) =>
      props.theme == "dark" ? "#5a5a5a" : "#e0e0e0"};
  }
`;

// contract가 중개자, sale이 중개자
// 토큰도 주면서 approve를 같이 준다.
// 그럼 sale가 토큰을 팔 수 있고,
