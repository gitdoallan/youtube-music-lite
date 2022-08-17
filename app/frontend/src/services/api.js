import axios from 'axios';

const fetchApi = async (search) => {
  const url = 'http://localhost:3001/search/';
  const { data } = await axios.post(url, { search });
  return data;
};

export default fetchApi;
