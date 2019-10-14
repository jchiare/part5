import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const RenderBlogs = ({ blog }) => {
  const { title, author, id } = blog

  return (
    <Link to={`blogs/${id}`}>
      {title}
      {' '}
      {author}
    </Link>
  )
}

export default connect(null, null)(RenderBlogs)
