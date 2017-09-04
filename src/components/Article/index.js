import React from 'react';
import styled from 'styled-components';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import subHours from 'date-fns/sub_hours';
import sv from 'date-fns/locale/sv';
import balanceText from 'balance-text';
import { color } from '../../lib/theme';

export const Article = styled.li`
  position: relative;
  width: 40%;
  margin: 0 auto 5em;
  padding: 2em 1em;

  &:nth-child(odd) {
    margin-left: 40%;
  }

  &:nth-child(even) {
    margin-right: 40%;
  }

  &:nth-child(even) > .container-img {
    left: 100%;
  }
`;

export const ImgContainer = styled.div`
  position: absolute;
  top: 0;
  left: -100%;
  display: block;
  width: 30em;
  padding: 2em;
  z-index: 1;
`;

export const Img = styled.img`
  position: relative;
  display: block;
  max-width: 100%;
  height: auto;
  box-shadow: 0.4em 0.4em 6em 0.3em rgba(26, 26, 26, 0.3);
  z-index: -1;
`;

export const Content = styled.div`
  position: relative;
  font-size: 1em;
  z-index: 2;
`;

export const Title = styled.h1`
  position: relative;
  margin-bottom: 0.5em;
  font-size: 3.375em;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  line-height: 0.9em;
  text-wrap: balanced;
`;

export const Introduction = styled.div`
  margin-bottom: 1.5em;
  font-size: 1.5em;
  line-height: 1.3em;
`;

export const DateStamp = styled.div`
  margin-bottom: 1.5em;
  font-size: 1em;
  font-style: italic;
`;

export const ShowHideButton = styled.button`
  position: relative;
  display: block;
  margin: 0 0 0 3em;
  border: 0.2em solid ${color('brand')};
  border-radius: 2em;
  padding: 0.5em 1em;
  font-size: 1em;
  line-height: 1;
  color: ${color('brand')};
  z-index: 2;
  cursor: pointer;
  background-color: transparent;

  &:focus {
    outline: none;
  }
`;

const balanceSingle = el => balanceText(el);

export const Excerpt = ({ article, showHide }) => (
  <Article key={article.url}>
    <ImgContainer className="container-img">
      <Img src={article.img} />
    </ImgContainer>

    <Content className="container-content">
      <Title innerRef={ref => balanceSingle(ref)}>{article.title}</Title>

      <Introduction>
        <p>{article.introduction}</p>
      </Introduction>

      <DateStamp>
        Publicerades för{' '}
        <strong>
          {distanceInWordsToNow(subHours(article.date, 2), { locale: sv })}{' '}
          sedan
        </strong>
      </DateStamp>

      <ShowHideButton type="button" onClick={showHide}>
        Läs mer
      </ShowHideButton>
    </Content>
  </Article>
);
