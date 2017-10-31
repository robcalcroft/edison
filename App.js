import React, { Component } from 'react';
import { View } from 'react-native';
import NavigationStack from './app/containers/NavigationStack';
import Splash from './app/components/Splash';
import NowPlaying from './app/components/NowPlaying';

class Root extends Component {
  constructor() {
    super();

    this.setStack = this.setStack.bind(this);
    this.setNowPlayingState = this.setNowPlayingState.bind(this);

    this.state = {
      stack: null,
      nowPlaying: {
        modalVisible: false,
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

  setNowPlayingState(newState) {
    this.setState({
      nowPlaying: {
        ...this.state.nowPlaying,
        ...newState,
      },
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
            nowPlayingState: this.state.nowPlaying,
          }}
        />
        <NowPlaying
          {...nowPlaying}
          hideModal={() => this.setNowPlayingState({ modalVisible: false })}
          showModal={() => this.setNowPlayingState({ modalVisible: true })}
        />
      </View>
    );
  }
}

export default Root;
