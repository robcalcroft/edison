import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';
import Audio from 'react-native-video';
import NowPlayingPresentational from '../components/NowPlaying';
import { TIME_PREFIX } from '../constants/globals';

class NowPlaying extends Component {
  render() {
    const {
      paused,
      muted,
      volume,
      uid,
      activePathOrUri,
      queuedPathsOrUris,
      setPlayerRef,
      setNowPlayingState,
      performPlayerAction,
    } = this.props;

    return [
      <NowPlayingPresentational key={3} {...this.props} />,
      // Crashes if we try and play an Audio element with an empty string as the `uri`
      activePathOrUri ? (
        <Audio
          ref={ref => setPlayerRef(ref)}
          progressUpdateInterval={1000}
          onProgress={({ currentTime, seekableDuration }) => setNowPlayingState({
            currentTime,
            seekableDuration,
          })}
          onLoad={() => AsyncStorage.getItem(`${TIME_PREFIX}${uid}`).then(time => (
            performPlayerAction('seek', Number(time))
          ))}
          onEnd={() => {
            if (queuedPathsOrUris.length > 0) {
              setNowPlayingState({
                activePathOrUri: queuedPathsOrUris[0],
                queuedPathsOrUris: queuedPathsOrUris.slice(1),
              });
            } else {
              setNowPlayingState({
                paused: true,
              });
            }
          }}
          onLoadStart={() => console.log('begin loading')}
          onBuffer={buffer => console.log(JSON.stringify(buffer))}
          key={4}
          source={{ uri: activePathOrUri }}
          paused={paused}
          muted={muted}
          volume={volume}
          ignoreSilentSwitch="ignore"
          repeat={false}
          playInBackground
          playWhenInactive
        />
      ) : null,
    ];
  }
}

NowPlaying.propTypes = {
  paused: PropTypes.bool.isRequired,
  muted: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
  uid: PropTypes.string.isRequired,
  activePathOrUri: PropTypes.string.isRequired,
  queuedPathsOrUris: PropTypes.arrayOf(PropTypes.string).isRequired,
  setPlayerRef: PropTypes.func.isRequired,
  setNowPlayingState: PropTypes.func.isRequired,
  performPlayerAction: PropTypes.func.isRequired,
};

export default NowPlaying;
