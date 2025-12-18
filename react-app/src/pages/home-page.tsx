import { AlertColor, Button, Grid, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../store/store";
import { showToast } from "../store/slices/toast.slice";

export default function HomePage() {
    const dispatch = useDispatch<AppDispatch>();

    const displayToast = (message: string, alert?: AlertColor) => {
        const toast = {
            message,
            severity: alert,
        };

        dispatch(showToast(toast));
    };

    return (
        <>
            <Typography variant="h1">Home Page!</Typography>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => displayToast("Success!", "success")}
                    >
                        Success
                    </Button>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Button
                        fullWidth
                        variant="outlined"
                        color="error"
                        onClick={() => displayToast("Failure!", "error")}
                    >
                        Failure
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}
