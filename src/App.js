import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

import {
  Container, Table, Menu, Button,
} from 'semantic-ui-react'
import { LoginForm } from './components/LoginForm'
import RenderBlogs from './components/Blog'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import Notification from './components/Notification'
import Users from './components/Users'
import { User } from './components/User'
import Blog from './components/BlogObj'


import { initToken, removeToken } from './reducers/tokenReducer'
import { initBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/usersReducer'


const order = (a, b) => (a.likes > b.likes ? -1 : (a.likes > b.likes ? 1 : 0))

const Header = ({ user, removeToken }) => (
  <Menu inverted>
    <Menu.Item link>
      <Link to="/">Blogs </Link>
    </Menu.Item>
    <Menu.Item link>
      <Link to="/users">Users</Link>
    </Menu.Item>
    <Menu.Item>
      <span>
        {user}
        {' '}
logged in
        {' '}
      </span>
    </Menu.Item>
    <Button onClick={() => removeToken()}>logout</Button>
  </Menu>
)

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
      <Table striped celled>
        <Table.Body>
          {blogs && blogs.sort(order).map((blog) => (
            <Table.Row key={blog.id}>
              <Table.Cell>
                <RenderBlogs
                  key={blog.id}
                  blog={blog}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>


    </div>
  )
}

const App = ({
  initToken, initBlogs, initUsers, removeToken, blogs, token, users,
}) => {
  useEffect(() => {
    initToken()
  }, [initToken])

  useEffect(() => {
    initBlogs()
  }, [initBlogs])

  useEffect(() => {
    initUsers()
  }, [initUsers])

  const propById = (id, prop) => prop && prop.find((p) => p.id === id)

  return (
    <Router>
      <Container>
        <div className="App">
          <Notification />
          {token && token.name
            ? (
              <div>
                <Header removeToken={removeToken} user={token.name} />
                <h3>Blogs</h3>
                <Route
                  exact
                  path="/"
                  render={() => <Blogs blogs={blogs} />}
                />
                <Route exact path="/users" render={() => <Users />} />
                <Route
                  exact
                  path="/users/:id"
                  render={({ match }) => <User user={propById(match.params.id, users)} />}
                />
                <Route
                  exact
                  path="/blogs/:id"
                  render={({ match }) => <Blog blog={propById(match.params.id, blogs)} />}
                />
              </div>
            )
            : <LoginForm />}
        </div>
      </Container>
    </Router>
  )
}

const mapStateToProps = (state) => (
  // Wait for blogs to load
  {
    blogs: typeof state.blogs === 'function' ? null : state.blogs,
    notification: state.notification,
    token: state.token,
    users: typeof state.users === 'function' ? null : state.users,
  }
)


const mapDispatchToProps = {
  initToken,
  initBlogs,
  initUsers,
  removeToken,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
