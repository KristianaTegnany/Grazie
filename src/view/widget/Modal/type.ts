export type ConfirmModalType = {
  isVisible: boolean;
  type: 'success' | 'error' | 'no-icon';
  title: string;
  description?: string;
  btnText: string;
  footerActionText?: string;
  onConfirm: Function;
  cantClose?: boolean;
};
