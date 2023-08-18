import '@testing-library/jest-dom'
import { describe, expect, test } from 'vitest'

import { BadRequestError } from '@/domain/errors'

const makeSut = (message?: string): BadRequestError => {
  return new BadRequestError(message)
}

describe('BadRequest Error', () => {
  test('Instance', () => {
    const message = 'any_message'
    const error = makeSut(message)
    expect(error.name).toBe('Parâmetros inválidos')
    expect(error.message).toBe(message)
  })
})