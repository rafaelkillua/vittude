import { FC } from "react"
import { useForm } from "react-hook-form"
import classNames from "classnames/bind"

import { Button, Input } from "@/presentation/components"
import { type ILoginFormProps, type ILoginFormFields, ToastTypes } from "@/domain"
import styles from './LoginForm.module.scss'

const cx = classNames.bind(styles)

export const LoginForm: FC<ILoginFormProps> = ({ authService, showToast }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ILoginFormFields>({
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const submit = async (form: ILoginFormFields) => {
    try {
      const res = await authService.auth(form.username, form.password)
      console.log(res.token)
      showToast({ message: 'Logado com sucesso!', type: ToastTypes.success })
    } catch (error) {
      console.error(error)
      showToast({ message: (error as Error).message, type: ToastTypes.error })
    }
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className={cx(styles.form)} onSubmit={handleSubmit(submit)} aria-label="Formulário de login">
      <Input
        {...register('username', { required: 'Login obrigatório' })}
        className={styles.input}
        label="Login"
        placeholder="email@exemplo.com"
        errorMessage={errors.username?.message}
      />
      <Input
        {...register('password', { required: 'Senha obrigatória' })}
        className={styles.input}
        label="Senha"
        placeholder="······"
        type="password"
        errorMessage={errors.password?.message}
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