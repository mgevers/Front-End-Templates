import { createTheme } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const xsBreakpoint = 0;
const smBreakpoint = 600;
const mdBreakpoint = 900;
const lgBreakpoint = 1200;
const xlBreakpoint = 1536;

const theme = createTheme({
    typography: {
        h1: {
            fontSize: 30,
            fontWeight: 600,
            marginBlock: 10,
        },
        h2: {
            fontSize: 25,
            marginBottom: 10,
        },
        h3: {
            fontSize: 20,
            marginBottom: 10,
        },
        subtitle1: {
            marginBottom: 10,
        },
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    palette: {
        mode: "dark",
    },
    breakpoints: {
        values: {
            xs: xsBreakpoint,
            sm: smBreakpoint,
            md: mdBreakpoint,
            lg: lgBreakpoint,
            xl: xlBreakpoint,
        },
    },
});

export default theme;
export { xsBreakpoint, smBreakpoint, mdBreakpoint, lgBreakpoint, xlBreakpoint };
