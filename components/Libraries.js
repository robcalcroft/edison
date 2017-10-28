import React from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage, Button, ScrollView } from 'react-native';
import Library from './Library';

const Libraries = ({ libraries }) => (
  <ScrollView>
    {libraries.map(library => <Library key={library.uid} {...library} />)}
    <Button
      onPress={() => AsyncStorage.clear().then(() => alert('You can reload now'))}
      title="Empty libraries"
    />
  </ScrollView>
);

Libraries.propTypes = {
  libraries: PropTypes.arrayOf(PropTypes.object),
};

Libraries.defaultProps = {
  libraries: [],
};

export default Libraries;
