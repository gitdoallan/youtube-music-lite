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
      : data.map((item, index) => (
        <div key={index}>
          <h1>{item.title}</h1>
          <p>{item.label}</p>
          <a href={item.link}>{item.link}</a>
          </div>
      ))}
    </div>
  );
}

export default App;
