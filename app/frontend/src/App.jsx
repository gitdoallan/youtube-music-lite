import React from 'react';
import { Provider } from 'react-redux';
import Player from './components/Player';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <SearchBar />
        <SearchResults />
        <Player />
      </div>
    </Provider>
  );
}

export default App;
