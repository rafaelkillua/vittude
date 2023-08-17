import React, { lazy } from 'react'
import { makeRemoteTokenAuthentication } from '../usecases/auth/makeRemoteTokenAuthentication'
import { makeToastAdapter } from '../gateways/ToastFactory'

const Login = lazy(async () => import('@/presentation/pages/Login/Login.tsx').then(res => ({ default: res.LoginPage })))

export const makeLoginPage = (): React.ReactElement => {
  return <Login authService={makeRemoteTokenAuthentication()} toast={makeToastAdapter()} />
}
