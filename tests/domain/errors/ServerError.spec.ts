import '@testing-library/jest-dom'
import { describe, expect, test } from 'vitest'

import { ServerError } from '@/domain/errors'

const makeSut = (message?: string): ServerError => {
  return new ServerError(message)
}

describe('Server Error', () => {
  test('Instance', () => {
    const error = makeSut()
    expect(error.name).toBe('ServerError')
    expect(error.message).toBe('Ocorreu um erro ao processar sua solicitação. Por favor tente novamente')
  })

  test('Network Error', () => {
    const error = makeSut('Network Error')
    expect(error.name).toBe('ServerError')
    expect(error.message).toBe('Parece que os nossos servidores estão offline. Por favor tente novamente')
  })
})