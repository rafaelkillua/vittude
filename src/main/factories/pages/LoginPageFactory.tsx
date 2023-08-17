import React, { lazy } from 'react'
import { makeRemoteTokenAuthentication } from '../usecases/auth/makeRemoteTokenAuthentication'

const Login = lazy(async () => import('@/presentation/pages/Login/Login.tsx').then(res => ({ default: res.LoginPage })))

export const makeLoginPage = (): React.ReactElement => {
  return <Login authService={makeRemoteTokenAuthentication()} />
}
