const fetchApi = async () => {
  console.log('fetchApi');
  const response = await fetch('http://localhost:3001/search/music/britney');
  const data = await response.json();
  return data;
}

export default fetchApi;
