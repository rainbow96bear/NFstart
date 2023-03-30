import styled from "styled-components";
import FooterCont from "../Footer/FooterContainer";
import LoadingComp from "../Loading/LoadingComp";

const SettingComp = ({ theme }) => {
  return (
    <SettingPage>
      <LoadingComp />
    </SettingPage>
  );
};
export default SettingComp;

const SettingPage = styled.div`
  width: 100%;
  height: 100vh;
  margin: auto;
`;

// contract가 중개자, sale이 중개자
// 토큰도 주면서 approve를 같이 준다.
// 그럼 sale가 토큰을 팔 수 있고,
