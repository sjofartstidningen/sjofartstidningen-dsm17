import React from 'react';
import styled from 'styled-components';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import sv from 'date-fns/locale/sv';
import balanceText from 'balance-text';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.9);
`;

const Close = styled.button`
  position: fixed;
  top: 2rem;
  left: 2rem;
  width: 4rem;
  height: 4rem;
  border: 2px solid #0599e4;
  border-radius: 100%;
  background-color: transparent;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 10%;
    width: 80%;
    height: 2px;
    background-color: #0599e4;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;

const Article = styled.article`
  position: relative;
  width: 35rem;
  margin: 0 auto;
  margin-bottom: 3rem;
  border-bottom: 1px solid #000;
  padding: 0 4rem 2rem;
  font-size: 1rem;
  background-color: #fff;
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
  transform: translate(-100%, 0);
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
  transform: translate(0, -5rem);
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

const StaticHtml = styled.div`
  margin-bottom: 2rem;

  & > p {
    margin-bottom: 1em;
  }

  & > p:last-child,
  & > .cross-head {
    margin-bottom: 0;
  }

  & .cross-head {
    font-weight: bold;
  }

  & img {
    display: block;
    max-width: 100%;
    height: auto;
    margin-left: 3rem;
  }
`;

const DateStamp = styled.div`
  margin-bottom: 1.5rem;
  font-size: 1em;
  font-style: italic;

  & strong {
    color: #0599e4;
  }
`;

const balanceLines = parent => {
  if (parent && 'querySelectorAll' in parent) {
    const children = parent.querySelectorAll('.cross-head');
    children.forEach(balanceText);
  }
};

export default ({ article: a, hideArticle }) => (
  <Container>
    <Close onClick={hideArticle} />
    <Article key={a.url}>
      <ImgContainer className="js-transform-img">
        <Img src={a.img} />
      </ImgContainer>

      <Content className="js-transform-content">
        <Title innerRef={balanceText}>{a.title}</Title>

        <Introduction>
          <p ref={balanceText}>{a.introduction}</p>
        </Introduction>

        <StaticHtml
          dangerouslySetInnerHTML={{ __html: a.html }}
          innerRef={balanceLines}
        />

        <DateStamp>
          Publicerades för{' '}
          <strong>{distanceInWordsToNow(a.date, { locale: sv })} sedan</strong>
        </DateStamp>
      </Content>
    </Article>
  </Container>
);
