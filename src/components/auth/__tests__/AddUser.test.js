import React from 'react'
import { fireEvent, wait } from 'react-testing-library'
import { renderWithRedux } from '../../../lib/testing-utils'

import AddUser from '../AddUser'

describe('with a successful response', () => {
  beforeEach(() => {
    fetch.once(JSON.stringify({ client_id: 'funky', client_secret: 'psst' }))
  })

  it('sets the input to disabled', async () => {
    const { getByLabelText, getByText } = renderWithRedux(<AddUser />)
    const input = getByLabelText(/your instance/i)
    const button = getByText('Login')

    fireEvent.change(input, { target: { value: 'funk.town' } })
    fireEvent.click(button)

    expect(input.disabled).toBe(true)
  })

  it('sets the button to disabled', async () => {
    const { getByLabelText, getByText } = renderWithRedux(<AddUser />)
    const input = getByLabelText(/your instance/i)
    const button = getByText('Login')

    fireEvent.change(input, { target: { value: 'funk.town' } })
    fireEvent.click(button)

    expect(button.disabled).toBe(true)
  })

  it('redirects to the correct authorization page', async () => {
    const location = (window.location.assign = jest.fn())
    const { getByLabelText, getByText } = renderWithRedux(<AddUser />)
    const input = getByLabelText(/your instance/i)
    const button = getByText('Login')

    fireEvent.change(input, { target: { value: 'funk.town' } })
    fireEvent.click(button)
    await wait()

    expect(location).toHaveBeenCalledWith(
      expect.stringMatching(/^https:\/\/funk.town/)
    )
    expect(location).toHaveBeenCalledWith(
      expect.stringContaining('client_id=funky')
    )
    expect(location).toHaveBeenCalledWith(
      expect.stringContaining(
        'redirect_uri=https%3A%2F%2Ffake.host%2Fauthorized%2Ffunk.town'
      )
    )
  })

  it('defaults to mastodon.social', async () => {
    const location = (window.location.assign = jest.fn())
    const { getByText } = renderWithRedux(<AddUser />)
    const button = getByText('Login')

    fireEvent.click(button)
    await wait()

    expect(location).toHaveBeenCalledWith(
      expect.stringMatching(/^https:\/\/mastodon.social/)
    )
  })

  it('does not create a new client if one is already stored', async () => {
    const location = (window.location.assign = jest.fn())
    const { getByLabelText, getByText } = renderWithRedux(<AddUser />, {
      initialState: {
        clients: { 'funk.town': { clientId: 'earth', clientSecret: 'wind' } }
      }
    })
    const input = getByLabelText(/your instance/i)
    const button = getByText('Login')

    fireEvent.change(input, { target: { value: 'funk.town' } })
    fireEvent.click(button)
    await wait()

    expect(fetch).not.toHaveBeenCalled()
    expect(location).toHaveBeenCalled()
  })
})

describe('with an invalid uri', () => {
  it('shows an error', async () => {
    const { getByLabelText, getByText } = renderWithRedux(<AddUser />)
    const input = getByLabelText(/your instance/i)
    const button = getByText('Login')

    fireEvent.change(input, { target: { value: 'funk/not@town' } })
    fireEvent.click(button)

    expect(getByText(/Error/)).toBeInTheDocument()
  })

  it('removes the error if url was changes', async () => {
    const { getByLabelText, getByText } = renderWithRedux(<AddUser />)
    const input = getByLabelText(/your instance/i)
    const button = getByText('Login')

    fireEvent.change(input, { target: { value: 'funk/not@town' } })
    fireEvent.click(button)
    const error = getByText(/Error/)
    fireEvent.change(input, { target: { value: 'funk.town' } })

    expect(error).not.toBeInTheDocument()
  })
})

describe('with a failed request', () => {
  beforeEach(() => {
    fetch.mockRejectOnce(
      JSON.stringify({ error_code: 'SAD', error_description: 'bad error' })
    )
  })

  it('shows an error', async () => {
    const { getByLabelText, getByText } = renderWithRedux(<AddUser />)
    const input = getByLabelText(/your instance/i)
    const button = getByText('Login')

    fireEvent.change(input, { target: { value: 'funk/not@town' } })
    fireEvent.click(button)
    await wait()

    expect(getByText(/Error/)).toBeInTheDocument()
  })

  it('resets the input to not-disabled', async () => {
    const { getByLabelText, getByText } = renderWithRedux(<AddUser />)
    const input = getByLabelText(/your instance/i)
    const button = getByText('Login')

    fireEvent.change(input, { target: { value: 'funk/not@town' } })
    fireEvent.click(button)
    await wait()

    expect(input.disabled).toBe(false)
  })

  it('resets the button to not-disabled', async () => {
    const { getByLabelText, getByText } = renderWithRedux(<AddUser />)
    const input = getByLabelText(/your instance/i)
    const button = getByText('Login')

    fireEvent.change(input, { target: { value: 'funk/not@town' } })
    fireEvent.click(button)
    await wait()

    expect(button.disabled).toBe(false)
  })
})
