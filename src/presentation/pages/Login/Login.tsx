import { FC } from "react"

import { NavBar, LoginForm } from "@/presentation/components"
import { TokenAuthentication, Toast } from "@/domain"
import banner from '@/presentation/assets/banner.svg'
import styles from './Login.module.scss'

interface ILoginPageProps {
  authService: TokenAuthentication
  toast: Toast
}

export const LoginPage: FC<ILoginPageProps> = ({ authService, toast }) => {
  const ToastContainer = toast.toastContainer

  return (
    <main className={styles.main}>
      <NavBar />
      <div className={styles.container}>
        <h1 className={styles.title}>Bem-vindo a Vittude!</h1>
        <LoginForm authService={authService} showToast={toast.showToast} />
      </div>
      <img className={styles.banner} src={banner} aria-hidden />
      {ToastContainer}
    </main>
  )
}