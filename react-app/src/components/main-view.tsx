import { Box } from "@mui/material";
import { HeaderHeight } from "./header";
import Toast from "./toast/toast";

export default function MainView({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                width: "100%",
                minHeight: "100vh",
                padding: 2,
                overflow: "auto",
            }}
        >
            <Box sx={{ height: HeaderHeight }}></Box>
            {children}
            <Toast />
        </Box>
    );
}
