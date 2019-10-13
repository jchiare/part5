import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

import { LoginForm } from './components/LoginForm'
import RenderBlogs from './components/Blog'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import Notification from './components/Notification'
import Users from './components/Users'
import { User } from './components/User'
import Blog from './components/BlogObj'

import { initToken } from './reducers/tokenReducer'
import { initBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/usersReducer'
import { removeToken } from './reducers/tokenReducer'

const order = (a, b) => {
  return a.likes > b.likes ? -1 : (a.likes > b.likes ? 1 : 0)
}

const headerStyle = {
  backgroundColor:'lightgrey',
  display:'inline-block',
  padding:'0.3rem'
}

const Header = ({ user, removeToken }) => {
  return (
    <div style={headerStyle}>
      <Link to={'/'}>Blogs </Link>
      <Link to={'/users'}>Users</Link>
      <span>{user} logged in </span>
      <button onClick={() => removeToken()}>logout</button>

    </div>
  )
}

const Blogs = ({ blogs }) => {
  const blogFormRef = React.createRef()
  return (
    <div>
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
    </div>)
}

const App = ({ initToken, initBlogs, initUsers, removeToken, blogs, token, users }) => {

  useEffect(() => {
    initToken()
  },[initToken])

  useEffect(() => {
    initBlogs()
  },[initBlogs])

  useEffect(() => {
    initUsers()
  },[initUsers])

  const propById = (id,prop) => prop && prop.find(p => p.id === id)

  return (
    <Router>
      <div className="App">
        <Notification />
        {token && token.name ?
          <div>
            <Header removeToken={removeToken}/>
            <h3>Blogs</h3>
            <Route exact path="/" render={() =>
              <Blogs blogs={blogs} />
            } />
            <Route exact path="/users" render={() => <Users />}/>
            <Route exact path="/users/:id" render={({ match }) =>
              <User user={propById(match.params.id,users)} />}
            />
            <Route exact path="/blogs/:id" render={({ match }) =>
              <Blog blog={propById(match.params.id,blogs)} />}
            />
          </div>
          : <LoginForm />
        }
      </div>
    </Router>
  )
}

const mapStateToProps = state => {
  // Wait for blogs to load
  return {
    blogs: typeof state.blogs === 'function' ? null : state.blogs,
    notification: state.notification,
    token: state.token,
    users : typeof state.users === 'function' ? null : state.users
  }
}

const mapDispatchToProps = {
  initToken,
  initBlogs,
  initUsers,
  removeToken
}

export default connect(mapStateToProps, mapDispatchToProps)(App)