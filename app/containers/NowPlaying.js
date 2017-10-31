import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Audio from 'react-native-video';
import NowPlayingPresentational from '../components/NowPlaying';

class NowPlaying extends Component {
  render() {
    const {
      paused,
      muted,
      volume,
      activePathOrUri,
      setPlayerRef,
      setNowPlayingState,
    } = this.props;

    return [
      <NowPlayingPresentational key={3} {...this.props} />,
      // Crashes if we try and play an Audio element with an empty string as the `uri`
      activePathOrUri ? (
        <Audio
          ref={ref => setPlayerRef(ref)}
          onProgress={({ currentTime, seekableDuration }) => setNowPlayingState({
            currentTime,
            seekableDuration,
          })}
          onLoad={() => console.log('fully loaded')}
          onLoadStart={() => alert('begin loading')}
          onBuffer={buffer => alert(JSON.stringify(buffer))}
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
  activePathOrUri: PropTypes.string.isRequired,
  setPlayerRef: PropTypes.func.isRequired,
  setNowPlayingState: PropTypes.func.isRequired,
};

export default NowPlaying;
