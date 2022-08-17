const express = require('express');
const nightmare = require('../utils/crawler');
const { videosSearched, songsSearched } = require('../data/temporary');

const router = express.Router();

router.post('/', async (req, res) => {
  const { search } = req.body;
  const isSearched = songsSearched.find((item) => item.search === search);
  if (isSearched) {
    return res.status(200).json(isSearched.results);
  }
  const url = `https://music.youtube.com/search?q=${search}`;
  const results = await nightmare
    .goto(url)
    .wait('[title="Show song results"] yt-formatted-string')
    .click('[title="Show song results"] yt-formatted-string')
    .wait('a[title="Clear filters"]')
    .evaluate(() => {
      const songResults = Array.from(document.querySelectorAll('ytmusic-responsive-list-item-renderer a'));
      let i = 0;
      const reduce = songResults.reduce((acc, curr, index, array) => {
        if (i === index && index !== array.length - 2) {
          acc = [
            ...acc, {
              searchPosition: index + 1,
              songId: curr.href.replace('https://music.youtube.com/watch?v=', ''),
              songName: curr.innerText,
              artistId: array[i + 1].href.replace('https://music.youtube.com/channel/', ''),
              artistName: array[i + 1].innerText,
              albumName: array[i + 2].href.includes('channel') ? array[i + 3].innerText : array[i + 2].innerText,
              albumId: array[i + 2].href.includes('channel') ? array[i + 3].href.replace('https://music.youtube.com/browse/', '') : array[i + 2].href.replace('https://music.youtube.com/browse/', ''),
            }];
          i += 3;
        }
        return acc;
      }, []);
      return reduce;
    });
  songsSearched.push({ search, results });
  return res.status(200).json(results);
});

router.get('/youtube/:search', async (req, res) => {
  const { search } = req.params;
  const isSearched = videosSearched.find((item) => item.search === search);
  if (isSearched) {
    return res.status(200).json(isSearched.results);
  }
  const url = `https://www.youtube.com/results?search_query=${search}`;
  const results = await nightmare
    .goto(url)
    .wait('div#contents')
    .evaluate(() => {
      const videosResults = Array.from(document.querySelectorAll('ytd-video-renderer a#video-title'));
      return videosResults.map((e) => (
        { title: e.title, link: e.href, label: e.getAttribute('aria-label') }
      ));
    });
  videosSearched.push({ search, results });
  return res.status(200).json(results);
});

module.exports = router;
