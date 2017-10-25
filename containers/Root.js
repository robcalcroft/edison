import React, { Component } from 'react';
import { AsyncStorage, Image, Text, View } from 'react-native';
import moment from 'moment';
import AddLibrary from '../containers/AddLibrary';
import { KEY_LIBRARIES } from '../constants/globals';

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
    console.log(libraries);
    if (libraries === null) {
      return <Text>Loading...</Text>;
    }

    return libraries ? (
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 40 }}>Libraries</Text>
        {libraries.map(({
          libraryName,
          owner,
          edisonVersion,
          library,
        }) => (
          <View key={1}>
            <Text>{libraryName}</Text>
            <Text>Owned by {owner}</Text>
            <Text>Made for Edison v{edisonVersion}</Text>
            {library.map(audiobook => (
              <View key={1} style={{ marginTop: 20, borderWidth: 3, borderColor: 'gray' }}>
                <Text>{audiobook.name} by {audiobook.author}</Text>
                <Text>{audiobook.files.length} track(s)</Text>
                <Text>Added {moment.unix(audiobook.dateAdded).fromNow()}</Text>
                <Image
                  style={{ width: 50, height: 50 }}
                  source={{ uri: audiobook.artwork }}
                />
              </View>
            ))}
          </View>
        ))}
      </View>
    ) : <AddLibrary />;
  }
}

export default Root;
