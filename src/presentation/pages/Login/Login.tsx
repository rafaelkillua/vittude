import { FC } from "react"

import { NavBar, LoginForm } from "@/presentation/components"
import { TokenAuthentication } from "@/domain"
import styles from './Login.module.scss'

interface ILoginPageProps {
  authService: TokenAuthentication
}

export const LoginPage: FC<ILoginPageProps> = ({ authService }) => {
  return (
    <main className={styles.main}>
      <NavBar />
      <div className={styles.container}>
        <h1 className={styles.title}>Bem-vindo a Vittude!</h1>
        <LoginForm authService={authService} onSubmit={console.log} />
      </div>
    </main>
  )
}