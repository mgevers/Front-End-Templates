'use client';

import { AppDispatch } from "@/store";
import { showToast } from "@/store/slices/toast.slice";
import { AlertColor, Grid, Button } from "@mui/material";
import { useDispatch } from "react-redux";

export default function ToastTestingButtons() {
    const dispatch = useDispatch<AppDispatch>();

    const displayToast = (message: string, alert?: AlertColor) => {
        const toast = {
            message,
            severity: alert,
        };

        dispatch(showToast(toast));
    };

    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
                <Button fullWidth variant="contained" color="primary" onClick={() => displayToast('Success!', 'success')}>
                    Success
                </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
                <Button fullWidth variant="outlined" color="error" onClick={() => displayToast('Failure!', 'error')}>
                    Failure
                </Button>
            </Grid>
        </Grid>
    );
}