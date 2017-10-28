import React from 'react';
import PropTypes from 'prop-types';
import LibrariesContainer from '../components/Libraries';

const Libraries = ({ navigation: { state: { params } } }) => <LibrariesContainer {...params} />;

Libraries.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.object,
    }),
  }).isRequired,
};

export default Libraries;
