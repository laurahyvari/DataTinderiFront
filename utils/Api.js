import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

axios.defaults.baseURL = 'https://neksu.vps.webdock.io'
// axios.defaults.baseURL = 'http://localhost:5000'

const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('uuid')
    return value
  } catch (err) {
    console.log(err.message)
  }
}

const getSuggestions = async (count) => {
  try {
    const token = await getToken()
    const response = await axios.get(`/api/suggestions/${count}`, {
      headers: {
        Authorization: token.toString()
      }
    }
    )
    return response.data
  } catch (err) {
    console.log(err.message)
  }
}

const addVote = async (Id, type, vote) => {
  const token = await getToken()
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

const getPopularPrograms = async () => {
  const token = await getToken()
  const response = await axios.get('api/popular', {
    headers: {
      Authorization: token
    }
  }
  )
  return response.data
}

const getRecommendations = async () => {
  const token = await getToken()
  const response = await axios.get('api/recommendations', {
    headers: {
      Authorization: token
    }
  }
  )
  return response.data
}

const getSimilarPrograms = async (id) => {
  try {
    const token = await getToken()
    const response = await axios.get(`api/recommendations/programId/${id}`, {
      headers: {
        Authorization: token
      }
    }
    )
    return response.data
  } catch (err) {
    console.log(err.message)
  }
}

export default { getSuggestions, addVote, getLikes, getPopularPrograms, getRecommendations, getSimilarPrograms }
