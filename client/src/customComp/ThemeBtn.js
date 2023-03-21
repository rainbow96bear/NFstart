import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { BiSun, BiMoon } from "react-icons/bi";
import { useState } from "react";

const ThemeBtn = ({ innerText, size }) => {
  const theme = useSelector((state) => state.theme);

  return (
    <Btn>
      {theme == "light" ? (
        <BiMoon size={size}></BiMoon>
      ) : (
        <BiSun size={size}></BiSun>
      )}
      <p>{innerText}</p>
    </Btn>
  );
};
const Btn = styled.div`
  display: flex;
  align-items: center;
  > p {
    padding-left: 10px;
  }
`;
export default ThemeBtn;
