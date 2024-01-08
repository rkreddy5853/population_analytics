// api.js
const axios = require('axios');

const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:3001/ountries'); // Replace with your API endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching data from server:', error);
    throw error; // Throw the error to handle it in the calling component
  }
};

module.exports = { fetchData };
