import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

const ModifiedText = ({ children, style }) => (
  <Text style={[{ fontSize: 16 }].concat(style)}>{children}</Text>
);

ModifiedText.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.number,
  ]),
};

ModifiedText.defaultProps = {
  style: 0,
};

export default ModifiedText;
