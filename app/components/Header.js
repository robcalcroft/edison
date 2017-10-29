import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    color: 'rgb(100,100,100)',
  },
});

const Header = ({ children }) => <Text style={styles.header}>{children}</Text>;

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;
