import { type HttpClient, type HttpRequest, type HttpResponse, HttpStatusCode } from '@/domain/protocols/HttpClient'

export const mockHttpRequest = (): HttpRequest<{ any: string }> => ({
  url: 'any_url',
  method: 'get',
  body: { any: 'body' },
  headers: { any: 'header' }
})

export class HttpClientSpy<RequestBody, ResponseBody> implements HttpClient<RequestBody, ResponseBody> {
  constructor (readonly status: HttpStatusCode = HttpStatusCode.ok) {
    this.result ={
      statusCode: status
    }
  }

  data: HttpRequest<RequestBody> | undefined
  result: HttpResponse<ResponseBody> 

  // eslint-disable-next-line @typescript-eslint/require-await
  async request (data: HttpRequest<RequestBody>): Promise<HttpResponse<ResponseBody>> {
    this.data = data
    return this.result
  }
}
