import React from 'react'
const RenderBlogs = ({ blogs }) => (
  <div>
    <ul>
        {blogs.map(blog => <li key={blog.id}>{blog.title} {blog.author}</li>)}
      </ul>
  </div>
)

export default RenderBlogs