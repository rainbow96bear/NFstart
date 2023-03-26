import styled from "styled-components";
import uin from "./universe.jpg";
import dog from "./dog.gif";

const LoadingComp = () => {
  return (
    <LoadingBox>
      <div className="nyanbox">
        <div className="nyan"></div>
      </div>
      <div>
        <p>Loading...</p>
      </div>
    </LoadingBox>
  );
};

export default LoadingComp;

const LoadingBox = styled.div`
  width: 100%;
  height: 100vh;
  text-align: center;
  background-image: url(${uin});
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;

  .nyanbox {
    margin: auto;
    height: 50vh;
    display: flex;
    width: 100%;
  }
  .nyan {
    width: 100%;
    position: relative;
    background-image: url(${dog});
    background-size: 9.1%;
    background-position: center;
    background-repeat: repeat-x;
    animation: run 10s infinite ease-out;
  }
  p {
    font-size: 80px;
    font-weight: 800;
    animation: rainbow 1s infinite;
  }
  @keyframes run {
    0% {
      left: -1000px;
    }
    100% {
      left: 2000px;
    }
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
