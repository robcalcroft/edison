import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import Library from './Library';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 40,
  },
});

const Libraries = (a) => (
  <View style={styles.container}>
    <Text style={styles.title}>Libraries</Text>
    {libraries.map(library => <Library key={library.uid} {...library} />)}
  </View>
);

Libraries.propTypes = {
  libraries: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Libraries;
