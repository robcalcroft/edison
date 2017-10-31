import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default () => (
  <View style={styles.container}>
    <ActivityIndicator animating size="large" />
  </View>
);
