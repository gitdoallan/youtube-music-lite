const express = require('express');
const nightmare = require('../utils/crawler');

const router = express.Router();

router.get('/', async (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

router.get('/demo', (_req, res) => {
  nightmare
    .goto('https://search.brave.com/')
    .type('#searchbox', 'youtube')
    .click('#submit-button')
    .wait('#results a')
    .evaluate(
      () => document.querySelector('#results a').href,
    )
    .end()
    .then((link) => {
      res.status(200).json({ 'Link Returned': link });
    })
    .catch((error) => {
      res.status(500).json({ 'Search failed': error });
    });
});

module.exports = router;
