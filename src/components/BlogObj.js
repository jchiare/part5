import React from 'react'
import { connect } from 'react-redux'
import { addLike, addComment } from '../reducers/blogReducer'
import { Button, Icon, Input } from 'semantic-ui-react'

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
      <p>{blog.likes} likes <Button color="red" icon onClick={() => addLike(blog)}><Icon name="like"/></Button></p>
      <p>added by {blog.user.name}</p>
      <h4>Comments</h4>
      <form onSubmit={handleSubmit}>
        <Input name="comment" type="text" />
        <Button secondary> Add Comments</Button>
      </form>
      <ul>
        {blog.comments && blog.comments.map((comment,index) => <li key={index}> {comment} </li>)}
      </ul>
    </div>
  )
}

export default connect(null, { addLike, addComment })(Blog)
