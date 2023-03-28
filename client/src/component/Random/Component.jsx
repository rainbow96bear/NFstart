import styled from "styled-components";
import Modal from "react-modal";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// GiShamblingZombie
// 메타마스크 좀비
// 유니콘 

// 유니콘 이미지
import UnicornImg from "./images/417018_409072_5019.jpg";
// import ZombieImg from "./images/zombieBackground.png";
import ZombieImg from "./images/zomzom.png";

// 페이지?
const RandomComponent = ({ account }) => {
    return (
        <>
            <AllWrap>
                <SwapWrap>
                    {/* 좀비 */}
                    <SwapItemWrap>
                        <ItemTitle>랜덤 좀비 뽑기</ItemTitle>
                        <img src={ZombieImg} alt="유니콘" onClick={(e) => {
                            alert("ㅇㅅㅇ");
                        }}></img><br />
                    </SwapItemWrap>

                    {/* AI */}
                    <SwapItemWrap>
                        <ItemTitle>AI 뽑기</ItemTitle>
                        <img src={UnicornImg} alt="유니콘" onClick={() => {
                            alert("ㅇㅅㅇ");
                        }}></img><br />
                    </SwapItemWrap>
                </SwapWrap>
            </AllWrap>
        </>
    )
};

export default RandomComponent;

const AllWrap = styled.div`
    margin: 0 auto;
    display: flex;
    align-items: center;
`;

const SwapWrap = styled.div`
    width: 600px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
`;

const SwapItemWrap = styled.div`
    &>img {
        width: 250px;
        height: 250px;
        border-radius: 20px;
        cursor: pointer;
    }
`;

const ItemTitle = styled.div`
    text-align: center;
    font-weight: 600;
    height: 30px;
`;