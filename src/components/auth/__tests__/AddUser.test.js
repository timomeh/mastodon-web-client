import React from 'react'
import AddUser from '../AddUser'
import fetch, { call } from '../../../lib/mastodon/fetch-factory'

describe('with a successful response', () => {
  beforeEach(() => {
    call.mockImplementationOnce(() =>
      Promise.resolve({
        clientId: 'abc',
        clientSecret: '123'
      })
    )
  })

  describe('with a valid user-input url', () => {
    it('creates a new client', async () => {
      const { getByTestId, store } = renderWithRedux(<AddUser />)

      fireEvent.change(getByTestId('add-uri-input'), {
        target: { value: 'funk.town' }
      })
      fireEvent.click(getByTestId('add-uri-button'))

      await wait(() => expect(call).toHaveBeenCalled())
      expect(fetch).toHaveBeenCalledWith('funk.town')
      expect(store.getState()).toMatchObject({
        app: { uri: 'funk.town' },
        clients: {
          'funk.town': {
            clientId: 'abc',
            clientSecret: '123'
          }
        }
      })
    })

    it('redirects to the authorization page', async () => {
      window.location.assign = jest.fn()

      const { getByTestId } = renderWithRedux(<AddUser />)

      fireEvent.change(getByTestId('add-uri-input'), {
        target: { value: 'funk.town' }
      })
      fireEvent.click(getByTestId('add-uri-button'))

      await wait(() => expect(fetch).toHaveBeenCalled())
      const redirectUrl = window.location.assign.mock.calls[0][0]
      expect(redirectUrl).toMatch(/^https:\/\/funk.town\/oauth\/authorize/)
      expect(redirectUrl).toMatch(/https:\/\/fake.host\/authorized\/funk.town$/)
      expect(redirectUrl).toContain('client_id=abc')
      expect(redirectUrl).toContain('scope=read%20write%20follow')
      expect(redirectUrl).toContain('response_type=code')
    })

    it('sets the input to disabled', async () => {
      const { getByTestId } = renderWithRedux(<AddUser />)
      const input = getByTestId('add-uri-input')

      expect(input.disabled).toBe(false)

      fireEvent.change(getByTestId('add-uri-input'), {
        target: { value: 'funk.town' }
      })
      fireEvent.click(getByTestId('add-uri-button'))

      expect(input.disabled).toBe(true)
    })

    it('sets the button to disabled', async () => {
      const { getByTestId } = renderWithRedux(<AddUser />)
      const button = getByTestId('add-uri-button')

      expect(button.disabled).toBe(false)

      fireEvent.change(getByTestId('add-uri-button'), {
        target: { value: 'funk.town' }
      })
      fireEvent.click(getByTestId('add-uri-button'))

      expect(button.disabled).toBe(true)
    })
  })

  describe('without a user input', () => {
    it('defaults to mastodon.social', async () => {
      const { getByTestId, store } = renderWithRedux(<AddUser />)

      fireEvent.click(getByTestId('add-uri-button'))

      await wait(() => expect(call).toHaveBeenCalled())
      expect(fetch).toHaveBeenCalledWith('mastodon.social')
      expect(store.getState()).toMatchObject({
        app: { uri: 'mastodon.social' }
      })
    })
  })

  describe('with an invalid user-input url', () => {
    it('shows an error', async () => {
      const { getByTestId } = renderWithRedux(<AddUser />)

      fireEvent.change(getByTestId('add-uri-input'), {
        target: { value: 'invalid/host' }
      })
      fireEvent.click(getByTestId('add-uri-button'))

      expect(getByTestId('input-error')).toBeInTheDocument()
    })

    it('removes the error it url was changes', async () => {
      const { getByTestId } = renderWithRedux(<AddUser />)

      fireEvent.change(getByTestId('add-uri-input'), {
        target: { value: 'invalid/host' }
      })
      fireEvent.click(getByTestId('add-uri-button'))
      const error = getByTestId('input-error')
      expect(error).toBeInTheDocument()

      fireEvent.change(getByTestId('add-uri-input'), {
        target: { value: 'valid.host' }
      })
      expect(error).not.toBeInTheDocument()
    })
  })
})

describe('with a failed response', () => {
  beforeEach(() => {
    call.mockImplementationOnce(() => Promise.reject())
  })

  it('shows an error', async () => {
    const { getByTestId } = renderWithRedux(<AddUser />)

    fireEvent.click(getByTestId('add-uri-button'))
    await wait(() => expect(call).toHaveBeenCalled())
    expect(getByTestId('input-error')).toBeInTheDocument()
  })

  it('resets the input to not-disabled', async () => {
    const { getByTestId } = renderWithRedux(<AddUser />)
    const input = getByTestId('add-uri-input')

    fireEvent.click(getByTestId('add-uri-button'))
    expect(input.disabled).toBe(true)

    await wait(() => expect(call).toHaveBeenCalled())
    expect(input.disabled).toBe(false)
  })

  it('resets the button to not-disabled', async () => {
    const { getByTestId } = renderWithRedux(<AddUser />)
    const button = getByTestId('add-uri-button')

    fireEvent.click(getByTestId('add-uri-button'))
    expect(button.disabled).toBe(true)

    await wait(() => expect(call).toHaveBeenCalled())
    expect(button.disabled).toBe(false)
  })
})
