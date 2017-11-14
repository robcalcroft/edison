import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

const Title = ({ children }) => <Text style={styles.title}>{children}</Text>;

Title.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Title;
