import React from 'react'

const BlogForm = ({
  createBlog,
  setTitle,
  setAuthor,
  setUrl,
  title,
  author,
  url
}) => {
  return (
    <div>
      <h3>Create New Blog</h3>
      <form onSubmit={createBlog}>
        <div>
          Title:
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            required
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          URL:
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
            required
          />
        </div>
        <button type="submit">Create blog</button>
      </form>
    </div>
  )
}

export default BlogForm