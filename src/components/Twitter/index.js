import React, { Component } from 'react';
import styled from 'styled-components';

import Tweet from './tweet';
import Error from '../Error';

const TweetsContainer = styled.div`
  position: relative;
  width: 100%;
  list-style: none;
  z-index: 0;
  font-size: 0.8vw;
`;

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  margin-bottom: 1em;
`;

export default class Twitter extends Component {
  state = {
    tweets: [],
    error: null,
  };

  interval = null;

  componentDidMount() {
    this.getTweets();
    this.interval = setInterval(this.getTweets, 60 * 1000);
  }

  componentWillUnmount() {
    if (this.interval) {
      window.clearInterval(this.interval);
      this.interval = null;
    }
  }

  getTweets = async () => {
    try {
      const res = await fetch('/api/twitter');
      const { tweets } = await res.json();

      this.setState(() => ({
        tweets: tweets.statuses,
        error: null,
      }));
    } catch (e) {
      console.log(e);
      this.setState(() => ({ error: e.message }));
    }
  };

  render() {
    return (
      <div>
        <Title>Twitter #DSM17</Title>
        <TweetsContainer>
          {this.state.tweets.map(t => <Tweet tweet={t} key={t.id} />)}
        </TweetsContainer>
        {this.state.error && <Error message={this.state.error} />}
      </div>
    );
  }
}
