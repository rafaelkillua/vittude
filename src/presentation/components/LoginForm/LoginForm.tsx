import { FC } from "react"
import { useForm } from "react-hook-form"
import classNames from "classnames/bind"

import { Button, Input } from "@/presentation/components"
import type { ILoginFormProps, ILoginFormFields } from "@/domain"
import styles from './LoginForm.module.scss'

const cx = classNames.bind(styles)

export const LoginForm: FC<ILoginFormProps> = ({ authService }) => {
  const { register, handleSubmit } = useForm<ILoginFormFields>({
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const submit = async (form: ILoginFormFields) => {
    try {
      const res = await authService.auth(form.username, form.password)
      console.log(res.token)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className={cx(styles.form)} onSubmit={handleSubmit(submit)}>
      <Input
        {...register('username')}
        className={styles.input}
        label="Login"
        placeholder="email@exemplo.com"
      />
      <Input
        {...register('password')}
        className={styles.input}
        label="Senha"
        placeholder="······"
        type="password"
      />
      <Button className={styles.button} type="submit">
        Acessar
      </Button>
      <Button className={styles.button} type="button" variant="outlined">
        Esqueci minha senha
      </Button>
    </form>
  )
}