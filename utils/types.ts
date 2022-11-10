import { Theme } from "@material-ui/core";
import { AppThemeColors } from "../config/AppThemeColors";

export type AppStyleProps = Theme & { colors : AppThemeColors,isDark: boolean } 