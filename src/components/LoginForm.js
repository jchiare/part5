import React from 'react'
import { connect } from 'react-redux'

import { Button, Form } from 'semantic-ui-react'

import { addToken } from '../reducers/tokenReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginFormComponent = ({ addToken, setNotification }) => {

  const onLoginAttempt = async event => {
    event.preventDefault()
    const { username, password } = event.target
    const formattedObject = {
      username:username.value,
      password:password.value
    }
    try {
      await addToken(formattedObject)
      username.value = ''
      password.value = ''
    } catch (e) {
      console.error(e)
      setNotification('Invalid email or password','red')
    }
  }

  return (
    <Form onSubmit={onLoginAttempt}>
      <h3>Login to application</h3>
      <Form.Field>
        <div>
      username
          <input name="username" />
        </div>
      </Form.Field>
      <Form.Field>
        <div>
      password
          <input name="password" type="password"/>
        </div>
      </Form.Field>
      <Button type="submit">login</Button>
    </Form>
  )}

const mapDispatchToProps = {
  addToken,
  setNotification
}

export const LoginForm = connect(null,mapDispatchToProps)(LoginFormComponent)