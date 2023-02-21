import axios from 'axios';

const client = axios.create({
  baseURL: 'https://api.outsidein.dev/fK671Jzf3s96951pnQ4ijuvSnp6Yr55e',
});

const api = {
  async loadRestaurants() {
    const response = await client.get('/restaurants');
    return response.data;
  },
};

export default api;
