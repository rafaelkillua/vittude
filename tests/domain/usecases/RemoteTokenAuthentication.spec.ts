import { describe, expect, test } from 'vitest'

import { RemoteTokenAuthentication } from '@/domain/usecases/auth/RemoteTokenAuthentication'
import { HttpStatusCode } from '@/domain/protocols/HttpClient'
import { UnauthorizedError } from '@/domain/errors/UnauthorizedError'
import { ServerError } from '@/domain/errors/ServerError'
import { ILoginFormFields, type AccountModel } from '@/domain'
import { HttpClientSpy } from '../mocks/mockHttp'

interface SutTypes {
  sut: RemoteTokenAuthentication
  httpClientSpy: HttpClientSpy<ILoginFormFields, AccountModel>
}

const makeSut = (url = 'any_url'): SutTypes => {
  const httpClientSpy = new HttpClientSpy<ILoginFormFields, AccountModel>()
  const sut = new RemoteTokenAuthentication(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

const mockFields = (): ILoginFormFields => ({ username: 'any_username', password: 'any_password' })

const mockAccountModel = (): AccountModel => ({
  token: 'any_token',
})

describe('RemoteTokenAuthentication usecase', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = 'any_url'
    const { sut, httpClientSpy } = makeSut(url)
    const { username, password } = mockFields()
    await sut.auth(username, password)
    expect(httpClientSpy.data).toEqual({
      url,
      method: 'post',
      body: mockFields()
    })
  })

  test('Should throw UnauthorizedError if HttpClient returns 4xx', async () => {
    const url = 'any_url'
    const { sut, httpClientSpy } = makeSut(url)

    httpClientSpy.result = {
      statusCode: HttpStatusCode.unauthorized,
      error: 'any_error'
    }

    const { username, password } = mockFields()
    const promise = sut.auth(username, password)
    await expect(promise).rejects.toThrowError(new UnauthorizedError())
  })

  test('Should throw ServerError if HttpClient returns 500', async () => {
    const url = 'any_url'
    const { sut, httpClientSpy } = makeSut(url)

    httpClientSpy.result = {
      statusCode: HttpStatusCode.serverError,
      error: 'any_error'
    }

    const { username, password } = mockFields()
    const promise = sut.auth(username, password)
    await expect(promise).rejects.toThrowError(new ServerError())
  })

  test('Should return AccountModel on success', async () => {
    const url = 'any_url'
    const { sut, httpClientSpy } = makeSut(url)

    const body = mockAccountModel()

    httpClientSpy.result = {
      statusCode: HttpStatusCode.ok,
      body
    }

    const { username, password } = mockFields()
    const account = await sut.auth(username, password)
    expect(account).toEqual(body)
  })
})
