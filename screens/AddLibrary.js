import React from 'react';
import PropTypes from 'prop-types';
import AddLibraryContainer from '../containers/AddLibrary';

const AddLibrary = ({ navigation }) => (
  <AddLibraryContainer onSubmit={screenName => navigation.navigate(screenName || 'Libraries')} />
);

AddLibrary.propTypes = {
  navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default AddLibrary;
