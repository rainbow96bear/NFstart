import { useRef, useState, useEffect } from "react";
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
    <CanvasBox>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={drawing}
        onMouseLeave={finishDrawing}
      ></canvas>
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
              item={item}
            ></ColorItem>
          ))}

          <BsEraserFill size={50} />
        </ColorBox>
        <AllDelete
          onClick={() => {
            ctx.clearRect(0, 0, 500, 500);
          }}
        >
          전체 지우기
        </AllDelete>
      </SettingBox>
    </CanvasBox>
  );
};

export default CreateComp;
const CanvasBox = styled.div`
  max-width: 500px;
  width: 100%;
  margin: 20px;
  canvas {
    background-color: white;
    border: 1px solid blue;
  }
  canvas:hover {
    cursor: url(${brush}) 2 13, auto;
  }
`;
const SettingBox = styled.div``;
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
  border: 1px solid black;
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

const AllDelete = styled.div`
  flex: 1;
  border: 1px solid black;
  padding: 10px;
`;
