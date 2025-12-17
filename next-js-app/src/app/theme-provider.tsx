'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, InitColorSchemeScript } from "@mui/material";
import theme from './theme';
import AppDrawer from "@/components/drawer";
import MainView from "@/components/main-view";

export default function ClientThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <InitColorSchemeScript attribute="class" />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{
          display: 'flex',
          maxWidth: "100vw",
          height: '100vh'
        }}>
          <AppDrawer />
          <MainView>
            {children}
          </MainView>
        </Box>
      </ThemeProvider>
    </>
  );
}
