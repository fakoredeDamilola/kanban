import {createGlobalStyle} from 'styled-components';
import injectGlobal from 'styled-components';

export const lightTheme = {
  primary:"#000112",
  other:"#F4F7FD",
  background:"#E4EBFA",
  button:"#635FC7",
  secondary:"#A8A4FF",
  nav:"#fff",
  body: '#E4EBFA',
  white:"#fff",
  border:"#E4EBFA",
  hover:"#635FC7",
  secondaryColor:"#828FA3",
  secondButton:"rgba(99, 95, 199, 0.1)",
}

export const darkTheme = {
  primary:"#fff",
  background:"#20212C",
  other:"#20212C",
  button:"#635FC7",
  secondary:"#3E3F4E",
  nav:"#2B2C37",
  white:"#fff",
  border:"#3E3F4E",
  hover:"#635FC7",
  secondaryColor:"#828FA3",
  secondButton:"#fff",
}

export const fontSize ={
  h1:"24px",
  h2:"18px",
  h3:"15px",
  h4:"12px",
}

export const GlobalStyles = createGlobalStyle`
*{
  margin:0;
  padding:0;
  
}
  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: all 0.50s linear;
    margin:0;
    padding:0;
    box-sizing:border-box;
    width:100vw;
    height:100vh;
    /* overflow-x:hidden; */
  }
  h1{
    font-size:${fontSize.h1};
  }
`