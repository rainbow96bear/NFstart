import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BsEraserFill } from "react-icons/bs";
import brush from "../Create/brush.svg";
import styled from "styled-components";
import SeekBar from "react-seekbar-component";

const CreateComp = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [ctx, setCtx] = useState([]);
  const [value, setValue] = useState(0);
  const [eraser, setEraser] = useState(0);
  const [color, setColor] = useState(0);
  const theme = useSelector((state) => state.theme);
  const baseColor = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "navy",
    "purple",
    "black",
  ];
  const [isDrawing, setIsDrawing] = useState(false);
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 500;
    canvas.height = 500;
    const context = canvas.getContext("2d");
    context.fillStyle = "#fff";
    context.fillRect(
      0 * canvas.width,
      0 * canvas.height,
      canvas.width,
      canvas.height
    );
    context.strokeStyle = "black";
    context.lineWidth = (value / 10).toString();
    contextRef.current = context;
    setCtx(contextRef.current);
  }, []);

  const startDrawing = () => {
    setIsDrawing(true);
  };
  const finishDrawing = () => {
    setIsDrawing(false);
  };
  useEffect(() => {
    if (color == "white") {
      ctx.lineWidth = (eraser / 10).toString();
    } else {
      ctx.lineWidth = (value / 10).toString();
    }
    ctx.strokeStyle = color;
  }, [value, color, eraser]);
  const drawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    if (ctx) {
      if (!isDrawing) {
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
      } else {
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
      }
    }
  };

  return (
    <CanvasBox theme={theme}>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={drawing}
        onMouseLeave={finishDrawing}></canvas>
      <SettingBox>
        <ValueBox>
          <div>
            브러쉬
            <SeekBar
              getNumber={setValue}
              width="60%"
              backgroundColor="gray"
              fillColor="red"
              fillSecondaryColor="blue"
              headColor="white"
              headShadow="white"
              headShadowSize={6}
              progress={10}
            />
          </div>
          <div>
            지우개
            <SeekBar
              getNumber={setEraser}
              width="100%"
              backgroundColor="gray"
              fillColor="red"
              fillSecondaryColor="blue"
              headColor="white"
              headShadow="white"
              headShadowSize={6}
              progress={10}
            />
          </div>
        </ValueBox>
        <ColorBox>
          {baseColor.map((item) => (
            <ColorItem
              key={`color-${item}`}
              onClick={() => {
                setColor(item);
              }}
              item={item}></ColorItem>
          ))}

          <EraserBox>
            <BsEraserFill
              onClick={() => {
                setColor("white");
              }}
              size={50}
            />
          </EraserBox>
        </ColorBox>
        <AllDelete
          onClick={() => {
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, 500, 500);
          }}
          theme={theme}>
          전체 지우기
        </AllDelete>
      </SettingBox>
      <MintingBox theme={theme}>
        <a
        // download={"image-name.png"}
        // href={canvasRef.current
        //   ?.toDataURL("image/png")
        //   .replace("image/png", "image/octet-stream")}
        >
          민팅
        </a>
      </MintingBox>
    </CanvasBox>
  );
};

export default CreateComp;
const CanvasBox = styled.div`
  width: fit-content;
  margin: auto;
  border: 1px solid
    ${(props) => (props.theme == "dark" ? "#fdfdfd" : "#00002a")};
  canvas {
    border: 1px solid blue;
  }
  canvas:hover {
    cursor: url(${brush}) 2 13, auto;
  }
`;
const SettingBox = styled.div`
  border: 1px solid
    ${(props) => (props.theme == "dark" ? "#fdfdfd" : "#00002a")};
`;
const ValueBox = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-between;
  div {
    display: flex;
  }
`;
const ColorBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
  border: 1px solid white;
`;

const ColorItem = styled.div`
  flex: 1;
  border: 1px solid ${(props) => props.item};
  position: relative;
  background-color: ${(props) => props.item};

  &::after {
    display: block;
    content: "";
    padding-bottom: 100%;
  }
`;
const EraserBox = styled.div`
  border-left: 1px solid white;
`;
const AllDelete = styled.div`
  flex: 1;
  text-align: center;
  border-top: 1px solid
    ${(props) => (props.theme == "dark" ? "#fdfdfd" : "#00002a")};
  padding: 10px;
`;

const MintingBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  a {
    color: ${(props) => (props.theme == "dark" ? "#fdfdfd" : "#00002a")};
  }
`;
