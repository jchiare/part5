import login from '../services/login'

export const addToken = (credentials) => async (dispatch) => {
  const newToken = await login(credentials)
  dispatch({
    type: 'ADD_TOKEN',
    data: newToken,
  })
}

export const initToken = () => async (dispatch) => {
  const loggedInUser = window.localStorage.getItem('blogUser')
  if (loggedInUser) {
    dispatch({
      type: 'INIT_TOKEN',
      data: JSON.parse(loggedInUser),
    })
  } else {
    dispatch({
      type: 'INIT_TOKEN',
      data: null,
    })
  }
}

export const removeToken = () => (dispatch) => dispatch({
  type: 'REMOVE_TOKEN',
})

export const tokenReducer = (state = null, action) => {
  switch (action.type) {
  case 'ADD_TOKEN':
    window.localStorage.setItem(
      'blogUser', JSON.stringify(action.data),
    )
    return action.data
  case 'INIT_TOKEN':
    return action.data
  case 'REMOVE_TOKEN':
    window.localStorage.removeItem('blogUser')
    return action
  default:
    return state
  }
}
