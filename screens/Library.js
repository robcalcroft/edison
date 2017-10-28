import React from 'react';
import PropTypes from 'prop-types';
import Container from '../components/Container';
import Audiobook from '../components/Audiobook';

const Library = ({ navigation: { state: { params: { library } } } }) => (
  <Container>
    {library.map(audiobook => <Audiobook key={audiobook.uid} {...audiobook} />)}
  </Container>
);

Library.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        library: PropTypes.array.isRequired,
      }),
    }),
  }).isRequired,
};

export default Library;
