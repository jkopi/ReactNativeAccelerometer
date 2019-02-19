import React, { Component } from 'react';
import { View, Text, StyleSheet, AppRegistry } from 'react-native';
import Measurer from './components/Measurer';
import Options from './components/Options';

import Swiper from 'react-native-swiper';

export default class App extends React.Component {
  render() {
    return (

        <Swiper style={styles.wrapper}>
          <View style={styles.slide1}>
            <Measurer/>
          </View>
          <View>
            <Options/>
          </View>
        </Swiper>

    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
});
AppRegistry.registerComponent('accelerometerproject', () => Swiper);