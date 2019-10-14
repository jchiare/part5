import React from 'react'
import { connect } from 'react-redux'

import { Form, Button, Input } from 'semantic-ui-react'

import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogFormComponent = ({
  addBlog,
  token,
  setNotification,
}) => {
  const onBlogSubmitted = async (event) => {
    event.preventDefault()
    const { title, author, url } = event.target
    const formattedObject = {
      title: title.value,
      author: author.value,
      url: url.value,
      token: token.token,
    }
    try {
      await addBlog(formattedObject)
      setNotification(`Added ${title.value} by ${author.value}`, 'green')
      title.value = ''
      author.value = ''
      url.value = ''
    } catch (e) {
      setNotification(`Added ${title.value} by ${author.value}`, 'red')
    }
  }

  return (
    <div>
      <h3>Create New Blog</h3>
      <Form onSubmit={onBlogSubmitted}>
        <Form.Field>
          <div>
          Title:
            <Input
              name="title"
            />
          </div>
        </Form.Field>
        <Form.Field>
          <div>
          Author:
            <Input
              name="author"
            />
          </div>
        </Form.Field>
        <Form.Field>
          <div>
          URL:
            <Input
              name="url"
            />
          </div>
        </Form.Field>
        <Button primary type="submit">Create blog</Button>
      </Form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  token: state.token,
})

const mapDispatchToProps = {
  addBlog,
  setNotification,
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogFormComponent)
