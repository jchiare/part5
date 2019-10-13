import { getAllUsers } from '../services/users'

export const initUsers = () => {
  return async dispatch => {
    const users = await getAllUsers()
    dispatch({
      type:'INIT_USERS',
      users
    })
  }
}


const reducer = (state = initUsers, action) => {
  switch(action.type){
  case 'INIT_USERS':
    return action.users
  default:
    return state
  }
}

export default reducer