import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { theme } from "./theme";

const GlobalStyle = createGlobalStyle`
    ${reset}
    body{
        color:${({ theme }) => theme.fontColor};
        background-color:${({ theme }) => theme.bgColor}
    }
    *{
      box-sizing:border-box;
    }
`;

export default GlobalStyle;
