import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentSong } from '../redux/slicers/currentSong';

export default function SearchResults() {
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.searchResults);
  const loading = useSelector((state) => state.loadingResults);
  return (
    <div>
      { loading
        ? 'Loading...'
        : searchResults.map((item) => (
          <div key={item.searchPosition}>
            { item.songName }
            {' - '}
            { item.artistName }
            {' - '}
            <button
              type="button"
              onClick={() => (dispatch(setCurrentSong(item.songId)))}
            >
              Play Song
            </button>
          </div>
        ))}
    </div>
  );
}
