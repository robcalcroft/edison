import React from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage, Button } from 'react-native';
import Container from '../components/Container';
import LibrariesContainer from '../components/Libraries';

const clearLibraries = () => {
  AsyncStorage.clear().then(() => alert('Cleared, now you can restart the app'));
};

const Libraries = ({ navigation, navigation: { state: { params } } }) => (
  <Container>
    <LibrariesContainer {...params} onPress={library => navigation.navigate('Library', library)} />
  </Container>
);

Libraries.navigationOptions = ({ navigation }) => ({
  headerRight: <Button title="Add" onPress={() => navigation.navigate('AddLibrary')} />,
  headerLeft: <Button title="Clear All" onPress={clearLibraries} />,
});

Libraries.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.object,
    }),
  }).isRequired,
};

export default Libraries;
