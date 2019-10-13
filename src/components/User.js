import React from 'react'

const User = ({ user }) => {

  if (!user){
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <ul>
        {user.blogs.length > 0 ?
          user.blogs.map(blog => {return <li key={blog.id}>{blog.title}</li>})
          : <p>No blogs associated with user</p>
        }
      </ul>
    </div>
  )
}

export { User }