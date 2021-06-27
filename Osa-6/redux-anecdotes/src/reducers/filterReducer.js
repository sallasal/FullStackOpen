const defaultState = {
  filterText: ''
}

const filterReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'SET-FILTER':
      return {
        filterText: action.data
      }
    default: return state
  }
}

export const setFilter = (filterText) => {
  return {
    type: 'SET-FILTER',
    data: filterText
  }
}

export default filterReducer