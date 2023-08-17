import { type ReactNode } from 'react'
import { toast, ToastContainer, type ToastOptions } from 'react-toastify'

import { type Toast, type ToastProps } from '@/domain/gateways/toast'

const defaultToastProps: ToastOptions = {
  autoClose: false,
  position: 'bottom-left',
  closeOnClick: false,
  draggable: false,
  hideProgressBar: true
}

export class ReactToastifyAdapter implements Toast {
  readonly toastContainer: ReactNode = <ToastContainer {...defaultToastProps} />

  showToast: (props: ToastProps) => void = ({ message, ...t }) => toast(message, { ...t })
}
