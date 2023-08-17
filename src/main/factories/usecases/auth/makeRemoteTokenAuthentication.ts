import { RemoteTokenAuthentication, TokenAuthentication } from "@/domain"
import { makeAxiosHttpClientAdapter } from "../../http/makeAxiosAdapterFactory"

export const makeRemoteTokenAuthentication = (): TokenAuthentication => {
  const url = `${import.meta.env.VITE_APP_API_URL as string}auth/login`
  return new RemoteTokenAuthentication(url, makeAxiosHttpClientAdapter())
}
