import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Measurer from './components/Measurer';

export default class App extends React.Component {
  render() {
    return (
        <View style={styles.wrapper}>
          <View style={styles.measureView}>
            <Measurer/>
          </View>
        </View>
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