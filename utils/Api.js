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

const addLike = async (movieID, token) => {
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

const getLikes = async (token) => {
  const response = await axios.get("https://data-tinder-back.herokuapp.com/api/preferences", {
    headers: {
      Authorization: token
    }
  }
  );


    console.log(response);
  
  return response.data;
}

export default { getSuggestions, addLike, getLikes }