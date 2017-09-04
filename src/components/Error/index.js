import React from 'react';
import styled from 'styled-components';
import { color } from '../../lib/theme';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
  background-color: ${color('warning')};
`;

const ErrMsg = styled.p`font-weight: bold;`;

const Msg = styled.p`font-style: italic;`;

export default ({ message }) => (
  <Container>
    <ErrMsg>{message}</ErrMsg>
    <Msg>
      Please notify someone from <u>Sjöfartstidningen</u> that an error occured!
      Thanks!
    </Msg>
  </Container>
);
