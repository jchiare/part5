import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import RenderBlogs from './components/Blog'
import { BlogForm } from './components/BlogForm'
import Toggleable from './components/Toggleable'
import { useField } from './hooks/index'
import './App.css'

const ErrorNotification = ({ message }) => {
  if (!message){
    return null
  }
  return (
    <div className="error">
      <p>{message}</p>
    </div>
  )
}

const SuccessNotification = ({ message }) => {
  if (!message){
    return null
  }
  return (
    <div className="success">
      <p>{message}</p>
    </div>
  )
}

const User = ({ user, handleLogout }) => {
  return (
    <div>
      <h3>Blogs</h3>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

const order = (a, b) => {
  return a.likes > b.likes ? -1 : (a.likes > b.likes ? 1 : 0)
}

function App() {
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  const loginUsername = useField('text')
  const loginPassword = useField('password')

  const blogTitle = useField('text')
  const blogAuthor = useField('text')
  const blogUrl = useField('text')


  const blogFormRef = React.createRef()

  const handleLogout = () => {
    window.localStorage.removeItem('blogUser')
    setToken(null)
    setUser(null)
    setSuccessMessage('Successfully logged out')
    setTimeout(() => setSuccessMessage(null),5000)
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const username = loginUsername.value
      const password = loginPassword.value

      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem(
        'blogUser', JSON.stringify(user)
      )
      setUser(user)
      setToken(user.token)

      setSuccessMessage(`User ${user.name} successfully logged in`)
      setTimeout(() => setSuccessMessage(null),5000)
    } catch (error){
      setErrorMessage(`Error: ${error.response.data.error}`)
      setTimeout(() => setErrorMessage(null),5000)
    }
  }

  const createBlog = async event => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    try {
      const title = blogTitle.value
      const author = blogAuthor.value
      const url = blogUrl.value

      const blog = await blogService.createBlog({
        title,
        author,
        url,
        token
      })
      setBlogs([...blogs].concat(blog))
      blogTitle.reset()
      blogAuthor.reset()
      blogUrl.reset()
      setSuccessMessage(`Successfully added ${blog.title}`)
      setTimeout(() => setSuccessMessage(null),5000)
    } catch (error){
      setErrorMessage(JSON.stringify(error))
      setTimeout(() => setErrorMessage(null),5000)
    }
  }

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs([...blogs].sort((a,b) => a - b)))
      .catch(error => console.log(error))
  },[user])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('blogUser')
    if (loggedInUser){
      const user = JSON.parse(loggedInUser)
      setUser(user)
      setToken(user.token)
    }
  },[])

  return (
    <div className="App">
      <ErrorNotification message={errorMessage}/>
      <SuccessNotification message={successMessage} />
      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          username={loginUsername}
          password={loginPassword}
        />:
        <div>
          <User
            user={user}
            handleLogout={handleLogout}
          />
          <Toggleable
            buttonLabel="New Blog"
            ref={blogFormRef}
          >
            <BlogForm
              title={blogTitle}
              author={blogAuthor}
              url={blogUrl}
              createBlog={createBlog}
            />
          </Toggleable>
          {blogs.sort(order).map(blog => <RenderBlogs
            key={blog.id}
            blog={blog}
            token={token}
          />
          )}
        </div>
      }
    </div>
  )
}

export default App
