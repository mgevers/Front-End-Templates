export type AlertColor = 'success' | 'info' | 'warning' | 'error';

export type Toast = {
  severity?: AlertColor;
  title?: string;
  message: string;
};
