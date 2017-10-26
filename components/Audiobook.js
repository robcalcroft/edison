import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, Text, View } from 'react-native';
import moment from 'moment';

const styles = StyleSheet.create({
  audiobook: {
    marginTop: 20,
    borderWidth: 3,
    borderColor: 'gray',
  },
  audioook__image: {
    width: 50,
    height: 50,
  },
});

const Audiobook = ({ audiobook }) => (
  <View key={audiobook.uid} style={styles.audiobook}>
    <Text>{audiobook.name} by {audiobook.author}</Text>
    <Text>{audiobook.files.length} track(s)</Text>
    <Text>Added {moment.unix(audiobook.dateAdded).fromNow()}</Text>
    <Image style={styles.audioook__image} source={{ uri: audiobook.artwork }} />
  </View>
);

Audiobook.propTypes = {
  audiobook: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    dateAdded: PropTypes.string.isRequired,
  }).isRequired,
};

export default Audiobook;
