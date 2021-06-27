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

export const setNotification = (notificationText) => {
  return {
    type: 'SET-TEXT',
    data: notificationText
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE',
    data: null
  }
}

export default notificationReducer