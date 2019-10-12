import React from 'react'
import { connect } from 'react-redux'

import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogFormComponent = ({
  addBlog,
  token,
  setNotification
}) => {

  const onBlogSubmitted = async event => {
    event.preventDefault()
    const { title, author, url } = event.target
    const formattedObject = {
      title:title.value,
      author:author.value,
      url:url.value,
      token:token.token
    }
    try{
      await addBlog(formattedObject)
      setNotification(`Added ${title.value} by ${author.value}`,'green')
      title.value = ''
      author.value = ''
      url.value = ''
    } catch(e){
      setNotification(`Added ${title.value} by ${author.value}`,'red')
    }

  }

  return (
    <div>
      <h3>Create New Blog</h3>
      <form onSubmit={onBlogSubmitted}>
        <div>
          Title:
          <input
            name="title"
          />
        </div>
        <div>
          Author:
          <input
            name="author"
          />
        </div>
        <div>
          URL:
          <input
            name="url"
          />
        </div>
        <button type="submit">Create blog</button>
      </form>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    token: state.token
  }
}

const mapDispatchToProps = {
  addBlog,
  setNotification
}

export default connect(mapStateToProps,mapDispatchToProps)(BlogFormComponent)