'use client';

import { useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearToast } from '@/store/slices/toast.slice';
import { Toast as ToastType } from '.';
import { AppDispatch, RootState } from '@/store';
import { Alert, AlertColor, AlertTitle, Snackbar } from '@mui/material';

type ToastState = {
  queue: ToastType[];
  currentToast: ToastType | undefined;
};

type ToastAction =
  | { type: 'ADD_TO_QUEUE'; toast: ToastType }
  | { type: 'SHOW_NEXT' }
  | { type: 'DISMISS' };

function toastReducer(state: ToastState, action: ToastAction): ToastState {
  switch (action.type) {
    case 'ADD_TO_QUEUE':
      // Always add to queue, never show immediately
      return { ...state, queue: [...state.queue, action.toast] };
    case 'SHOW_NEXT':
      // Only show next if no current toast and queue has items
      if (state.currentToast || state.queue.length === 0) return state;
      return {
        queue: state.queue.slice(1),
        currentToast: state.queue[0],
      };
    case 'DISMISS':
      // Just clear current toast, don't auto-show next
      return { ...state, currentToast: undefined };
    default:
      return state;
  }
}

export default function Toast() {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useSelector((state: RootState) => state.toast.toast);

  const [state, dispatchToast] = useReducer(toastReducer, {
    queue: [],
    currentToast: undefined,
  });

  useEffect(() => {
    if (toast) {
      const isDuplicateInQueue = state.queue.some(
        (t) => t.message === toast.message && t.severity === toast.severity
      );
      const isDuplicateCurrent = state.currentToast?.message === toast.message && 
        state.currentToast?.severity === toast.severity;
      
      if (!isDuplicateInQueue && !isDuplicateCurrent) {
        dispatchToast({ type: 'ADD_TO_QUEUE', toast });
        dispatch(clearToast());
      }
    }
  }, [toast, dispatch, state.queue, state.currentToast]);

  // Separate effect to show next toast when current is cleared
  useEffect(() => {
    if (!state.currentToast && state.queue.length > 0) {
      dispatchToast({ type: 'SHOW_NEXT' });
    }
  }, [state.currentToast, state.queue.length]);

  const handleDismiss = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatchToast({ type: 'DISMISS' });
  };

  const toastDuration: Record<AlertColor, number> = {
    success: 1000,
    info: 1000,
    warning: 3000,
    error: 5000,
  };

  return (
    <Snackbar
      key={state.currentToast?.message}
      open={!!state.currentToast}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}
      onClose={handleDismiss}
      autoHideDuration={toastDuration[state.currentToast?.severity ?? 'info']}
    >
      <Alert
        onClose={handleDismiss}
        severity={state.currentToast?.severity || 'info'}
        variant='filled'
        sx={{ width: '100%' }}
      >
        {state.currentToast?.title && (<AlertTitle sx={{ fontWeight: 600 }}>{state.currentToast.title}</AlertTitle>)}
        {state.currentToast?.message}
      </Alert>
    </Snackbar>
  );
}
