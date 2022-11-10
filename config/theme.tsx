
import { createTheme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { Palette } from '@material-ui/core/styles/createPalette';
// Create a theme instance.
const theme = createTheme({
palette: {
  
   primary: {
      main: '#556cd6',
   },
   secondary: {
     main: '#19857b',
   },
   error: {
   main: red.A400,
   },
  },
});
const light = {
  palette: {
    mode: "light"
  },
};

const dark = {
  palette: {
    mode: "dark" 
  }
};

// export default theme;
export {light,dark,theme}
