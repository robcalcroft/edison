import React, { Component } from 'react';
import { AsyncStorage, View } from 'react-native';
import NavigationStack from './app/containers/NavigationStack';
import Splash from './app/components/Splash';
import NowPlaying from './app/containers/NowPlaying';
import { KEY_TIME_PREFIX, KEY_TRACK_PREFIX } from './app/constants/globals';

class Root extends Component {
  constructor() {
    super();

    this.setStack = this.setStack.bind(this);
    this.setNowPlayingState = this.setNowPlayingState.bind(this);
    this.setPlayerRef = this.setPlayerRef.bind(this);
    this.performPlayerAction = this.performPlayerAction.bind(this);

    this.state = {
      stack: null,
      nowPlaying: {
        modalVisible: false,
        paused: true,
        muted: false,
        volume: 1,
        activePathOrUri: '',
        queuedPathsOrUris: [],
        title: '',
        author: '',
        artwork: '',
        currentTime: 0,
        seekableDuration: 0,
        uid: '0',
      },
    };
  }

  async componentDidMount() {
    // Generate the stack and cache it
    const stack = await NavigationStack();
    this.setStack(stack);
  }

  setStack(stack) {
    this.setState({ stack });
  }

  setNowPlayingState(newState, callback = () => {}) {
    if (newState.currentTime !== this.state.nowPlaying.currentTime) {
      this.saveCurrentTimeToStorage(newState.currentTime, this.state.nowPlaying.uid);
    }

    if (newState.activePathOrUri !== this.state.nowPlaying.activePathOrUri) {
      this.saveCurrentTrackToStorage(newState.activePathOrUri, this.state.nowPlaying.uid);
    }

    this.setState({
      nowPlaying: {
        ...this.state.nowPlaying,
        ...newState,
      },
    }, callback);
  }

  setPlayerRef(ref) {
    this.player = ref;
  }

  saveCurrentTimeToStorage(time, uid) { // eslint-disable-line class-methods-use-this
    AsyncStorage.setItem(`${KEY_TIME_PREFIX}${uid}`, String(time)).catch(error => console.error(error));
  }

  saveCurrentTrackToStorage(track, uid) { // eslint-disable-line class-methods-use-this
    AsyncStorage.setItem(`${KEY_TRACK_PREFIX}${uid}`, String(track)).catch(error => console.error(error));
  }

  performPlayerAction(action, params, callback = () => {}) {
    this.player[action](params);
    callback();
  }

  render() {
    const { stack: NavStack, nowPlaying } = this.state;

    if (NavStack === null) {
      return <Splash />;
    }

    return (
      <View style={{ flex: 1 }}>
        <NavStack
          screenProps={{
            setNowPlayingState: this.setNowPlayingState,
            nowPlayingState: nowPlaying,
          }}
        />
        <NowPlaying
          {...nowPlaying}
          setNowPlayingState={this.setNowPlayingState}
          setPlayerRef={this.setPlayerRef}
          performPlayerAction={this.performPlayerAction}
          hideModal={() => this.setNowPlayingState({ modalVisible: false })}
          showModal={() => this.setNowPlayingState({ modalVisible: true })}
        />
      </View>
    );
  }
}

export default Root;
