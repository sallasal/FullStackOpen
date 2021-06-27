const defaultState = {
  type: 'SET-TEXT',
  text: 'Nothing special to notify! What a fine person you are!'
}

const notificationReducer = (state = defaultState, action) => {
  return state
}

export const setNotification = () => {
  return defaultState
}

export default notificationReducer