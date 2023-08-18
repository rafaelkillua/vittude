import '@testing-library/jest-dom'
import { describe, expect, test, vi } from 'vitest'
import { render, fireEvent, waitFor } from '@testing-library/react'

import { LoginForm } from '@/presentation/components'
import { MockToastAdapter } from '../domain/mocks/mockToastAdapter'
import { MockRemoteTokenAuthentication } from '../domain/mocks/mockRemoteTokenAuthentication'

const makeSut = async (rejectAuth?: boolean): Promise<{ loginForm: HTMLElement, container: HTMLElement, mockAuthService: () => void, mockShowToast: () => void }> => {
  const mockAuthService = vi.fn()
  const mockShowToast = vi.fn()
  const authService = new MockRemoteTokenAuthentication(mockAuthService)
  if (rejectAuth) {
    vi.spyOn(authService, 'auth').mockRejectedValue(new Error('Async error'))
  }
  
  const { findByRole, container } = render(
    <LoginForm
      authService={authService}
      showToast={new MockToastAdapter(mockShowToast).showToast}
    />
  )

  return {
    loginForm: await findByRole('form'),
    container,
    mockAuthService,
    mockShowToast
  }
}

describe('LoginForm Component', () => {
  test('Render', async () => {
    const { loginForm } = await makeSut()
    expect(loginForm).toBeInTheDocument()
  })

  test('Submit with valid fields', async () => {
    const { loginForm, mockAuthService, mockShowToast } = await makeSut()
    const values = {
      username: 'kminchelle',
      password: '0lelplR'
    }
    const usernameField = loginForm.querySelector('[name="username"]')
    if (usernameField) fireEvent.change(usernameField, { target: { value: values.username } })
    const passwordField = loginForm.querySelector('[name="password"]')
    if (passwordField) fireEvent.change(passwordField, { target: { value: values.password } })
    const submitButton = loginForm.querySelector('[type="submit"]')
    if (submitButton) fireEvent.click(submitButton)
    await waitFor(() => { expect(mockAuthService).toHaveBeenCalledWith(values) })
    await waitFor(() => { expect(mockShowToast).toHaveBeenCalledOnce() })
  })

  test('Submit with invalid fields', async () => {
    const { loginForm, mockAuthService, mockShowToast } = await makeSut()
    const values = {
      username: 'kminchelle',
      password: ''
    }
    const usernameField = loginForm.querySelector('[name="username"]')
    if (usernameField) fireEvent.change(usernameField, { target: { value: values.username } })
    const passwordField = loginForm.querySelector('[name="password"]')
    if (passwordField) fireEvent.change(passwordField, { target: { value: values.password } })
    const submitButton = loginForm.querySelector('[type="submit"]')
    if (submitButton) fireEvent.click(submitButton)
    await waitFor(() => { expect(mockAuthService).not.toHaveBeenCalled() })
    await waitFor(() => { expect(mockShowToast).not.toHaveBeenCalledOnce() })
  })

  test('Submit and get error', async () => {
    const { loginForm, mockShowToast } = await makeSut(true)
    const values = {
      username: 'kminchelle',
      password: '0lelplR'
    }
    const usernameField = loginForm.querySelector('[name="username"]')
    if (usernameField) fireEvent.change(usernameField, { target: { value: values.username } })
    const passwordField = loginForm.querySelector('[name="password"]')
    if (passwordField) fireEvent.change(passwordField, { target: { value: values.password } })
    const submitButton = loginForm.querySelector('[type="submit"]')
    if (submitButton) fireEvent.click(submitButton)
    await waitFor(() => { expect(mockShowToast).toHaveBeenCalledOnce() })
  })
})