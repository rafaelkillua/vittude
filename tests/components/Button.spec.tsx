import '@testing-library/jest-dom'
import { describe, expect, test, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'

import { IButtonProps } from '@/domain'
import { Button } from '@/presentation/components'

const makeSut = async (props?: IButtonProps): Promise<{ button: HTMLElement, container: HTMLElement }> => {
  const { findByRole, container } = render(<Button {...props} />)

  return {
    button: await findByRole('button'),
    container
  }
}

describe('Button Component', () => {
  test('Render', async () => {
    const { button } = await makeSut()
    expect(button).toBeInTheDocument()
  })

  test('Button click', async () => {
    const onClick = vi.fn()
    const { button } = await makeSut({ onClick })
    fireEvent.click(button)
    expect(onClick).toHaveBeenCalledOnce()
  })

  test('Button disabled not clicking', async () => {
    const onClick = vi.fn()
    const { button } = await makeSut({ onClick, disabled: true })
    fireEvent.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })
})