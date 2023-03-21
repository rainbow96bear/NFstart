import styled from "styled-components";
import { CgProfile } from "react-icons/cg";
import ItemBoxCont from "./ItemBox/Container";
import { useState } from "react";

const MypageComp = ({ open, setOpen }) => {
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
    <MyPage>
      <MyPageFrame>
        <InfoBox>
          <ProfileImgBox>
            <CgProfile size={"80%"} />
          </ProfileImgBox>
          <Info>
            <div>
              <div>유저 아이디</div>
              <div>프로필 편집</div>
            </div>
            <div>게시물 n개</div>
          </Info>
        </InfoBox>
        <CategoryBox>
          <div>전체</div>
          <div>판매중</div>
        </CategoryBox>
        <ItemBox>
          {testArr.map((item, index) => (
            <ItemBoxCont item={item} index={index} />
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
