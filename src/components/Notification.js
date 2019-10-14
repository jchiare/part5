import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = (props) => {

  if (!props.notification) {
    return null
  }

  const { color } = props.notification

  if (color === 'red'){
    return (
      <Message negative>
        <Message.Header>{props.notification.content}</Message.Header>
      </Message>
    )
  } else if (color === 'green'){
    return (
      <Message positive>
        <Message.Header>{props.notification.content}</Message.Header>
      </Message>
    )
  }


}

const mapStateToProps = (state) => ({
  notification: state.notification
})

export default connect(
  mapStateToProps
)(Notification)