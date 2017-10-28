import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 16,
    marginBottom: 2,
    color: 'rgb(100,100,100)',
  },
});

const Subtitle = ({ children }) => <Text style={styles.subtitle}>{children}</Text>;

Subtitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Subtitle;
