import React, { useEffect, useState } from 'react';
import { Snackbar, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@/store';
import { clearToast } from '@/store/slices/toast.slice';
import { AlertColor, Toast as ToastType } from '.';

type ToastColors = {
  text: string;
  background: string;
};

export default function Toast() {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useSelector((state: RootState) => state.toast.toast);

  const [queue, setQueue] = useState<ToastType[]>([]);
  const [currentToast, setCurrentToast] = useState<ToastType | undefined>(undefined);

  useEffect(() => {
    if (toast && !queue.find((t) => t.message === toast.message && t.severity === toast.severity)) {
      setQueue((prev) => [...prev, toast]);
      dispatch(clearToast());
    }
  }, [toast, dispatch]);

  useEffect(() => {
    if (!currentToast && queue.length > 0) {
      setCurrentToast(queue[0]);
      setQueue((prev) => prev.slice(1));
    }
  }, [currentToast, queue]);

  const handleDismiss = () => {
    setCurrentToast(undefined);
  };

  const successTheme: ToastColors = {
    text: 'black',
    background: 'green',
  };

  const infoTheme: ToastColors = {
    text: 'white',
    background: 'green',
  };

  const warningTheme: ToastColors = {
    text: 'white',
    background: 'orange',
  };

  const errorTheme: ToastColors = {
    text: 'black',
    background: 'red',
  };

  const toastTheme: Record<AlertColor, ToastColors> = {
    success: successTheme,
    info: infoTheme,
    warning: warningTheme,
    error: errorTheme,
  };

  const toastDuration: Record<AlertColor, number> = {
    success: 1000,
    info: 1000,
    warning: 3000,
    error: 5000,
  };

  return (
    <Snackbar
      key={currentToast?.message}
      visible={!!currentToast}
      onDismiss={handleDismiss}
      style={{ backgroundColor: toastTheme[currentToast?.severity ?? 'info'].background }}
      duration={toastDuration[currentToast?.severity ?? 'info']}
    >
      <Text
        variant="titleLarge"
        style={{ color: toastTheme[currentToast?.severity ?? 'info'].text }}
      >
        {currentToast?.message}
      </Text>
    </Snackbar>
  );
}
