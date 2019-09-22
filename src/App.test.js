import React from 'react'
import {
  render, waitForElement
} from '@testing-library/react'
jest.mock('./services/blogs')
import '@testing-library/jest-dom/extend-expect'
import App from './App'


describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    expect(component.container).toHaveTextContent('Login to application')

  })

  test('blog posts are rendered if user is logged in', async() => {
    const user = {
      username: 'testuser',
      token: 'hello',
      name: 'Test User'
    }

    localStorage.setItem('blogUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('.defaultInfo')
    )
    component.debug()
  })
})