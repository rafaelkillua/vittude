import { ILoginFormFields, TokenAuthentication } from '@/domain'

export class MockRemoteTokenAuthentication implements TokenAuthentication {
  spyFn: (props: ILoginFormFields) => void

  constructor(fn: () => void) {
    this.spyFn = fn
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  auth = async (username: string, password: string) => {
    this.spyFn({
      username,
      password
    })
    return {
      token: 'any_token'
    }
  }
}
