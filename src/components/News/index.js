import React, { Component } from 'react';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import sv from 'date-fns/locale/sv';
import styled from 'styled-components';
import balanceText from 'balance-text';

import FullArticle from '../FullArticle';

const Container = styled.ul`
  position: relative;
  width: 100%;
  list-style: none;
  z-index: 0;
  font-size: 0.8vw;
`;

const Article = styled.li`
  position: relative;
  width: 100%;
  max-width: 33em;
  margin: 0 auto;
  margin-bottom: 3em;
  border-bottom: 1px solid #000;
  padding: 0 1em 2em;

  &:hover .js-transform-img {
    transform: translate(-40%, 2.5em);
  }

  &:hover .js-transform-content {
    transform: translate(50%, -2.5em);
  }
`;

const ImgContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 0em;
  box-shadow: 4px 4px 60px 3px rgba(0, 0, 0, 0.3);
  background-color: #eee;
  z-index: 1;
  transform: translate(-45%, 2em);
  transition: transform 0.3s ease-in-out;
  will-change: transform;
`;

const Img = styled.img`
  position: relative;
  display: block;
  max-width: 100%;
  height: auto;
  opacity: 0.9;
  z-index: -1;
`;

const Content = styled.div`
  position: relative;
  font-size: 1em;
  z-index: 2;
  transform: translate(45%, -5em);
  transition: transform 0.3s ease-in-out;
  will-change: transform;
`;

const Title = styled.h1`
  position: relative;
  margin-bottom: 1.5em;
  font-size: 3.375em;
  line-height: 0.9em;
  text-wrap: balanced;
`;

const Introduction = styled.div`
  margin-bottom: 1.5em;
  font-size: 1.5em;
  line-height: 1.3em;
`;

const DateStamp = styled.div`
  margin-bottom: 1.5em;
  font-size: 1em;
  font-style: italic;
`;

const ShowHideButton = styled.button`
  position: relative;
  display: block;
  margin: 0 0 0 3em;
  border: 0.2em solid #0599e4;
  border-radius: 2em;
  padding: 0.5em 1em;
  font-size: 1em;
  line-height: 1;
  color: #0599e4;
  z-index: 2;
  cursor: pointer;
  background-color: transparent;

  &:focus {
    outline: none;
  }
`;

export default class News extends Component {
  state = {
    articles: [],
    show: null,
    error: null,
  };

  componentDidMount() {
    this.fetchNews();
  }

  fetchNews = async () => {
    try {
      const res = await fetch('/api/news');
      const { articles } = await res.json();

      this.setState(() => ({ articles }));
    } catch (e) {
      this.setState(() => ({ error: e.message }));
    }
  };

  showHideArticle = url => () => {
    const currentUrl = this.state.show;

    if (url == null || url === currentUrl)
      return this.setState(() => ({ show: null }));
    return this.setState(() => ({ show: url }));
  };

  balanceElText = ref => balanceText(ref);
  balanceChildren = tag => parent => {
    if (parent && 'querySelectorAll' in parent) {
      const children = parent.querySelectorAll(tag);
      children.forEach(this.balanceElText);
    }
  };

  render() {
    const { articles, show } = this.state;
    const fullArticle = articles.find(a => a.url === show);
    return (
      <div>
        <Container>
          {articles.map(a => (
            <Article key={a.url}>
              <ImgContainer className="js-transform-img">
                <Img src={a.img} />
              </ImgContainer>

              <Content className="js-transform-content">
                <Title innerRef={this.balanceElText}>{a.title}</Title>

                <Introduction>
                  <p ref={this.balanceElText}>{a.introduction}</p>
                </Introduction>

                <DateStamp>
                  Publicerades för{' '}
                  <strong>
                    {distanceInWordsToNow(a.date, { locale: sv })} sedan
                  </strong>
                </DateStamp>

                <ShowHideButton
                  type="button"
                  onClick={this.showHideArticle(a.url)}
                >
                  Läs mer
                </ShowHideButton>
              </Content>
            </Article>
          ))}
        </Container>
        {fullArticle && (
          <FullArticle
            article={fullArticle}
            hideArticle={this.showHideArticle()}
          />
        )}
      </div>
    );
  }
}
