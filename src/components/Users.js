import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


const Users = ({ users }) => {

  if(!users){
    return null
  }

  return(
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user.id}>
                <td><Link to={`users/${user.id}`}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            )})}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = ({ users }) => {
  if (typeof users === 'function'){
    return { users: null }
  } else {
    return { users }
  }

}

export default connect(mapStateToProps)(Users)