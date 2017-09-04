'use strict';

const debug = require('debug')('server:api');
const express = require('express');
const router = express.Router();
const { getLatest } = require('../../lib/sst');
const twitter = require('../../lib/twitter');

class Cache {
  constructor(res = null) {
    this.response = res;
  }

  set(res) {
    this.response = res;
  }

  get() {
    return this.response;
  }

  clear() {
    this.set(null);
  }

  hasCache() {
    return this.response != null;
  }
}

const cache = new Cache();

router.get('/news', async (req, res, next) => {
  try {
    const ignorePreformatted = req.get('Ignore-Pre');
    const isProduction = process.env.NODE_ENV === 'production';

    if (!ignorePreformatted && cache.hasCache() && !isProduction) {
      const latest = cache.get();

      debug('Responding with cached response');
      return res.status(200).json(Object.assign({}, { cached: true }, latest));
    }

    const latest = await getLatest();
    cache.set(latest);

    debug('Responding with fetched response');
    return res.status(200).json(Object.assign({}, { cached: false }, latest));
  } catch (e) {
    debug(`Error: ${e.message}`);
    res.status(500).json({ message: e.message });
  }
});

router.get('/twitter', async (req, res, next) => {
  try {
    const tweets = await twitter();
    return res.status(200).json({ tweets });
  } catch (e) {
    return res
      .status(e.code || e.statusCode || 500)
      .json({ message: e.message });
  }
});

module.exports = router;
