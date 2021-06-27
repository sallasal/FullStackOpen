
import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const notification = useSelector(state => state.notifications)
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

export default Notification