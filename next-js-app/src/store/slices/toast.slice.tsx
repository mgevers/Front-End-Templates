import { Toast } from '@/components/toast';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type ToastState = {
  toast: Toast | undefined;
};

const initialState: ToastState = {
  toast: undefined,
};

const toastSlice = createSlice({
  name: 'toast',
  initialState: initialState,
  reducers: {
    showToast: (state, action: PayloadAction<Toast>) => {
      state.toast = action.payload;
    },
    clearToast: (state) => {
      state.toast = undefined;
    },
  },
});

export const { showToast, clearToast } = toastSlice.actions;
export default toastSlice.reducer;
