import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import AppDrawer from "./components/drawer";
import MainView from "./components/main-view";

export default function RootLayout() {
    return (
        <Box
            sx={{
                display: "flex",
                maxWidth: "100vw",
                height: "100vh",
            }}
        >
            <AppDrawer />
            <MainView>
                <Outlet />
            </MainView>
        </Box>
    );
}
