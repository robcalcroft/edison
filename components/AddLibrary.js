import React from 'react';
import PropTypes from 'prop-types';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

const styles = StyleSheet.create({
  libraryUrl: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
  },
});

const AddLibrary = ({
  onLibraryUrlChange,
  submitLibraryUrl,
  libraryUrl,
  error,
}) => (
  <View>
    <Text>Add a library URL</Text>
    {error ? <Text>{error}</Text> : null}
    <TextInput
      style={styles.libraryUrl}
      keyboardType="url"
      onChangeText={onLibraryUrlChange}
      value={libraryUrl}
      autoCapitalize="none"
      autoCorrect={false}
    />
    <Button onPress={submitLibraryUrl} title="Submit" />
  </View>
);

AddLibrary.propTypes = {
  onLibraryUrlChange: PropTypes.func.isRequired,
  submitLibraryUrl: PropTypes.func.isRequired,
  error: PropTypes.string,
  libraryUrl: PropTypes.string.isRequired,
};

AddLibrary.defaultProps = {
  error: '',
};

export default AddLibrary;
