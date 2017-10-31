import React from 'react';
import { Button, Modal, Text, TouchableHighlight, View } from 'react-native';

const NowPlaying = ({ modalVisible, showModal, hideModal }) => [
  <TouchableHighlight key={1} onPress={showModal}>
    <View style={{ height: modalVisible ? 0 : 50, backgroundColor: 'red', width: '100%' }}>
      <Text>NowPlaying</Text>
    </View>
  </TouchableHighlight>,
  <Modal
    animationType="slide"
    onRequestClose={hideModal}
    visible={modalVisible}
    key={2}
  >
    <View style={{ marginTop: 20 }}><Button onPress={hideModal} title="Close" /></View>
  </Modal>,
];

export default NowPlaying;
