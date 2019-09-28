import React, { useState } from 'react'
import blogService from '.././services/blogs'

const RenderBlogs = ({ blog, token }) => {
  const [visibility, setVisibility] = useState(false)
  const [likesValue, setLikes] = useState(blog.likes)

  const { title, author, url, user, id } = blog
  const userMatches = user && (user.username === JSON.parse(window.localStorage.getItem('blogUser')).username)

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
    const confirm = window.confirm(`Remove ${title} by ${author}`)
    if(confirm){
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
      <div className="defaultInfo"onClick={toggleVisibility}>
        <p>{title} {author}</p>
      </div>
      <span className="extraInfo" style={visibilityStyle} >
        <p>{url}</p>
        <p>{likesValue} <button onClick={() => updateBlog()}>likes</button></p>
        <p>{user && user.name}</p>
        {userMatches && <button onClick={() => deleteBlog()}>remove</button>}

      </span>
    </div>
  )
}

export default RenderBlogs