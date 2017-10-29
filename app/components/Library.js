import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import Title from './Title';
import Header from './Header';
import Subtitle from './Subtitle';
// import Audiobook from './Audiobook';

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: 'white',
  },
  spacedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 5,
  },
});

const Library = ({
  uid,
  libraryName,
  owner,
  edisonVersion,
  library,
  onPress,
}) => (
  <TouchableHighlight
    onPress={() => onPress({
      uid,
      libraryName,
      owner,
      edisonVersion,
      library,
    })}
  >
    <View style={styles.container}>
      <Title>{libraryName}</Title>
      <Header>{library.length} audiobook{library.length === 1 ? '' : 's'}</Header>
      <View style={styles.spacedRow}>
        <Subtitle>By {owner}</Subtitle>
      </View>
    </View>
  </TouchableHighlight>
);

Library.propTypes = {
  uid: PropTypes.string.isRequired,
  libraryName: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  edisonVersion: PropTypes.string.isRequired,
  library: PropTypes.arrayOf(PropTypes.object).isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Library;
