import React from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage, Image, StyleSheet, TouchableHighlight, View } from 'react-native';
import moment from 'moment';
import Text from './Text';
import { KEY_TRACK_PREFIX } from '../constants/globals';

const styles = StyleSheet.create({
  audiobook: {
    backgroundColor: 'white',
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  audiobook__info: {
    paddingLeft: 10,
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
  uid,
  onPress,
}) => (
  <TouchableHighlight
    onPress={() => {
      AsyncStorage.getItem(`${KEY_TRACK_PREFIX}${uid}`).then((track) => {
        const params = {
          name,
          author,
          artwork,
          files,
          uid,
        };

        console.log(track, files);
        if (track && files.indexOf(track) > 0) {
          params.files = files.slice(files.indexOf(track));
        }

        onPress(params);
      });
    }}
  >
    <View style={styles.audiobook}>
      <Image style={styles.audioook__image} source={{ uri: artwork }} />
      <View style={styles.audiobook__info}>
        <Text>{name} by {author}</Text>
        <Text>{files.length} track(s)</Text>
        <Text>Added {moment.unix(dateAdded).fromNow()}</Text>
      </View>
    </View>
  </TouchableHighlight>
);

Audiobook.propTypes = {
  name: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  artwork: PropTypes.string.isRequired,
  dateAdded: PropTypes.string.isRequired,
  files: PropTypes.arrayOf(PropTypes.string).isRequired,
  uid: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Audiobook;
