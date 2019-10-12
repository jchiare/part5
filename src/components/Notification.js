import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    color: props.notification.color,
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  if (!props.notification) {
    return null
  }

  return (
    <div style={style}>
      {props.notification.content}
    </div>
  )
}

const mapStateToProps = (state) => ({
  notification: state.notification
})

export default connect(
  mapStateToProps
)(Notification)