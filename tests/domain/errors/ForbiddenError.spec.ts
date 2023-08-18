import '@testing-library/jest-dom'
import { describe, expect, test } from 'vitest'

import { ForbiddenError } from '@/domain/errors'

const makeSut = (): ForbiddenError => {
  return new ForbiddenError()
}

describe('Forbidden Error', () => {
  test('Instance', () => {
    const error = makeSut()
    expect(error.name).toBe('ForbiddenError')
    expect(error.message).toBe('Permissão insuficiente para acessar este recurso')
  })
})