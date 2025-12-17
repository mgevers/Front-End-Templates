import { createTheme } from "@mui/material/styles";
import { Roboto } from 'next/font/google';

export const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

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
            marginBottom: 10
        },
        fontFamily: roboto.style.fontFamily
    },
    palette: {
        mode: 'dark'
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
