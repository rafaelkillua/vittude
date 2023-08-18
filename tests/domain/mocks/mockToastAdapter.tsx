import { type ReactNode } from 'react'

import { type Toast, type ToastProps } from '@/domain/gateways/toast'

export class MockToastAdapter implements Toast {
  readonly toastContainer: ReactNode = <div className="toastContainer" />
  spyFn: () => void

  constructor(fn: () => void) {
    this.spyFn = fn
  }

  showToast: (props: ToastProps) => void = () => { this.spyFn(); }
}
