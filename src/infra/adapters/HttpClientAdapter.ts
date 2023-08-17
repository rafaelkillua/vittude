import axios, { AxiosResponse, AxiosError } from "axios"
import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from "@/domain/protocols"

export class AxiosHttpClientAdapter<RequestBody, ResponseBody> implements HttpClient<RequestBody, ResponseBody> {
  async request (data: HttpRequest<RequestBody>): Promise<HttpResponse<ResponseBody>> {
    try {
      const axiosResponse: AxiosResponse<ResponseBody> = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers
      })

      return {
        statusCode: axiosResponse.status,
        body: axiosResponse.data
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response) {
          return {
            statusCode: error.response.status,
            error: (error.response as AxiosResponse<{ error: string }>).data.error
          }
        } else {
          return {
            statusCode: HttpStatusCode.serverError,
            error: error.message
          }
        }
      } else {
        return {
          statusCode: HttpStatusCode.serverError
        }
      }
    }
  }
}