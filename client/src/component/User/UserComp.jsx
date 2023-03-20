import styled from "styled-components";
import logo from "./logo.png";
import home from "./home.png";
import { BsHandIndexThumb } from "react-icons/bs";

const UserComp = ({ logIn }) => {
  return (
    <>
      <UserBox>
        <div className="screen">
          <img src={home} alt="" />
        </div>
        <div className="coin">
          <div className="inner">
            <h1>NF STAR</h1>
            <BsHandIndexThumb width="100px" />
            <button
              className="signIn"
              onClick={() => {
                logIn();
              }}></button>
            <p className="arrow_box">CLICK ME</p>
            <h3>Token Click to Join Us</h3>
            <p>Enjoy with us!!</p>
          </div>
        </div>
      </UserBox>
      <TestBox>
        <p>current account</p>
        <p>account</p>
      </TestBox>
    </>
  );
};

export default UserComp;

const TestBox = styled.div`
  position: absolute;
  top: 10px;
`;
const UserBox = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0 0 0;
  .arrow_box {
    margin: auto;
    display: none;
    position: absolute;
    width: 100px;
    padding: 8px;
    color: #ff0000;
    left: 720px;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    background: #333;
    font-size: 10px;
  }

  .arrow_box:after {
    position: absolute;
    bottom: 100%;
    left: 50%;
    width: 0;
    height: 0;
    margin-left: -10px;
    border: solid transparent;
    border-color: rgba(51, 51, 51, 0);
    border-bottom-color: #333;
    border-width: 10px;
    pointer-events: none;
    content: " ";
  }
  .screen {
    img {
      width: 500px;
    }
  }
  .coin {
    position: absolute;
    width: 100%;
  }
  .inner {
    text-align: center;
    margin: 0 0 0 100px;
    h1 {
      color: white;
      font-family: "Great Vibes", cursive;
    }
    p {
      font-weight: bold;
      color: white;
    }
    h3 {
      animation: rainbow 1s infinite;
      margin: 50px 0 0 0;
    }
  }
  .signIn {
    top: 350px;
    left: 690px;
    border: none;
    border-radius: 100%;
    width: 200px;
    height: 200px;
    background-image: url(${logo});
    background-size: 200px 200px;
    background-repeat: no-repeat;
    background-position: center;
    padding: 0 0 50px 0;
  }
  @keyframes rotate_image {
    100% {
      transform: rotateY(360deg);
    }
  }
  div > img {
    width: 600px;
  }
  .signIn:hover {
    animation: rotate_image 2s infinite;
    cursor: pointer;
  }
  .signIn:hover + p.arrow_box {
    display: block;
  }
  @keyframes rainbow {
    0% {
      color: rgb(255, 0, 0);
    }
    8% {
      color: rgb(255, 127, 0);
    }
    16% {
      color: rgb(255, 255, 0);
    }
    25% {
      color: rgb(127, 255, 0);
    }
    33% {
      color: rgb(0, 255, 0);
    }
    41% {
      color: rgb(0, 255, 127);
    }
    50% {
      color: rgb(0, 255, 255);
    }
    58% {
      color: rgb(0, 127, 255);
    }
    66% {
      color: rgb(0, 0, 255);
    }
    75% {
      color: rgb(127, 0, 255);
    }
    83% {
      color: rgb(255, 0, 255);
    }
    91% {
      color: rgb(255, 0, 127);
    }
  }
`;
