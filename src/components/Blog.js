import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const RenderBlogs = ({ blog }) => {

  const { title, author, id } = blog

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <Link to={`blogs/${id}`}>{title} {author}</Link>
    </div>
  )
}

export default connect(null, null)(RenderBlogs)