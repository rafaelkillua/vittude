export type HttpMethod = 'post' | 'get'

export interface HttpRequest<RequestBody> {
  url: string
  method: HttpMethod
  body?: RequestBody
  headers?: Record<string, string>
}

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  serverError = 500
}

export interface HttpResponse<ResponseBody> {
  statusCode: HttpStatusCode
  error?: string
  body?: ResponseBody
}

export interface HttpClient<RequestBody, ResponseBody> {
  request: (data: HttpRequest<RequestBody>) => Promise<HttpResponse<ResponseBody>>
}
