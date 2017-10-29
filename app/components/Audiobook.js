import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import moment from 'moment';

const styles = StyleSheet.create({
  audiobook: {
    borderWidth: 3,
    borderColor: 'gray',
  },
  audioook__image: {
    width: 50,
    height: 50,
  },
});

const Audiobook = ({
  name,
  author,
  artwork,
  dateAdded,
  files,
  onPress,
}) => (
  <TouchableHighlight
    onPress={() => onPress({
      name,
      author,
      files,
    })}
  >
    <View style={styles.audiobook}>
      <Text>{name} by {author}</Text>
      <Text>{files.length} track(s)</Text>
      <Text>Added {moment.unix(dateAdded).fromNow()}</Text>
      <Image style={styles.audioook__image} source={{ uri: artwork }} />
    </View>
  </TouchableHighlight>
);

Audiobook.propTypes = {
  name: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  artwork: PropTypes.string.isRequired,
  dateAdded: PropTypes.string.isRequired,
  files: PropTypes.arrayOf(PropTypes.string).isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Audiobook;
