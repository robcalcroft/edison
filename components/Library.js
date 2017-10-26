import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import Audiobook from './Audiobook';

const Library = ({
  uid,
  libraryName,
  owner,
  edisonVersion,
  library,
}) => (
  <View key={uid}>
    <Text>{libraryName}</Text>
    <Text>Owned by {owner}</Text>
    <Text>Made for Edison v{edisonVersion}</Text>
    {library.map(audiobook => <Audiobook key={audiobook.uid} audiobook={audiobook} />)}
  </View>
);

Library.propTypes = {
  uid: PropTypes.string.isRequired,
  libraryName: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  edisonVersion: PropTypes.string.isRequired,
  library: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Library;
