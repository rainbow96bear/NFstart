// import SellModal from "../Component/SellModal";
// import Modal from "react-modal";
// import styled from "styled-components";
// import ReactModal from "react-modal";
// import { useState } from "react";

// const SellModalContain = () => {
//   const [isOpen, setOpen] = useState(false);
//   //   const [open]
//   const handleClick = () => {
//     setOpen(true);
//   };
//   const handleClickCancel = () => {
//     setOpen(false);
//   };
//   return (
//     <ModalBox>
//       <button
//         onClick={() => {
//           handleClick();
//         }}
//       >
//         모오달여얼기
//       </button>
//       {isOpen ? (
//         <SellModal isOpen={isOpen} onCancel={handleClickCancel} />
//       ) : (
//         <></>
//       )}
//     </ModalBox>
//   );
// };
// export default SellModalContain;

// const ModalBox = styled.div`
//   overlay: {
//     position: fixed, top= 0, left=0, right=0, bottom=0,
//       backgroundColor= rgb(255, 155, 200, 0), z-index=10;
//   }
//   content: {
//     display: flex;
//     flex-direction: column;
//     background-color: green;
//     overflow: auto;
//     top: 32vh;
//     left: 35vw;
//     right: 35vw;
//     bottom: 32vh;
//     outline: none;
//     border-radius: 10px;
//     z-index: 10;
//   }

//   background-image: linear-gradient(0.47turn, #e2938f, #ae7dbe, #6f67f1);
//   div {
//     width: 100%;
//     height: 100%;
//   }
// `;
