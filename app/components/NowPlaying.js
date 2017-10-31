import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  nowPlayingBar: {
    backgroundColor: 'lightgray',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    borderTopColor: 'grey',
    borderTopWidth: 1,
  },
  nowPlayingBar__inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nowPlayingBar__inner__title: {
    paddingLeft: 10,
    fontSize: 18,
  },
  nowPlayingBar__inner__image: {
    height: 40,
    width: 40,
  },
  nowPlayingModal: {
    marginTop: 20,
    flex: 1,
  },
  nowPlayingImage: {
    height: 425,
    width: 275,
  },
});

const NowPlaying = ({
  modalVisible,
  showModal,
  hideModal,
  activePathOrUri,
  paused,
  muted,
  volume,
  title,
  author,
  artwork,
  setNowPlayingState,
}) => [
  activePathOrUri ? (
    <TouchableHighlight key={1} onPress={showModal}>
      <View style={[styles.nowPlayingBar, { height: modalVisible ? 0 : 60 }]}>
        <View style={styles.nowPlayingBar__inner}>
          <Image source={{ uri: artwork }} style={styles.nowPlayingBar__inner__image} />
          <Text style={styles.nowPlayingBar__inner__title}>{title}</Text>
        </View>
        <View style={styles.nowPlayingBar__inner}>
          <Button
            onPress={() => setNowPlayingState({ paused: !paused })}
            title={paused ? 'Play' : 'Pause'}
          />
        </View>
      </View>
    </TouchableHighlight>
  ) : null,
  <Modal
    animationType="slide"
    onRequestClose={hideModal}
    visible={modalVisible}
    key={2}
  >
    <View style={styles.nowPlayingModal}>
      <Image source={{ uri: artwork }} style={styles.nowPlayingImage} />
      <Text>{title} by {author}</Text>
      <Text>Volume {volume}</Text>
      <Text>{muted ? 'Muted' : 'Not Muted'}</Text>
      {/* We are not using this as you can use the phone's volume control */}
      {/* <Slider onValueChange={value => setNowPlayingState({ volume: value })} /> */}
      <Button onPress={hideModal} title="Close" />
      <Button
        onPress={() => setNowPlayingState({ paused: !paused })}
        title={paused ? 'Play' : 'Pause'}
      />
    </View>
  </Modal>,
];

NowPlaying.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  activePathOrUri: PropTypes.string.isRequired,
  setNowPlayingState: PropTypes.func.isRequired,
  performPlayerAction: PropTypes.func.isRequired,
};

export default NowPlaying;
