import React, { Component } from 'react';
import styled from 'styled-components';

import FullArticle from '../FullArticle';
import { Excerpt } from '../Article';
import Error from '../Error';

const Container = styled.ul`
  position: relative;
  width: 100%;
  list-style: none;
  z-index: 0;
  font-size: 0.8vw;
`;

export default class News extends Component {
  state = {
    articles: [],
    show: null,
    error: null,
  };

  interval = null;

  componentDidMount() {
    this.fetchNews();
    this.interval = setInterval(this.fetchNews, 60 * 1000);
  }

  componentWillUnmount() {
    if (this.interval) {
      window.clearInterval(this.interval);
      this.interval = null;
    }
  }

  fetchNews = async () => {
    try {
      const res = await fetch('/api/news');
      const { articles } = await res.json();

      this.setState(() => ({ articles, error: null }));
    } catch (e) {
      console.log(e);
      this.setState(() => ({ error: e.message }));
    }
  };

  showHideArticle = url => () => {
    const currentUrl = this.state.show;

    if (url == null || url === currentUrl) {
      return this.setState(() => ({ show: null }));
    }

    return this.setState(() => ({ show: url }));
  };

  render() {
    const { articles, show, error } = this.state;
    const fullArticle = articles.find(a => a.url === show);

    return (
      <div>
        <Container>
          {articles.map(a => (
            <Excerpt
              key={a.url}
              article={a}
              showHide={this.showHideArticle(a.url)}
            />
          ))}
        </Container>
        {fullArticle && (
          <FullArticle
            article={fullArticle}
            hideArticle={this.showHideArticle()}
          />
        )}
        {error && <Error message={error} />}
      </div>
    );
  }
}
