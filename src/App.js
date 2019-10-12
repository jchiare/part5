import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { LoginForm } from './components/LoginForm'
import RenderBlogs from './components/Blog'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import Notification from './components/Notification'
import User from './components/User'

import { initToken } from './reducers/tokenReducer'
import { initBlogs } from './reducers/blogReducer'

const order = (a, b) => {
  return a.likes > b.likes ? -1 : (a.likes > b.likes ? 1 : 0)
}

const App = ({ initToken, initBlogs, blogs, user }) => {

  const blogFormRef = React.createRef()

  useEffect(() => {
    initToken()
  },[initToken])

  useEffect(() => {
    initBlogs()
  },[initBlogs])

  return (
    <div className="App">
      <Notification />
      {user === null ?
        <LoginForm />
        : <div>
          <User
            user={user}
          />
          <Toggleable
            buttonLabel="New Blog"
            ref={blogFormRef}
          >
            <BlogForm />
          </Toggleable>
          {blogs && blogs.sort(order).map(blog => <RenderBlogs
            key={blog.id}
            blog={blog}
          />
          )}
        </div>
      }
    </div>
  )
}

const mapStateToProps = state => {
  const user = state.token && state.token.user
  // Wait for blogs to load
  if (typeof state.blogs === 'function'){
    return {
      blogs: null,
      notification: state.notification,
      user
    }
  } else {
    return {
      blogs: state.blogs,
      notification: state.notification,
      user
    }
  }

}

export default connect(mapStateToProps, { initToken, initBlogs })(App)