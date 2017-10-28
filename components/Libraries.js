import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet } from 'react-native';
import Library from './Library';

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
  },
});

const Libraries = ({ libraries, onPress }) => (
  <ScrollView style={styles.container}>
    {libraries.map(library => <Library key={library.uid} onPress={onPress} {...library} />)}
  </ScrollView>
);

Libraries.propTypes = {
  libraries: PropTypes.arrayOf(PropTypes.object),
  onPress: PropTypes.func.isRequired,
};

Libraries.defaultProps = {
  libraries: [],
};

export default Libraries;
