const express = require('express');
const nightmare = require('../utils/crawler');
const { searchedTerms } = require('../data/temporary');

const router = express.Router();

router.get('/', async (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

router.get('/:search', async (req, res) => {
  const { search } = req.params;
  const isSearched = searchedTerms.find((item) => item.search === search);
  if (isSearched) {
    return res.status(200).json(isSearched.results);
  }
  const url = `https://www.youtube.com/results?search_query=${search}`;
  const results = await nightmare
    .goto(url)
    .wait('div#contents')
    .evaluate(async () => {
      const videosResults = Array.from(document.querySelectorAll('ytd-video-renderer a#video-title'));
      return videosResults.map((e) => (
        { title: e.title, link: e.href, label: e.getAttribute('aria-label') }
      ));
    });
  searchedTerms.push({ search, results });
  return res.status(200).json(results);
});

module.exports = router;
