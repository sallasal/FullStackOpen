const defaultState = {
  text: null
}

const notificationReducer = (state = defaultState, action) => {
  //console.log('State in notification reducer now ', state)
  //console.log('action', action)
  switch(action.type) {
    case 'SET-TEXT':
      return {
        text: action.data
      }
    case 'REMOVE':
      return {
        text: null
      }
    default: return state
  }

}

let timeout

export const setNotification = (notificationText, timeoutTime) => {
  if (timeout) {
    clearTimeout(timeout)
  }
  return async dispatch => {
    dispatch({
        type: 'SET-TEXT',
        data: notificationText
    })
    timeout = setTimeout(() => {
      dispatch(removeNotification())
    },timeoutTime)
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE',
    data: null
  }
}

export default notificationReducer