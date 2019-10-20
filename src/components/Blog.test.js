import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import RenderBlogs from './Blog'

afterEach(cleanup)

test('Blog post displays correct information', () => {
  const blog = {
    title: 'The blog title',
    author: 'Frank Smith',
  }

  const component = render(
    <RenderBlogs blog={blog} />,
  )

  const defaultText = component.container.querySelector('.defaultInfo')
  expect(defaultText).toHaveTextContent('The blog title Frank Smith')

  const extraText = component.container.querySelector('.extraInfo')
  expect(extraText).toHaveStyle('display:none')

  fireEvent.click(defaultText)

  expect(extraText).toHaveStyle('')
})
