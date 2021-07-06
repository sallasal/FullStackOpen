
import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const notification = props.notifications
  //console.log('notification: ', notification)

  if (notification.text === null) {
    return (
      <br />
    )
  }

  return (
    <div style={style}>
      { notification.text }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification