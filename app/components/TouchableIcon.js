import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const TouchableIcon = ({ name, onPress }) => (
  <TouchableHighlight onPress={onPress} underlayColor="transparent" activeOpacity={0.5}>
    <Icon name={name} size={38} />
  </TouchableHighlight>
);

TouchableIcon.propTypes = {
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default TouchableIcon;
