import {
    Palette,
    PaletteOptions
  } from "@material-ui/core/styles/createPalette";
  
  declare module "@material-ui/core/styles/createPalette" {
    interface Palette {
      contrastThreshold: number;
      tonalOffset: number;
    }
  
    interface PaletteOptions {
      contrastThreshold?: number;
      tonalOffset?: number;
    }
  }