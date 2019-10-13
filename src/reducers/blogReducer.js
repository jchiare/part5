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

export const addLike = blog => {
  return async dispatch => {
    try {
      await blogService.updateBlog({
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id
      })
      dispatch({
        type:'ADD_LIKE',
        id:blog.id
      })
    }
    catch (e) {
      console.error(e)
    }
  }
}

export const addComment = (comment,id) => {
  return async dispatch => {
    try {
      await blogService.addComment({
        comment,
        id
      })
      dispatch({
        type:'ADD_COMMENT',
        id,
        comment
      })
    }
    catch (e) {
      console.error(e)
    }
  }
}

export const blogReducer = (state = initBlogs, action) => {
  switch(action.type){
  case 'ADD_BLOG':
    return state.concat(action.data)
  case 'INIT_BLOG':
    return action.data
  case 'ADD_LIKE': {
    const blogToChange = state.find(a => a.id === action.id)
    const changedBlog = {
      ...blogToChange,
      likes:blogToChange.likes + 1
    }
    return state.map(blog =>
      blog.id !== action.id ? blog : changedBlog
    )
  }
  case 'ADD_COMMENT': {
    const blogToChange = state.find(a => a.id === action.id)
    const changedBlog = {
      ...blogToChange,
      comments: blogToChange.comments.concat(action.comment.comment)
    }
    return state.map(blog =>
      blog.id !== action.id ? blog : changedBlog
    )
  }
  default:
    return state
  }
}