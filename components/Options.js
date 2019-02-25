import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';

class Options extends React.Component {
  render() {
    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity style={styles.button} onPress={this.props._toggle}>
                <Text>Toggle</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this.props._fast} >
                <Text>Fast</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this.props._slow} >
                <Text>Slow</Text>
            </TouchableOpacity>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        marginTop: 15,
        width: 400
    },
    button: {
        flex: 1,
        width: 80,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c4fff5',
        padding: 10
    }
});

export default Options
