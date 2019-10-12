const reducer = (state = '', action) => {
  if (action.type === 'SET_NOTIFICATION') {
    return {
      content: action.content,
      color: action.color
    }
  } else if (action.type === 'CLEAR_NOTIFICATION') {
    return ''
  }
  return state
}

export const setNotification = (content,color) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      content,
      color
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      })
    }, 5000)
  }

}

export const clearNotification = () => (
  {
    type: 'CLEAR_NOTIFICATION'
  }
)

export default reducer