import axios from 'axios'

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

export default { getSuggestions }