import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet } from 'react-native';
import Container from '../components/Container';
import Audiobook from '../components/Audiobook';

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
  },
});

const Library = ({ navigation, navigation: { state: { params: { library } } } }) => (
  <ScrollView style={styles.container}>
    <Container>
      {library.map(audiobook => (
        <Audiobook
          key={audiobook.uid}
          onPress={audiobookToPlay => navigation.navigate('NowPlaying', audiobookToPlay)}
          {...audiobook}
        />
      ))}
    </Container>
  </ScrollView>
);

Library.navigationOptions = ({ navigation }) => ({
  headerTitle: navigation.state.params.libraryName || 'Library',
});

Library.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        library: PropTypes.array.isRequired,
      }),
    }),
  }).isRequired,
};

export default Library;
