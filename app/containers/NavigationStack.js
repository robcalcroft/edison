import { AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Libraries from '../screens/Libraries';
import AddLibrary from '../screens/AddLibrary';
import Library from '../screens/Library';
import { KEY_LIBRARIES } from '../constants/globals';

export default async () => {
  let hasLibraries = false;

  try {
    const libraries = await AsyncStorage.getItem(KEY_LIBRARIES);

    if (libraries) {
      hasLibraries = true;
    }
  } catch (error) {
    console.log(error.message);
  }

  return StackNavigator({
    AddLibrary: {
      screen: AddLibrary,
      navigationOptions: {
        headerTitle: 'Add Library',
      },
    },
    Libraries: {
      screen: Libraries,
      navigationOptions: {
        headerTitle: 'Libraries',
      },
    },
    Library: {
      screen: Library,
    },
  }, {
    initialRouteName: hasLibraries ? 'Libraries' : 'AddLibrary',
  });
};
