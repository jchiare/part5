import React from 'react'
import { connect } from 'react-redux'
import { addLike } from '../reducers/blogReducer'

const BlogObj = ({ blog, addLike }) => {

  if(!blog){
    return null
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes <button onClick={() => addLike(blog)}>like</button></p>
      <p>added by {blog.user.name}</p>
    </div>
  )
}

export default connect(null, { addLike })(BlogObj)
