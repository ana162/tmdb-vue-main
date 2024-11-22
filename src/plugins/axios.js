import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDY4MGI4ODQ5YzNhMmJlYjc5NzI0ZTFhMWFhYmU1MyIsIm5iZiI6MTczMTUwODQ4MS41ODczOTgzLCJzdWIiOiI2NmZkNWE2MDI1YjYxYzMzZGE1OTVmNGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.fwfC98f0SjxQKRuuy4aOGdEWV_XOHMkgRL9Eloby9MM`,
  },
});

export default api;