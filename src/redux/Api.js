
import axios from 'axios';
import API_BASE_URL from './constants'; // Import the base URL


// Create a function for login
const Api = {
  login: async (data) => {
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${API_BASE_URL.mainUrl}/login`, // Construct full URL
      headers: {
        // ...data.getHeaders(),
      },
      data: data,
    };

    const response = await axios.request(config);
    return response.data;
  },
};

export default Api;