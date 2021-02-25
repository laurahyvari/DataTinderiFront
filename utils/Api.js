import axios from 'axios'


const getSuggestions = async (count) => {
  const response = await axios.get(`https://data-tinder-back.herokuapp.com/api/programs/${count}`)
  return response.data
}

export default { getSuggestions }