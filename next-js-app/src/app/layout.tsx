import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { roboto } from './theme';
import "./globals.css";
import ClientThemeProvider from './theme-provider';
import StoreProvider from '@/store/provider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Next App</title>
        <meta name="description" content="Next.js app with Material UI" />
      </head>
      <body className={roboto.className}>
        <StoreProvider>
          <AppRouterCacheProvider>
            <ClientThemeProvider>
              {children}
            </ClientThemeProvider>
          </AppRouterCacheProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
