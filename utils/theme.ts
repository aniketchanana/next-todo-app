import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const breakpoints = {
  xxs: "320px",
  xs: "375px",
  sm: "425px",
  md: "768px",
  lg: "1024px",
  xl: "1440px",
  xxl: "1600px",
};

const spacing = {
  space: {
    px: "1px",
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "20px",
    6: "24px",
    7: "28px",
    8: "32px",
    9: "36px",
    10: "40px",
    11: "44px",
    12: "48px",
    13: "52px",
    14: "56px",
    15: "60px",
    16: "64px",
    17: "68px",
    18: "72px",
    19: "76px",
    20: "80px",
  },
};
const theme = extendTheme({ config, breakpoints, ...spacing });

export default theme;
