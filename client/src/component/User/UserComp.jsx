import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { action } from "../../modules/userInfo";
import logo from "./logo.png";
import home from "./home.png";
import { useNavigate } from "react-router-dom";

const UserComp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <UserBox>
        <div className="screen">
          <img src={home} alt="" />
        </div>
        <div className="coin">
          <div className="inner">
            <h1>NF STAR</h1>
            <div className="click">
              <button
                className="signIn"
                onClick={() => {
                  dispatch(action.asyncLogIn());
                  navigate("/");
                }}
              ></button>
              <p className="arrow_box">CLICK ME</p>
            </div>
            <h3>Token Click to Join Us</h3>
            <p>Enjoy with us!!</p>
          </div>
        </div>
      </UserBox>
    </>
  );
};

export default UserComp;

const UserBox = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0 0 0;

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
      margin: 0 0 30px 0;
    }
    p {
      font-weight: bold;
      color: white;
    }
    h3 {
      animation: rainbow 1s infinite;
      margin: 30px 0 10px 0;
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
  .click {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .arrow_box {
    display: none;
    position: absolute;
    width: 100px;
    padding: 8px;
    color: #ff0000;
    top: 240px;
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
