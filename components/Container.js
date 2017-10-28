import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
  },
});

const Container = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

Container.propTypes = {
  children: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Container;
