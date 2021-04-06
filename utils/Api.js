import axios from 'axios'


// Nopea setti, joka lähettää tykkäykset backendin kautta firebaseen

const getSuggestions = async (count, token) => {
  console.log(token);
  const response = await axios.get(`https://data-tinder-back.herokuapp.com/api/suggestions/${count}`, {
    headers: {
      Authorization: token
    }
  }
  )
  return response.data
}

const addLike = async (movieID, token) => {
  console.log(movieID, token);
  const response = await axios.post("https://data-tinder-back.herokuapp.com/api/preferences/", {
    "program_id": movieID,
    "swipe": 1
  }, {
    headers: {
      Authorization: token
    }
  },

  )
  return response.data;
}

export default { getSuggestions, addLike }