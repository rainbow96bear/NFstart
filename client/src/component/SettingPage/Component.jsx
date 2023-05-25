import styled from 'styled-components';
import FooterCont from '../Footer/FooterContainer';
import LoadingComp from '../Loading/LoadingComp';

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
