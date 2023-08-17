import { FC } from "react"
import classNames from "classnames/bind"

import { IButtonProps } from "@/domain"
import styles from './Button.module.scss'

const cx = classNames.bind(styles)

export const Button: FC<IButtonProps> = (props) => {
  const { variant = 'contained', className, children, ...rest } = props

  return (
    <button className={cx(className, styles.button, styles[variant])} {...rest}>
      {children}
    </button>
  )
}