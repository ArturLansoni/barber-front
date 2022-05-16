import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#003058",
      light: "#BFCDDD",
    },
    secondary: {
      main: "#3A5985",
    },
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
  },
});

export default theme;
