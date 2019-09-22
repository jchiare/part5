import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './Temp'

afterEach(cleanup)

test('Likes renders fine', () => {
  const blog = {
    title: 'The blog title',
    author: 'Frank Smith',
    likes: 4
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  const likes = component.container.querySelector('.likes')
  expect(likes).toHaveTextContent(
    '4'
  )

})

test('Text renders ', () => {
  const blog = {
    title: 'The blog title',
    author: 'Frank Smith',
    likes: 4
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  const text = component.container.querySelector('.text')
  expect(text).toHaveTextContent(
    'The blog title'
  )

  expect(text).toHaveTextContent(
    'Frank Smith'
  )

})

test('Likes number increments', () => {
  const blog = {
    title: 'The blog title',
    author: 'Frank Smith',
    likes: 4
  }

  const mockHandler = jest.fn()

  const component = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)

})