import { forwardRef, useId, useMemo, useState } from "react"
import classNames from "classnames/bind"

import { IInputProps } from "@/domain"
import styles from './Input.module.scss'

import eye from '@/presentation/assets/icons/eye.svg'
import eyeHide from '@/presentation/assets/icons/eye-hide.svg'

const cx = classNames.bind(styles)

export const Input = forwardRef<HTMLInputElement, IInputProps>(function Input(props, ref) {
  const { id, className, label, type, errorMessage, ...rest } = props

  const uid = useId()
  const inputId = id ?? uid
  const hintId = `${inputId}-hint`

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

  const hasError = useMemo(() => !!errorMessage, [errorMessage])

  return (
    <div className={cx(styles.inputContainer, className)}>
      <label className={styles.label} htmlFor={inputId}>{label}</label>
      <input
        className={cx(styles.input, { [styles.error]: hasError })}
        id={inputId}
        ref={ref}
        type={inputType}
        aria-errormessage={hintId}
        aria-invalid={hasError}
        role="textbox"
        {...rest}
      />
      {type === 'password' && (
        <img
          className={styles.showPasswordIcon}
          src={showPassword ? eyeHide : eye}
          onClick={toggleShowPassword}
          aria-hidden
        />
      )}
      <div className={styles.hint} id={hintId}>
        {errorMessage}
      </div>
    </div>
  )
})