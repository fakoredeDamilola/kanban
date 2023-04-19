import {createGlobalStyle} from 'styled-components';
import injectGlobal from 'styled-components';

export const lightTheme = {
  primary:"#000112",
  other:"#F4F7FD",
  sidenav:"#FFFFFF",
  secondary:"#A8A4FF",
  nav:"#fff",
  white:"#fff",
  border:"#E4EBFA",
  hover:"#635FC7",
  secondaryColor:"#828FA3",
  secondButton:"rgba(99, 95, 199, 0.1)",
  cardHover:"",
  color1:"#323435",

  modalBackground:"#1D1E2B",
  headingColor:"#ACADBA",
  otherColor:"#858699",
  transparent:"transparent",
  button:"#635FC7",
  background:"#E4EBFA",
  dropdownButton:"#323343",
  icon1:"#D2D3E0",
  cardBackground:"#1F2130",
  body:"#14151C"
}

export const darkTheme = {
  primary:"#fff",
  sidenav:"#2B2C37",
  other:"#20212C",
  secondary:"#3E3F4E",
  nav:"#2B2C37",
  white:"#fff",
  border:"#3E3F4E",
  hover:"#635FC7",
  secondaryColor:"#828FA3",
  secondButton:"#fff",
  cardHover:"#1D1E2B",
  color1:"#323435",

  modalBackground:"#1D1E2B",
  headingColor:"#ACADBA",
  otherColor:"#858699",
  transparent:"transparent",
  button:"#635FC7",
  background:"#191A23",
  dropdownButton:"#323343",
  icon1:"#D2D3E0",
  cardBackground:"#1F2130",
  body:"#14151C"
}

export const fontSize ={
  h1:"24px",
  h2:"18px",
  h3:"15px",
  h4:"12px",
}

const sizes = {
  mobileS:"320px",
  mobileM:"605px",
  tablet:"768px",
  laptop:"1024px"
}

export const device = {
  mobileS: `(min-width: ${sizes.mobileS})`,
  mobileM: `(min-width: ${sizes.mobileM})`,
  tablet: `(min-width: ${sizes.tablet})`,
  laptop: `(min-width: ${sizes.laptop})`,
}

export const view = "grid"

export const GlobalStyles = createGlobalStyle`
    html,body,#__next{
            height:100%;
            min-height:100%;
            box-sizing: border-box;
            background-color:black;
            font-family: 'Plus Jakarta Sans', sans-serif;
            /* overflow-x:hidden; */
        }
        /* width */
::-webkit-scrollbar {
  width: 6px;
  height: 8px;;
}

/* Track */
::-webkit-scrollbar-track {
  /* box-shadow: inset 0 0 5px grey;  */
  border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #2B2C37; 
  border-radius: 3px;

}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #3E3F4E; 
}
        *{
            padding:0;
            margin:0;
        }
  h1{
    font-size:${fontSize.h1};
  }
`