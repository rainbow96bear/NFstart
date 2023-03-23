import styled from "styled-components";
import { CgProfile } from "react-icons/cg";
import ItemBoxCont from "./ItemBox/Container";
import { useState } from "react";

const MypageComp = ({ open, setOpen, NFlist }) => {
  return (
    <MyPage>
      <MyPageFrame>
        <InfoBox>
          <ProfileImgBox>
            <CgProfile size={"80%"} />
          </ProfileImgBox>
          <Info>
            <div>
              <div>{NFlist.name}</div>
              <div>프로필 편집</div>
            </div>
            <div>게시물 {NFlist.length}개</div>
          </Info>
        </InfoBox>
        <CategoryBox>
          <div>전체</div>
          <div>판매중</div>
        </CategoryBox>
        <ItemBox>
          {NFlist.map((item, index) => (
            <ItemBoxCont item={item} index={index} key={index} />
          ))}
        </ItemBox>
      </MyPageFrame>
    </MyPage>
  );
};
export default MypageComp;

const MyPage = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  overflow-y: scroll;
`;
const MyPageFrame = styled.div`
  width: 100%;
  max-width: 676px;
`;
const InfoBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const ProfileImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const Info = styled.div`
  flex: 2;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  & :nth-child(1) {
    display: flex;
  }
`;

const CategoryBox = styled.div`
  width: 100%;
  display: flex;
  font-size: 1.2rem;
  justify-content: center;
  border-top: 1px solid lightgray;
  & > div {
    padding: 10px 90px;
  }
`;
const ItemBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
