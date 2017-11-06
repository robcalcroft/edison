import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage, StatusBar } from 'react-native';
import AddLibraryPresentational from '../components/AddLibrary';
import { KEY_LIBRARIES } from '../constants/globals';

class AddLibrary extends Component {
  constructor() {
    super();

    this.onLibraryUrlChange = this.onLibraryUrlChange.bind(this);
    this.submitLibraryUrl = this.submitLibraryUrl.bind(this);

    this.state = {
      libraryUrl: '',
      error: '',
    };
  }

  onLibraryUrlChange(libraryUrl) {
    this.setState({ libraryUrl });
  }

  async submitLibraryUrl() {
    const { libraryUrl } = this.state;

    if (libraryUrl === '') {
      return this.setState({ error: 'No library URL provided' });
    }

    StatusBar.setNetworkActivityIndicatorVisible(true);
    try {
      const response = await fetch(libraryUrl);
      const edisonConfig = await response.json();

      if (!edisonConfig.uid) {
        return this.setState({ error: 'No UID present in Edison file' });
      }

      const librariesRaw = await AsyncStorage.getItem(KEY_LIBRARIES);
      let libraries = [];

      if (librariesRaw && Array.isArray(JSON.parse(librariesRaw))) {
        libraries = JSON.parse(librariesRaw);
        libraries.push(edisonConfig);
        await AsyncStorage.setItem(KEY_LIBRARIES, JSON.stringify(libraries));
      } else {
        libraries = [edisonConfig];
        await AsyncStorage.setItem(KEY_LIBRARIES, JSON.stringify(libraries));
      }

      StatusBar.setNetworkActivityIndicatorVisible(false);
      this.props.onSubmit();
    } catch (error) {
      console.error(error);
      this.setState({ error: error.message });
    }

    return true;
  }

  render() {
    const { libraryUrl, error } = this.state;

    return (
      <AddLibraryPresentational
        onLibraryUrlChange={this.onLibraryUrlChange}
        submitLibraryUrl={this.submitLibraryUrl}
        libraryUrl={libraryUrl}
        error={error}
      />
    );
  }
}

AddLibrary.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AddLibrary;
