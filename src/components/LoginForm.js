import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  username,
  password,
}) => {

  const { reset:userReset, ...userProps } = username
  const { reset:passReset, ...passwordProps } = password

  return (
    <form onSubmit={handleLogin}>
      <h3>Login to application</h3>
      <div>
      username
        <input { ... userProps} />
      </div>
      <div>
      password
        <input { ...passwordProps} />
      </div>
      <button type="submit">login</button>
    </form>
  )}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}

export default LoginForm