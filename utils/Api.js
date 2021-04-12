import axios from 'axios'

// const devUrl = "http://localhost:5000"
const url = 'https://data-tinder-back.herokuapp.com'
const getSuggestions = async (count, token) => {
  const response = await axios.get(`${url}/api/suggestions/${count}`, {
    headers: {
      Authorization: token
    }
  }
  )
  return response.data
}

const addVote = async (Id, type, vote, token) => {
  console.log(Id, type, vote)
  const response = await axios.post(`${url}/api/votes/`, {
    program_id: Id,
    type: type,
    value: vote
  }, {
    headers: {
      Authorization: token
    }
  }
  )
  return response.data
}

const getLikes = async (token) => {
  const response = await axios.get(`${url}/api/votes`, {
    headers: {
      Authorization: token
    }
  }
  )
  return response.data
}

export default { getSuggestions, addVote, getLikes }
