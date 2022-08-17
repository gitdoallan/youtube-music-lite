import { useEffect, useState } from 'react';
import fetchApi from './services/api';

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchApi().then((data) => {
      setData(data);
      setLoading(false);
    }).catch(err => {
      console.log(err);
    });
  } , []);

  return (
    <div>
      { loading
      ? 'Loading...'
      : data.map(( item, index) => (
        <div key={index}>
          { item.songName }
          {' - '}
          { item.artistName }
        </div>
      ))}
    </div>
  );
}

export default App;
