import '@testing-library/jest-dom'
import { describe, expect, test } from 'vitest'
import { render, fireEvent } from '@testing-library/react'

import { IInputProps } from '@/domain'
import { Input } from '@/presentation/components'

const makeSut = async (props?: IInputProps): Promise<{ input: HTMLElement, container: HTMLElement }> => {
  // eslint-disable-next-line
  const { findByRole, container } = render(<Input {...props} />)

  return {
    input: await findByRole('textbox'),
    container
  }
}

describe('Input Component', () => {
  test('Render', async () => {
    const { input } = await makeSut()
    expect(input).toBeInTheDocument()
  })

  test('Show password when clicking eye', async () => {
    const { input, container } = await makeSut({ type: 'password' })
    const eyeIcon = container.querySelector('img')
    if (eyeIcon) fireEvent.click(eyeIcon)
    expect(input.getAttribute('type')).toBe('text')
  })

  test('Show text when clicking eye again', async () => {
    const { input, container } = await makeSut({ type: 'password' })
    const eyeIcon = container.querySelector('img')
    if (eyeIcon) {
      fireEvent.click(eyeIcon)
      fireEvent.click(eyeIcon)
    }
    expect(input.getAttribute('type')).toBe('password')
  })
})