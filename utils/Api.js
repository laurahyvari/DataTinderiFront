import axios from 'axios'
import firebase from '../config/Firebase'

axios.defaults.baseURL = 'https://data-tinder-back.herokuapp.com'

// axios.defaults.baseURL = "http://localhost:5000"

const getToken = async () => {
  const token = firebase.auth().currentUser.getIdToken()

  return token
}

const getSuggestions = async (count) => {
  const token = await getToken()
  const response = await axios.get(`/api/suggestions/${count}`, {
    headers: {
      Authorization: token
    }
  }
  )
  return response.data
}

const addVote = async (Id, type, vote) => {
  const token = await getToken()
  console.log(Id, type, vote)
  const response = await axios.post('api/votes/', {
    programId: Id,
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

/* const addLike = async (id) => {
  const token = await getToken()
  const response = await axios.post('api/list/', {
    programId: id
  }, {
    headers: {
      Authorization: token
    }
  })
  return response.data
} */

const getLikes = async () => {
  const token = await getToken()
  const response = await axios.get('api/votes', {
    headers: {
      Authorization: token
    }
  }
  )
  return response.data
}

export default { getSuggestions, addVote, getLikes }
