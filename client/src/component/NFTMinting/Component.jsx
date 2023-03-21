import styled from "styled-components";
import Modal from 'react-modal';
import { useCallback, useEffect, useRef, useState } from "react";
import { FcAddImage } from 'react-icons/fc';
import axios from 'axios';

// registeringNFT : 기본 false, 클릭시 true
const NFTMintingComponent = ({ registeringNFT, setRegisteringNFT }) => {

    Modal.setAppElement('#root');

    // 버튼과 인풋 연결
    const imgInput = useRef();
    const addBtnClick = () => {
        imgInput.current.click();
    }

    // 파일 선택
    const [file, setFile] = useState();
    const [img, setImg] = useState("");
    const [image, setImage] = useState("");
    const fileChange = useCallback((e) => {
        setFile(e.target.files[0]);

        // 이미지 경로 세팅
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            if (reader.result) {
                setImg(reader.result);
                setImage(reader.result);
            }
        }
    }, []);

    // 모달창 삭제를 위한 랜더링
    useEffect(() => {
        if (!img) {
            setRegisteringNFT(false);
        }
    }, [img]);

    // NFT 등록을 위한 상태값 (+ image, account-users 연결, web3)
    const [isDetail, setIsDetail] = useState(false);    // 상세 정보 작성중인가?
    const [name, setName] = useState();                 // NFT 이름
    const [desc, setDesc] = useState();                 // NFT 설명
    const [isSale, setIsSale] = useState(false);        // NFT를 판매할 것인가?
    const [isAuction, setIsAuctio] = useState(false);   // NFT를 경매할 것인가?
    const [tags, setTags] = useState([]);               // NFT 태그
    // NFT 등록 시간, 각각의 확률.. 

    return (
        <>
            {isDetail ? (
                // 상세 정보 작성중일 때 출력
                <Modal style={ModalStyle2} isOpen={isDetail && registeringNFT} onRequestClose={() => {
                    const confirm = window.confirm("NFT 등록을 취소하시겠습니까?");
                    if (confirm) {
                        setImg(undefined);
                        setImage("");
                        if (img == undefined) {
                            setImg("");
                        }
                        setIsDetail(false);
                    }
                }} >
                    <AllWrap>
                        <Title>새 NFT 만들기</Title>

                        {/* 여기 */}
                        <DetailContentWrap>

                            {/* 위 */}
                            <DetailContent>
                                {/* 왼쪽 */}
                                <DetailNFTImage src={image.toString()} alt={"NFT"} />
                                {/* 오른쪽 */}
                                <DetailInputWrap>
                                    <div style={{ textAlign: "left" }}>ㅇㅅㅇ</div>
                                    <input style={{ width: "100%", height: "200px" }} placeholder="ㅇㅅㅇ"></input>
                                    <input style={{ width: "100%", height: "30px" }} placeholder="ㅇㅅㅇ"></input>
                                    <input style={{ width: "100%", height: "30px" }} placeholder="ㅇㅅㅇ"></input>
                                    <button>ㅇㅅㅇ</button>
                                </DetailInputWrap>
                            </DetailContent>

                            {/* 아래 */}
                            <DetailBtnWrap>
                                <NextBtn onClick={() => {
                                    const confirm = window.confirm("이전으로 돌아가시겠습니까?");
                                    if (confirm) {
                                        setIsDetail(false);
                                        setImage("");
                                    }
                                }}>이전</NextBtn>
                                <NextBtn onClick={async () => {
                                    // 실제 등록 요청 보내기
                                }}>NFT 등록</NextBtn>
                            </DetailBtnWrap>

                        </DetailContentWrap>

                    </AllWrap>
                </Modal>
            ) : (
                // 상세 정보 작성 이전 출력
                <Modal style={ModalStyle} isOpen={registeringNFT} onRequestClose={() => {
                    const confirm = window.confirm("NFT 등록을 취소하시겠습니까?");
                    if (confirm) {
                        setImg(undefined);
                        setImage("");
                        if (img == undefined) {
                            setImg("");
                        }
                    }
                }} >
                    <AllWrap>
                        <Title>새 NFT 만들기</Title>
                        <ContentWrap>
                            {image ? (
                                <div>
                                    <NFTImage src={image.toString()} alt={"NFT"} />
                                    <NextBtn onClick={() => {
                                        const confirm = window.confirm("이전으로 돌아가시겠습니까?");
                                        if (confirm) {
                                            setImage("");
                                        }
                                    }}>이전</NextBtn>
                                    <NextBtn onClick={async () => {
                                        const formData = new FormData();
                                        formData.append('file', file);
                                        // 이미지를 Database에 저장하기
                                        // account, web3 도 같이 보내기
                                        // await axios.post("http://localhost:8080/api/nft/imageAdd", formData);

                                        // 상세정보 작성중인 상태로 변경
                                        setIsDetail(true);

                                    }}>다음</NextBtn>
                                </div>
                            ) : (
                                <div>
                                    <FcAddImage size="100" color="#fff" />
                                    <ImgAddDesc>사진과 동영상을 여기에 끌어다 놓으세요</ImgAddDesc>
                                    <ImgAddInput type={"file"} ref={imgInput} onChange={fileChange} />
                                    <ImgAddBtn onClick={addBtnClick}>컴퓨터에서 선택</ImgAddBtn>
                                </div>
                            )}
                        </ContentWrap>
                    </AllWrap>
                </Modal>
            )}
        </>
    );
}

export default NFTMintingComponent;

export const ModalStyle = {
    overlay: {
        position: "fixed",
        backgroundColor: "rgba(21, 21, 21, 0.89)",
        zIndex: 4
    },
    content: {
        display: "flex",
        justifyContent: "center",
        overflow: "auto",
        top: "12vh",
        left: "32vw",
        right: "32vw",
        bottom: "12vh",
        WebkitOverflowScrolling: "touch",
        borderRadius: "10px",
        outline: "none",
        zIndex: 10,
        padding: '0px'
    },
};

export const ModalStyle2 = {
    overlay: {
        position: "fixed",
        backgroundColor: "rgba(21, 21, 21, 0.89)",
        zIndex: 4,
    },
    content: {
        display: "flex",
        justifyContent: "center",
        overflow: "auto",
        top: "12vh",
        left: "24vw",
        right: "24vw",
        bottom: "12vh",
        WebkitOverflowScrolling: "touch",
        borderRadius: "10px",
        outline: "none",
        zIndex: 10,
        padding: '0px',
        transition: "all 1s",
    },
};


const DetailContentWrap = styled.div`
    color: #4c4c4c;
    font-size: 15px;
    height: 70vh;
    box-sizing: border-box;
    text-align: center;
`;

const DetailContent = styled.div`
    display: inline-block;
    display: flex;
    justify-content: space-between;
    padding: 50px;
    padding-bottom: 30px;
    padding-top: 60px;
`;

const DetailNFTImage = styled.img`
    width: 52%;
    border-radius: 3px;
`;

const DetailInputWrap = styled.div`
    background-color: orange;
    display: inline-block;
    width: 35%;
`;

const DetailBtnWrap = styled.div`
    text-align: center;
`;




const AllWrap = styled.div`
    background-color: rgb(245,245,245);
    width: 100vw;
    color: #272727;
    overflow: hidden;
`;

const Title = styled.div`
    text-align: center;
    border-bottom: 1px solid rgba(176, 176, 176, 0.425);
    padding: 10px 0;
    font-size: 14px;
    font-weight: 600;
`;

const ContentWrap = styled.div`
    text-align: center;
    color: #4c4c4c;
    font-size: 15px;
    height: 70vh;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const ImgAddDesc = styled.div`
    margin: 20px 0 70px 0;
    font-size: 15px;
`;

const ImgAddInput = styled.input`
    visibility: hidden;
    display: none;
`;

const ImgAddBtn = styled.button`
    background-color: #3e3e3e;
    color: white;
    font-size: 14px;
    padding: 6px 10px;
    border-radius: 5px;
    text-align: center;
    width: 140px;
    cursor: pointer;
    display: inline-block;
    border: none;
    &:hover {
        transition: all 0.5s;
        background-color: #368039;
        background-color: #41bbb5;
    }
    
`;

const NFTImage = styled.img`
    width: 80%;
    margin-top: 30px;
`;

const NextBtn = styled.div`
    background-color: #363636;
    color: white;
    font-size: 14px;
    padding: 6px 10px;
    border-radius: 5px;
    text-align: center;
    width: 100px;
    cursor: pointer;
    display: inline-block;
    border: none;
    margin: 30px;
    &:hover {
        transition: all 0.5s;
        background-color: #41bbb5;
    }

`;