import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#003058",
    },
    secondary: {
      main: "#3A5985",
    },
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
        },
      },
    },
  },
});

export default theme;
