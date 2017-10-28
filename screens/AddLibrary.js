import React from 'react';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import Container from '../components/Container';
import AddLibraryContainer from '../containers/AddLibrary';

const AddLibrary = ({ navigation }) => (
  <Container>
    <AddLibraryContainer
      onSubmit={(props = {}, screenName = 'Libraries') => {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: screenName,
              params: props,
            }),
          ],
        });
        navigation.dispatch(resetAction);
      }}
    />
  </Container>
);

AddLibrary.propTypes = {
  navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default AddLibrary;
