import { ComponentPropsWithoutRef } from "react";

export interface IButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'outlined' | 'contained'
}