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
`;

const Article = styled.li`
  position: relative;
  width: 33rem;
  margin: 0 auto;
  margin-bottom: 3rem;
  border-bottom: 1px solid #000;
  padding: 0 1rem 2rem;
  font-size: 1rem;

  &:hover .js-transform-img {
    transform: translate(-40%, 2.5rem);
  }

  &:hover .js-transform-content {
    transform: translate(50%, -2.5rem);
  }
`;

const ImgContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 2rem;
  box-shadow: 3px 7px 16px -6px rgba(0, 0, 0, 0.07),
    15px 20px 37px -2px rgba(0, 0, 0, 0.07),
    20px 42px 80px 6px rgba(0, 0, 0, 0.07),
    20px 42px 120px 10px rgba(0, 0, 0, 0.07);
  z-index: 1;
  transform: translate(-45%, 2rem);
  transition: transform 0.3s ease-in-out;
  will-change: transform;
`;

const Img = styled.img`
  position: relative;
  max-width: 100%;
  height: auto;
  z-index: -1;
`;

const Content = styled.div`
  position: relative;
  font-size: 1em;
  z-index: 2;
  transform: translate(45%, -5rem);
  transition: transform 0.3s ease-in-out;
  will-change: transform;
`;

const Title = styled.h1`
  position: relative;
  margin-bottom: 1.5rem;
  font-size: 3.375em;
  line-height: 0.9em;
  text-wrap: balanced;
`;

const Introduction = styled.div`
  margin-bottom: 1.5rem;
  font-size: 1.5em;
  line-height: 1.3em;
`;

const DateStamp = styled.div`
  margin-bottom: 1.5rem;
  font-size: 1em;
  font-style: italic;

  & strong {
    color: #0599e4;
  }
`;

const ShowHideButton = styled.button`
  position: relative;
  display: block;
  margin: 0 0 0 3rem;
  border: 3px solid #0599e4;
  border-radius: 2rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  line-height: 1;
  color: #0599e4;
  z-index: 2;
  background-color: transparent;
  transition: color 0.3s ease-in-out;
  will-change: color;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 2rem;
    background: #0599e4;
    z-index: -1;
    transform: scale(0, 0);
    transform-origin: 50% 50%;
    transition: transform 0.3s ease-in-out;
    will-change: transform;
  }

  &:hover {
    color: #fff;
  }

  &:hover::before {
    transform: scale(1, 1);
  }

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
