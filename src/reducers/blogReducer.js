import blogService from '../services/blogs'

export const addBlog = data => {
  return async dispatch => {
    const newBlog = await blogService.createBlog(data)
    dispatch({
      type:'ADD_BLOG',
      data:newBlog
    })
  }
}

export const blogReducer = (state = [], action) => {
  switch(action.type){
  case 'ADD_BLOG':
    return state.concat(action.data)
  default:
    return state
  }
}