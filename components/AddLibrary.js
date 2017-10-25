import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text, TextInput, View } from 'react-native';

const AddLibrary = ({
  onLibraryUrlChange,
  submitLibraryUrl,
  libraryUrl,
  error,
}) => (
  <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
    <Text>Add a library URL</Text>
    {error ? <Text>{error}</Text> : null}
    <TextInput
      style={{
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
      }}
      onChangeText={onLibraryUrlChange}
      value={libraryUrl}
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
