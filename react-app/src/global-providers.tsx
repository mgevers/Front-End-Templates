import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";

import { store } from "./store/store";
import theme from "./theme";

export default function GlobalProviders({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    );
}
