import { createTheme } from "@mui/material/styles";
import { orange, grey, indigo, deepPurple } from "@mui/material/colors";
let theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#283593',
    },
    secondary: {
      main: '#ffc400',
    },
  },
});

export default theme;
