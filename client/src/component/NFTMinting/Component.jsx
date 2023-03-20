import styled from "styled-components";
import Modal from 'react-modal';
import { useCallback, useRef, useState } from "react";
import { FcAddImage } from 'react-icons/fc';
import axios from 'axios';

const NFTMintingComponent = () => {

    Modal.setAppElement('#root');
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // 버튼과 인풋 연결
    const imgInput = useRef();
    const addBtnClick = () => {
        imgInput.current.click();
    }

    // 파일 선택
    const [file, setFile] = useState();
    const [img, setImg] = useState("");
    const fileChange = useCallback((e) => {
        setFile(e.target.files[0]);

        // 이미지 경로 세팅
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            if (reader.result) {
                setImg(reader.result);
            }
        }
    }, []);

    return (
        <>
            {modalIsOpen ? (
                <Modal style={ModalStyle} isOpen={modalIsOpen} onRequestClose={() => {
                    const confirm = window.confirm("NFT 등록을 취소하시겠습니까?");
                    if (confirm) {
                        setModalIsOpen(false);
                        setImg();
                    }
                }} >
                    <AllWrap>
                        <Title>새 NFT 만들기</Title>
                        <ContentWrap>
                            {img ? (
                                <div>
                                    <NFTImage src={img.toString()} alt={"NFT"} />
                                    <NextBtn onClick={() => {
                                        const confirm = window.confirm("이전으로 돌아가시겠습니까?");
                                        if (confirm) {
                                            setImg();
                                        }
                                    }}>이전</NextBtn>
                                    <NextBtn onClick={async () => {
                                        // 이미지를 우리 Database에 저장하기
                                        const formData = new FormData();
                                        formData.append('file', file);
                                        // account, web3 도 같이 보내기
                                        console.log(formData);
                                        console.log(file);
                                        await axios.post("http://localhost:8080/api/nft/imageAdd", { test: "하이", data: formData, file: file });
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
            ) : (
                <>
                    <button onClick={() => {
                        setModalIsOpen(true);
                    }}>모달 열기</button>
                </>
            )}
        </>
    );
}

export default NFTMintingComponent;

export const ModalStyle = {
    overlay: {
        position: "fixed",
        backgroundColor: "rgba(43, 43, 43, 0.425)",
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

const AllWrap = styled.div`
    background-color: rgb(245,245,245);
    width: 100vh;
    color: #272727;
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