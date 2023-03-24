import styled from "styled-components";

const SettingComp = ({ theme }) => {
  return (
    <SettingPage>
      <SettingFrame theme={theme}>
        <h1>설정</h1>
        <ItemBox theme={theme}>
          <h1>프로필 편집</h1>
        </ItemBox>
      </SettingFrame>
    </SettingPage>
  );
};
export default SettingComp;

const SettingPage = styled.div`
  width: 100%;
  height: 100vh;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
`;
const SettingFrame = styled.div`
  width: 80%;
  h1 {
    margin: 0 0 20px 0;
  }
`;
const ItemBox = styled.div`
  height: 80vh;
  border: 1px solid white;
  max-width: 676px;
  border: ${(props) =>
    props.theme == "dark" ? "1px solid white" : "1px solid black"};
`;

// contract가 중개자, sale이 중개자
// 토큰도 주면서 approve를 같이 준다.
// 그럼 sale가 토큰을 팔 수 있고,
