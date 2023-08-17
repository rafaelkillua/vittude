import { forwardRef, useId } from "react"
import classNames from "classnames/bind"

import { IInputProps } from "@/domain"
import styles from './Input.module.scss'

const cx = classNames.bind(styles)

export const Input = forwardRef<HTMLInputElement, IInputProps>(function Input(props, ref) {
  const { id, className, label, ...rest } = props

  const uid = useId()
  const inputId = id ?? uid

  return (
    <div className={cx(styles.inputContainer, className)}>
      <label className={styles.label} htmlFor={inputId}>{label}</label>
      <input className={styles.input} id={inputId} ref={ref} {...rest} />
    </div>
  )
})