import React from 'react'
import { connect } from 'react-redux'
import { addLike, addComment } from '../reducers/blogReducer'

const Blog = ({ blog, addLike, addComment }) => {

  if(!blog){
    return null
  }

  const handleSubmit = event => {
    event.preventDefault()
    addComment({ comment:event.target.comment.value },blog.id)
    event.target.comment.value = ''
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <a href={`http://${blog.url}`}>{blog.url}</a>
      <p>{blog.likes} likes <button onClick={() => addLike(blog)}>like</button></p>
      <p>added by {blog.user.name}</p>
      <h4>Comments</h4>
      <form onSubmit={handleSubmit}>
        <input name="comment" type="text" />
        <button> Add Comments</button>
      </form>
      <ul>
        {blog.comments && blog.comments.map((comment,index) => <li key={index}> {comment} </li>)}
      </ul>
    </div>
  )
}

export default connect(null, { addLike, addComment })(Blog)
