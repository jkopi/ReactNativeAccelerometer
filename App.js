import React, { Component } from 'react';
import { View, Text, StyleSheet, AppRegistry } from 'react-native';
import Measurer from './components/Measurer';

import Swiper from 'react-native-swiper';

export default class App extends React.Component {
  render() {
    return (

        <Swiper style={styles.wrapper}>
          <View style={styles.measureView}>
            <Measurer/>
          </View>
        </Swiper>

    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  measureView: {
    flex: 1,
  },
});
AppRegistry.registerComponent('accelerometerproject', () => Swiper);