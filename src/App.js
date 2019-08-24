import React, { useState, useEffect } from 'react';
import loginService from './services/login'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import RenderBlogs from './components/Blog'
import BlogForm from './components/BlogForm'
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

const User = ({ user, handleLogout}) => {
  return (
    <div>
      <h3>Blogs</h3>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

function App() {
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleLogout = () => {    
    window.localStorage.removeItem('blogUser')
    setToken(null)
    setUser(null)
    setSuccessMessage("Successfully logged out")
    setTimeout(() => setSuccessMessage(null),5000)
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem(
        'blogUser', JSON.stringify(user)
      ) 
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
    try {
      const blog = await blogService.createBlog({
        title,
        author,
        url,
        token
      })
      setBlogs([...blogs].concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')
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
      .then(blogs => setBlogs([...blogs]))
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
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />:
        <div>
          <User 
            user={user}
            handleLogout={handleLogout}
          />
          <BlogForm 
            setTitle={setTitle} 
            setAuthor={setAuthor}
            setUrl={setUrl}
            title={title}
            author={author}
            url={url}
            createBlog={createBlog}
          />
          <RenderBlogs blogs={blogs}/>
        </div>
      }
    </div>
  );
}

export default App;
