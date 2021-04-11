import axios from 'axios'

const getSuggestions = async (count, token) => {
  const response = await axios.get(`https://data-tinder-back.herokuapp.com/api/suggestions/${count}`, {
    headers: {
      Authorization: token
    }
  }
  )
  return response.data
}

const addVote = async (movieID, type, vote, token) => {
  const response = await axios.post('https://data-tinder-back.herokuapp.com/api/votes/', {
    program_id: movieID,
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
  const response = await axios.get('https://data-tinder-back.herokuapp.com/api/preferences', {
    headers: {
      Authorization: token
    }
  }
  )
  return response.data
}

export default { getSuggestions, addVote, getLikes }
