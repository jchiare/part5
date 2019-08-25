import React, { useState } from 'react'
import blogService from '.././services/blogs'

const RenderBlogs = ({ blog, token }) => {
  const [visibility, setVisibility] = useState(false)
  const [likesValue, setLikes] = useState(blog.likes)
  //const [showDeleteButton, setShowDeleteButton] = useState(null)

  const { title, author, url, user, id } = blog
  const userMatches = (user.username === JSON.parse(window.localStorage.getItem('blogUser')).username)

  const visibilityStyle = {
    display: visibility ? '': 'none'
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  const updateBlog = () => {
    blogService
      .updateBlog({
        title,
        url,
        author,
        likes: likesValue + 1,
        id,
        user: user.id
      })
      .then(() => setLikes(likesValue + 1))
      .catch(err => console.log(err))
  }

  const deleteBlog = () => {
    const cont = window.confirm(`Remove ${title} by ${author}`)
    if(cont){
      blogService
        .deleteBlog({
          id,
          token
        })
        .then(() => toggleVisibility())
        .catch(err => console.log(err))
    }

  }


  return (
    <div style={blogStyle}>
      <div onClick={toggleVisibility}>
        <p>{title} {author}</p>
      </div>
      <span style={visibilityStyle} >
        <p>{url}</p>
        <p>{likesValue} <button onClick={() => updateBlog()}>likes</button></p>
        <p>{user.name}</p>
        {userMatches && <button onClick={() => deleteBlog()}>remove</button>}

      </span>
    </div>
  )
}

export default RenderBlogs