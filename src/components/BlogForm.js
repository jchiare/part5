import React from 'react'

const BlogForm = ({
  createBlog,
  title,
  author,
  url
}) => {

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

export default BlogForm