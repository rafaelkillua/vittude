import '@testing-library/jest-dom'
import { describe, expect, test } from 'vitest'
import { render, fireEvent } from '@testing-library/react'

import { NavBar } from '@/presentation/components'

const makeSut = async (): Promise<{ navbar: HTMLElement, container: HTMLElement }> => {
  const { findByRole, container } = render(<NavBar />)

  return {
    navbar: await findByRole('navigation'),
    container
  }
}

describe('NavBar Component', () => {
  test('Render', async () => {
    const { navbar } = await makeSut()
    expect(navbar).toBeInTheDocument()
  })

  test('Open bottom sheet when mobile', async () => {
    const { navbar, container } = await makeSut()
    const menu = navbar.querySelector('img[aria-label="Open menu"]')
    if (menu) fireEvent.click(menu)
    const bottomSheet = container.querySelector('[role="bottom sheet"]')
    expect(bottomSheet).toHaveClass('bottomSheetOpen')
  })

  test('Click backdrop to close bottom sheet', async () => {
    const { navbar, container } = await makeSut()
    const menu = navbar.querySelector('img[aria-label="Open menu"]')
    if (menu) fireEvent.click(menu)
    const backdrop = document.body.querySelector('[role="backdrop"]')
    if (backdrop) fireEvent.click(backdrop)
    const bottomSheet = container.querySelector('[role="bottom sheet"]')
    expect(bottomSheet).not.toHaveClass('bottomSheetOpen')
  })
})