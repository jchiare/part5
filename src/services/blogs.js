import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async ({ title, url, author, token }) => {
  const data = {
    title,
    url,
    author
  }

  const config = {
    headers: {
      Authorization: `bearer ${token}`
    }
  }

  const response = await axios.post(baseUrl, data, config)
  return response.data
}

export default { 
  getAll,
  createBlog
}