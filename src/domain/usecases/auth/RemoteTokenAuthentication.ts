import { AccountModel, ILoginFormFields } from "@/domain/models";
import { HttpClient, HttpStatusCode } from "../..";
import { ServerError, UnauthorizedError } from "../../errors";

export interface TokenAuthentication {
  auth: (username: string, password: string) => Promise<AccountModel>
}

export class RemoteTokenAuthentication implements TokenAuthentication {
  private readonly url: string
  private readonly httpClient: HttpClient<ILoginFormFields, AccountModel>

  constructor (
    url: string,
    httpClient: HttpClient<ILoginFormFields, AccountModel>
  ) {
    this.url = url
    this.httpClient = httpClient
  }

  async auth (username: string, password: string): Promise<AccountModel> {
    const response = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: { username, password }
    })
    switch (response.statusCode) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      case HttpStatusCode.ok: return response.body!
      case HttpStatusCode.unauthorized: throw new UnauthorizedError()
      default: throw new ServerError(response.error)
    }
  }
}
