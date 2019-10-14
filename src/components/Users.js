import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'


const Users = ({ users }) => {
  if (!users) {
    return null
  }

  return (
    <div>
      <h2>Users</h2>
      <Table striped celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>Blogs Created</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((user) => (
            <Table.Row key={user.id}>
              <Table.Cell><Link to={`users/${user.id}`}>{user.name}</Link></Table.Cell>
              <Table.Cell>{user.blogs.length}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

const mapStateToProps = ({ users }) => {
  if (typeof users === 'function') {
    return { users: null }
  }
  return { users }
}

export default connect(mapStateToProps)(Users)
