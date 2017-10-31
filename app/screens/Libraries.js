import React from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage, Button } from 'react-native';
import Container from '../components/Container';
import LibrariesContainer from '../containers/Libraries';

const clearLibraries = () => {
  AsyncStorage.clear().then(() => alert('Cleared, now you can restart the app'));
};

const Libraries = ({ navigation }) => (
  <Container>
    <LibrariesContainer onPress={library => navigation.navigate('Library', library)} />
  </Container>
);

Libraries.navigationOptions = ({ navigation }) => ({
  headerRight: <Button title="Add" onPress={() => navigation.navigate('AddLibrary')} />,
  headerLeft: <Button title="Clear All" onPress={clearLibraries} />,
});

Libraries.propTypes = {
  navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Libraries;
