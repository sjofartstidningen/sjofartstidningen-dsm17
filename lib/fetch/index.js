'user strict';

const url = require('url');
const debug = require('debug')('server:fetch');
const axios = require('axios');
const chalk = require('chalk');

const fetch = axios.create({ headers: { 'User-Agent': 'sst@dsm-crawler' } });

fetch.interceptors.request.use(config => {
  debug(`${chalk.green(config.method)}: ${config.url}`);
  return config;
});

fetch.interceptors.response.use(res => {
  const { status, config } = res;
  debug(`${chalk[status === 200 ? 'green' : 'red'](status)}: ${config.url}`);

  return res;
});

module.exports = fetch;

module.exports.sstUrl = pathname =>
  url.format({
    protocol: 'http:',
    host: 'www.sjofartstidningen.se',
    pathname,
  });
