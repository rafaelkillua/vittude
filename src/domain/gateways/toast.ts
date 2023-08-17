import { type ReactNode } from 'react'

export interface ToastProps {
  message: string | ReactNode
  type: ToastTypes
}

export enum ToastTypes {
  success = 'success',
  error = 'error',
  warning = 'warning',
  info = 'info',
  default = 'default'
}

export interface Toast {
  toastContainer: ReactNode
  showToast: (props: ToastProps) => void
}
