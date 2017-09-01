'use strict';

const url = require('url');
const axios = require('axios');
const cheerio = require('cheerio');
const R = require('ramda');
const he = require('he');

const fetch = require('../fetch');

const cleanHtml = R.pipe(he.decode, R.replace(/\n+/g, ''));
const cleanImgSrc = R.replace(/-\d+x\d+/g, '');

const getSingle = async url => {
  const { data } = await fetch.get(url);
  const $ = cheerio.load(data);
  const main = $('.textcont');

  $('.article-side').remove();
  $('.postmeta').remove();
  $('#mailto').remove();

  const introduction = main.find('.introduction').text();
  const html = main.find('.entry-content .span12').html();

  return { introduction, html: cleanHtml(html) };
};

exports.getLatest = async () => {
  const { data } = await fetch.get(
    fetch.sstUrl(process.env.NODE_ENV === 'production' ? 'dsm17' : 'halladar'),
  );

  const $ = cheerio.load(data);
  const main = $('#main .main_content');

  const articles = main
    .find('article')
    .map((i, el) => {
      const element = $(el);
      const article = {
        title: element.find('header h3').text(),
        url: element.find('header h3 a').attr('href'),
        img: cleanImgSrc(element.find('img').attr('src')),
      };

      return article;
    })
    .toArray();

  const withContent = await Promise.all(
    articles.map(async article => {
      const content = await getSingle(article.url);
      return Object.assign({}, article, content);
    }),
  );

  return { articles: withContent };
};
