import styled from "styled-components";

const FooterComp = () => {
  return (
    <FooterBox>
      <p>© 2023 NFSTAR from KimSungJin KimSunJu ParkHyelim LeeJeaHyuk</p>
    </FooterBox>
  );
};

export default FooterComp;

const FooterBox = styled.div`
  width: 100%;
  margin: auto;

  p {
    color: #d4d4d4;
    font-size: 14px;
    margin: 0;
  }
`;
