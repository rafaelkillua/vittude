import { HTMLProps } from "react"

export interface IInputProps extends Omit<HTMLProps<HTMLInputElement>, 'ref'> {
  label?: string
  errorMessage?: string
}