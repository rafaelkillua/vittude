import { AccountModel, HttpClient, ILoginFormFields } from "@/domain"
import { AxiosHttpClientAdapter } from "@/infra/adapters/HttpClientAdapter"

export const makeAxiosHttpClientAdapter = (): HttpClient<ILoginFormFields, AccountModel> => {
  return new AxiosHttpClientAdapter()
}
