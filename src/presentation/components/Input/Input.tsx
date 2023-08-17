import { forwardRef, useId, useMemo, useState } from "react"
import classNames from "classnames/bind"

import { IInputProps } from "@/domain"
import styles from './Input.module.scss'

import eye from '@/presentation/assets/eye.svg'
import eyeHide from '@/presentation/assets/eye-hide.svg'

const cx = classNames.bind(styles)

export const Input = forwardRef<HTMLInputElement, IInputProps>(function Input(props, ref) {
  const { id, className, label, type, ...rest } = props

  const uid = useId()
  const inputId = id ?? uid

  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword(oldValue => !oldValue)
  }

  const inputType = useMemo(() => {
    if (type === 'password' && showPassword) {
      return 'text'
    }
    return type
  }, [type, showPassword])

  return (
    <div className={cx(styles.inputContainer, className)}>
      <label className={styles.label} htmlFor={inputId}>{label}</label>
      <input className={styles.input} id={inputId} ref={ref} type={inputType} {...rest} />
      {type === 'password' && (
        <img
          className={styles.showPasswordIcon}
          src={showPassword ? eyeHide : eye}
          onClick={toggleShowPassword}
          aria-hidden
        />
      )}
    </div>
  )
})