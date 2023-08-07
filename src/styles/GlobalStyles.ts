import { createGlobalStyle } from "styled-components";
import VCR_OSD_MONO from '../assets/fonts/VCR_OSD_MONO.ttf'
import { theme } from "./theme";


export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: VCR_OSD_MONO;
    src: url(${VCR_OSD_MONO});
  }
  * {
    box-sizing: border-box; 
    margin: 0;
    padding: 0;
    color: inherit;
    font-size:  inherit;
    font-family: VCR_OSD_MONO;
    font-style: inherit;
    font-weight: inherit;
  }
  
  #root, html, body{
    width: 100%;
    min-height: 100vh;
    display: flex;
  }
  html, body{
    color: ${theme.color.white};
    background: ${theme.color.black};
  }
  #root{
    position: relative;
    flex-direction: column;
    align-items: flex-start; 

    font-size: ${theme.fontSize[0]};
    font-family: ${theme.fontFamily};
    line-height: 1.4;
  }


  ul{
    list-style: none
  }

  image{
    display: block;
  }


  a{
    text-decoration: none;
  }

  button{
    background: transparent;
    border: none;
    cursor: pointer;
  }

  [disabled]{
    pointer-events: none;
  }
  
  :focus{
    outline: 1px solid ${theme.color.focus};
  }

`