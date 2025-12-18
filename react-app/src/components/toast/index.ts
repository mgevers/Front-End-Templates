import type { AlertColor } from "@mui/material";

export type Toast = {
    severity?: AlertColor;
    title?: string;
    message: string;
};
