import React, { Component } from 'react';
import { AsyncStorage, Button, Modal, Text, TouchableHighlight, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Libraries from './app/screens/Libraries';
import AddLibrary from './app/screens/AddLibrary';
import Library from './app/screens/Library';
import { KEY_LIBRARIES } from './app/constants/globals';

class Root extends Component {
  constructor() {
    super();

    this.setLibraries = this.setLibraries.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);

    this.state = {
      libraries: null,
      nowPlaying: {
        modalVisible: false,
        uid: '',
      },
    };
  }

  async componentDidMount() {
    const libraries = await AsyncStorage.getItem(KEY_LIBRARIES);

    if (libraries) {
      this.setLibraries(JSON.parse(libraries));
    } else {
      this.setLibraries(false);
    }
  }

  setLibraries(libraries) {
    this.setState({ libraries });
  }

  showModal() {
    this.setState({
      nowPlaying: {
        ...this.state.nowPlaying,
        modalVisible: true,
      },
    });
  }

  hideModal() {
    this.setState({
      nowPlaying: {
        ...this.state.nowPlaying,
        modalVisible: false,
      },
    });
  }

  render() {
    const { libraries, nowPlaying } = this.state;

    if (libraries === null) {
      // TODO Turn into loading component
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Text>Loading...</Text>
        </View>
      );
    }

    const NavigationStack = StackNavigator({
      AddLibrary: {
        screen: AddLibrary,
        navigationOptions: {
          headerTitle: 'Add Library',
        },
      },
      Libraries: {
        screen: Libraries,
        navigationOptions: {
          headerTitle: 'Libraries',
        },
      },
      Library: {
        screen: Library,
      },
    }, {
      initialRouteName: libraries ? 'Libraries' : 'AddLibrary',
      // Params aren't being passed
      initialRouteParams: libraries !== false ? { libraries } : {},
    });
    // Refactor this into a seperate comoponent i thibnj the state change at this leve is making it reset itself
    return (
      <View style={{ flex: 1 }}>
        <NavigationStack screenProps={{}} />
        <TouchableHighlight onPress={this.showModal}>
          <View style={{ height: nowPlaying.modalVisible ? 0 : 50, backgroundColor: 'red', width: '100%' }}>
            <Text>NowPlaying</Text>
          </View>
        </TouchableHighlight>
        <Modal
          animationType="slide"
          onRequestClose={this.hideModal}
          visible={nowPlaying.modalVisible}
        >
          <View style={{ marginTop: 20 }}><Button onPress={this.hideModal} title="Close" /></View>
        </Modal>
      </View>
    );
  }
}

export default Root;
