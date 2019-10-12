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

export const initBlogs = () => {
  return async dispatch => {
    const allBlogs = await blogService.getAll()
    dispatch({
      type:'INIT_BLOG',
      data:allBlogs
    })
  }
}

export const blogReducer = (state = initBlogs, action) => {
  switch(action.type){
  case 'ADD_BLOG':
    return state.concat(action.data)
  case 'INIT_BLOG':
    return action.data
  default:
    return state
  }
}