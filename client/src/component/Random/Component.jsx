import styled from "styled-components";
import Modal from "react-modal";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import UnicornImg from "./images/417018_409072_5019.jpg";
import ZombieImg from "./images/zomzom.png";

const RandomComponent = ({ account }) => {
    return (
        <>
            <AllWrap>
                <SwapWrap>
                    <SwapItemWrap>
                        <ItemTitle>랜덤 좀비 뽑기</ItemTitle>
                        <img src={ZombieImg} alt="유니콘" onClick={(e) => {
                            alert("ㅇㅅㅇ");
                        }}></img><br />
                    </SwapItemWrap>

                    <SwapItemWrap>
                        <ItemTitle>AI 뽑기</ItemTitle>
                        <img src={UnicornImg} alt="유니콘" onClick={() => {
                            axios.post("/api/nft/createAi", {
                                account
                            });
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
    width: 850px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
`;

const SwapItemWrap = styled.div`
    &>img {
        width: 350px;
        height: 350px;
        border-radius: 30px;
        cursor: pointer;
            box-shadow: rgba(23, 23, 23, 0.329) 0px 8px 30px 0px;
        &:hover{
            box-shadow: rgba(23, 23, 23, 0.62) 0px 8px 30px 0px;
            transition: all 1s;
        }
    }
`;

const ItemTitle = styled.div`
    text-align: center;
    font-weight: 600;
    height: 30px;
`;