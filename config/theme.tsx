import { createGlobalStyle } from "styled-components";

export const fontSize = {
  h1: "24px",
  h2: "18px",
  h3: "15px",
  h4: "12px",
};

const sizes = {
  mobileS: "320px",
  mobileM: "605px",
  tablet: "768px",
  laptop: "1024px",
};

export const device = {
  mobileS: `(min-width: ${sizes.mobileS})`,
  mobileM: `(min-width: ${sizes.mobileM})`,
  tablet: `(min-width: ${sizes.tablet})`,
  laptop: `(min-width: ${sizes.laptop})`,
};

export const view = "grid";

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

  
`;
