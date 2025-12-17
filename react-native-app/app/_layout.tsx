import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import { Provider } from 'react-redux';

import Toast from '@/components/toast/toast';
import { darkTheme, lightTheme } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { store } from '@/store';
import React from 'react';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';

export const unstable_settings = {
  anchor: '(drawer)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const paperTheme: ThemeProp = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <Provider store={store}>
      <PaperProvider theme={paperTheme}>
        <Stack>
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
        <Toast />
      </PaperProvider>
    </Provider>
  );
}
