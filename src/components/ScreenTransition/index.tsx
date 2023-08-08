import { keyframes, styled } from "styled-components";


const fadeIn = keyframes`
 0%{opacity:0;}
 100%{opacity:1;}
`

export const ScreenTransition = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  animation: 200ms ${fadeIn} 2s;
`