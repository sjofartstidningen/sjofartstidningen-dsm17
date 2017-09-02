import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import News from '../News';
import Logotype from '../Logotype';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  width: 100vw;
  min-height: 100vh;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
`;

const GridItem = styled.div`
  width: 100%;
  padding: 2rem;
  ${props => props.span && css`grid-column: 1 / span 2;`} &:last-child {
    border-left: 1px solid #000;
  }
`;

class App extends Component {
  render() {
    return (
      <Grid>
        <GridItem span>
          <Logotype />
        </GridItem>
        <GridItem>
          <News />
        </GridItem>
        <GridItem>
          <h1>Twitter</h1>
        </GridItem>
      </Grid>
    );
  }
}

export default App;
