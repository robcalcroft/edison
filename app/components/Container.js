import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

const Container = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
