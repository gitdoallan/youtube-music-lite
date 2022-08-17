import React, { useEffect, useState } from 'react';
import fetchApi from './services/api';

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const apiResponse = await fetchApi(search);
      setData(apiResponse);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">
          <input
            id="search"
            type="text"
            value={search}
            placeholder="Busque por um artista, música ou álbum"
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <button type="submit">Buscar</button>
      </form>
      { loading
        ? 'Loading...'
        : data.map((item) => (
          <div key={item.searchPosition}>
            { item.songName }
            {' - '}
            { item.artistName }
          </div>
        ))}
    </div>
  );
}

export default App;
