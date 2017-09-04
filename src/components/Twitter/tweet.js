import React from 'react';
import styled from 'styled-components';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import sv from 'date-fns/locale/sv';
import { color } from '../../lib/theme';

const Tweet = styled.div`
  font-size: 2em;
  margin-bottom: 3em;

  &:last-child {
    margin-bottom: 0;
  }
`;

const TweetContent = styled.p`margin-bottom: 0.5em;`;

const TweetParts = styled.span`
  color: ${props =>
    props.type === 'text' ? color('black')(props) : color('brand')(props)};
`;

const TweetMedia = styled.img`
  display: block;
  width: 100%;
  height: auto;
  padding: 1em;
`;

const TweetMeta = styled.p`
  font-size: 0.8em;
  font-style: italic;
  color: ${color('grey')};
`;

const generateContent = (entieties, text) => {
  const mergedEntieties = Object.keys(entieties)
    .reduce((acc, key) => {
      const curr = entieties[key];
      return [
        ...acc,
        ...curr.map(obj => Object.assign({}, obj, { type: key })),
      ];
    }, [])
    .sort((a, b) => {
      const idxA = a.indices[0];
      const idxB = b.indices[0];
      if (idxA > idxB) return 1;
      if (idxA < idxB) return -1;
      return 0;
    });

  const media = [];

  const generatedText = mergedEntieties.reduce(
    (acc, ent, i) => {
      const [start, end] = ent.indices;
      const curr = text.substring(start, end);

      let tail = '';
      const nextEnt = mergedEntieties[i + 1];

      if (nextEnt != null) {
        const startNextEnt = nextEnt.indices[0];
        tail = text.substring(end, startNextEnt);
      } else {
        tail = text.substring(end);
      }

      if (ent.type === 'media') {
        media.push(ent.media_url_https);
      }

      return [
        ...acc,
        <TweetParts key={`${i}-curr`} type={ent.type}>
          {curr}
        </TweetParts>,
        <TweetParts key={`${i}-tail`} type="text">
          {tail}
        </TweetParts>,
      ];
    },
    [
      <TweetParts key="start" type="text">
        {text.substring(0, mergedEntieties[0].indices[0])}
      </TweetParts>,
    ],
  );

  return [
    generatedText,
    ...media.map(url => <TweetMedia key={url} src={url} />),
  ];
};

export default ({ tweet }) => (
  <Tweet>
    <TweetContent>{generateContent(tweet.entities, tweet.text)}</TweetContent>
    <TweetMeta>
      För{' '}
      <strong>
        {distanceInWordsToNow(tweet.created_at, { locale: sv })} sedan
      </strong>
    </TweetMeta>
    <TweetMeta>
      av {tweet.user.name} (@{tweet.user.screen_name})
    </TweetMeta>
  </Tweet>
);
