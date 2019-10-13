import React from 'react'
import { connect } from 'react-redux'

import { removeToken } from '../reducers/tokenReducer'

const UserAuth = ({ user, removeToken }) => {

  const handleLogout = () => {
    removeToken()
  }

  if (!user){
    return null
  }

  return (
    <div>
      {user} logged in
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

const mapStateToProps = state => {
  const user = state.token && state.token.username
  return {
    user
  }
}

export default connect(mapStateToProps,{ removeToken })(UserAuth)