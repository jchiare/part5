import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, withRouter, Link, Route } from 'react-router-dom'

import { LoginForm } from './components/LoginForm'
import RenderBlogs from './components/Blog'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import Notification from './components/Notification'
import UserAuth from './components/UserAuth'
import Users from './components/Users'
import { User } from './components/User'
import BlogObj from './components/BlogObj'

import { initToken } from './reducers/tokenReducer'
import { initBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/usersReducer'

const order = (a, b) => {
  return a.likes > b.likes ? -1 : (a.likes > b.likes ? 1 : 0)
}

const OldPage = ({ blogs }) => {
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

const App = ({ initToken, initBlogs, initUsers, blogs, user, users }) => {

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
        {user === null ?
          <LoginForm />
          : <div>
            <UserAuth
              user={user}
            />
            <Route exact path="/" render={() =>
              <OldPage blogs={blogs} />
            } />
            <Route exact path="/users" render={() => <Users />}/>
            <Route exact path="/users/:id" render={({ match }) =>
              <User user={propById(match.params.id,users)} />}
            />
            <Route exact path="/blogs/:id" render={({ match }) =>
              <BlogObj blog={propById(match.params.id,blogs)} />}
            />
          </div>
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
    user: state.token && state.token.user,
    users : typeof state.users === 'function' ? null : state.users
  }
}


export default connect(mapStateToProps, { initToken, initBlogs, initUsers })(App)