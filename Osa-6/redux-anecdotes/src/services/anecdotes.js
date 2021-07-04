import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log('Täällä ollaan')
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  console.log('Object here: ', object)
  const response = await axios.post(baseUrl, object)
  return response.data
}

export default { 
  createNew, 
  getAll 
}