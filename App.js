import React, { Component } from 'react';
import { AsyncStorage, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Libraries from './screens/Libraries';
import AddLibrary from './screens/AddLibrary';
import { KEY_LIBRARIES } from './constants/globals';

class Root extends Component {
  constructor() {
    super();

    this.setLibraries = this.setLibraries.bind(this);

    this.state = {
      libraries: null,
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

  render() {
    const { libraries } = this.state;

    if (libraries === null) {
      return <Text>Loading...</Text>;
    }

    const NavigationStack = StackNavigator({
      AddLibrary: {
        screen: AddLibrary,
      },
      Libraries: {
        screen: Libraries,
      },
    }, {
      initialRouteName: libraries ? 'Libraries' : 'AddLibrary',
      // Params aren't being passed
      initialRouteParams: libraries !== false ? { libraries } : {},
    });

    return <NavigationStack />;
  }
}

export default Root;
