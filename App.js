import React, { Component } from 'react';
import { View } from 'react-native';
import NavigationStack from './app/containers/NavigationStack';
import Splash from './app/components/Splash';
import NowPlaying from './app/containers/NowPlaying';

class Root extends Component {
  constructor() {
    super();

    this.setStack = this.setStack.bind(this);
    this.setNowPlayingState = this.setNowPlayingState.bind(this);
    this.setPlayerRef = this.setPlayerRef.bind(this);
    this.performPlayerAction = this.performPlayerAction.bind(this);
    this.showNativePlayer = this.showNativePlayer.bind(this);

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

  performPlayerAction(action, params) {
    this.player[action](params);
  }

  showNativePlayer() {
    this.setNowPlayingState({ modalVisible: false }, () => {
      this.player.presentFullscreenPlayer();
    });
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
          showNativePlayer={this.showNativePlayer}
          hideModal={() => this.setNowPlayingState({ modalVisible: false })}
          showModal={() => this.setNowPlayingState({ modalVisible: true })}
        />
      </View>
    );
  }
}

export default Root;
