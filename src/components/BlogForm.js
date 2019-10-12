import React from 'react'
import { connect } from 'react-redux'

import { addBlog } from '../reducers/blogReducer'

const BlogFormComponent = ({
  createBlog,
  title,
  author,
  url,
  addBlog
}) => {

  /*
  const onBlogSubmitted = async event => {
    event.preventDefault()
    const data = event.target
  }*/

  const { reset:titleReset, ...titleProps } = title
  const { reset:authorReset, ...authorProps } = author
  const { reset:urlReset, ...urlProps } = url

  return (
    <div>
      <h3>Create New Blog</h3>
      <form onSubmit={createBlog}>
        <div>
          Title:
          <input
            { ... titleProps }
          />
        </div>
        <div>
          Author:
          <input
            { ... authorProps }
          />
        </div>
        <div>
          URL:
          <input
            { ... urlProps }
          />
        </div>
        <button type="submit">Create blog</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  addBlog
}

export const BlogForm = connect(null,mapDispatchToProps)(BlogFormComponent)