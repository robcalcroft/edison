import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';
import LibrariesPresentational from '../components/Libraries';
import { KEY_LIBRARIES } from '../constants/globals';

class Libraries extends Component {
  constructor() {
    super();

    this.setLibraries = this.setLibraries.bind(this);

    this.state = {
      libraries: [],
    };
  }

  async componentDidMount() {
    try {
      const libraries = await AsyncStorage.getItem(KEY_LIBRARIES);

      if (libraries !== null) {
        const parsedLibraries = JSON.parse(libraries);
        this.setLibraries(parsedLibraries);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  setLibraries(libraries) {
    this.setState({ libraries });
  }

  render() {
    const { libraries } = this.state;
    const { onPress } = this.props;

    return <LibrariesPresentational onPress={onPress} libraries={libraries} />;
  }
}

Libraries.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default Libraries;
