import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Button,
  Image,
  Modal,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import Slider from 'react-native-slider';
import Text from './Text';
import TouchableIcon from './TouchableIcon';

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
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
  nowPlayingImage: {
    flex: 0.85,
    width: '100%',
  },
  nowPlayingSliderContainer: {
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
  },
  nowPlayingSliderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nowPlayingActions: {
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  nowPlayingInfo: {
    fontSize: 22,
  },
});
// TODO convert to normal class to allow no updating of the value of the slider until the
// onSlidingComplete has been called

class NowPlaying extends Component {
  showNativePlayer() {
    this.props.setNowPlayingState({ modalVisible: false }, () => {
      this.props.performPlayerAction('presentFullscreenPlayer');
    });
  }

  render() {
    const {
      modalVisible,
      showModal,
      hideModal,
      activePathOrUri,
      paused,
      muted,
      title,
      author,
      artwork,
      setNowPlayingState,
      seekableDuration,
      currentTime,
      performPlayerAction,
    } = this.props;
    const formattedCurrentTime = moment(moment.duration(currentTime, 's').asMilliseconds()).format('HH:mm:ss');
    const formattedSeekableDuration = moment(moment.duration(seekableDuration - currentTime, 's').asMilliseconds()).format('HH:mm:ss');

    return [
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
          <Image resizeMode="contain" source={{ uri: artwork }} style={styles.nowPlayingImage} />
          <Text style={styles.nowPlayingInfo}>{title} by {author}</Text>
          <View style={styles.nowPlayingSliderContainer}>
            <Slider
              value={currentTime}
              maximumValue={seekableDuration}
              onSlidingComplete={value => performPlayerAction('seek', value)}
              style={styles.nowPlayingSlider}
            />
            <View style={styles.nowPlayingSliderInfo}>
              <Text>{formattedCurrentTime}</Text>
              <Text>-{formattedSeekableDuration}</Text>
            </View>
          </View>
          {/* We are not using this as you can use the phone's volume control */}
          {/* <Slider onValueChange={value => setNowPlayingState({ volume: value })} /> */}
          <View style={styles.nowPlayingActions}>
            <TouchableIcon
              name={muted ? 'ios-volume-off' : 'ios-volume-up'}
              onPress={() => setNowPlayingState({ muted: !muted })}
            />
            <TouchableIcon
              name="ios-skip-backward"
              onPress={() => performPlayerAction('seek', 0)}
            />
            <TouchableIcon
              name={`ios-${paused ? 'play' : 'pause'}`}
              onPress={() => setNowPlayingState({ paused: !paused })}
            />
            <TouchableIcon name="ios-contract" onPress={hideModal} />
            <TouchableIcon
              name="ios-expand"
              onPress={() => this.showNativePlayer()}
            />
          </View>
        </View>
      </Modal>,
    ];
  }
}

NowPlaying.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  paused: PropTypes.bool.isRequired,
  muted: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  artwork: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  activePathOrUri: PropTypes.string.isRequired,
  seekableDuration: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  setNowPlayingState: PropTypes.func.isRequired,
  performPlayerAction: PropTypes.func.isRequired,
};

export default NowPlaying;
