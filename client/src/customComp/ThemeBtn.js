import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { BiSun, BiMoon } from "react-icons/bi";
import { useState } from "react";

const ThemeBtn = ({ innerText, size }) => {
  //   const thema = useSelector((state) => state.thema.type);
  //   const dispatch = useDispatch();
  const chageThema = () => {
    // dispatch(changeThunk());
  };

  const [theme, setTheme] = useState("dark");
  return (
    <Btn>
      {theme == "dark" ? (
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
