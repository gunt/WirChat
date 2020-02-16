import React, { Component } from 'react';
import { StyleSheet, ImageBackground, Text, TextInput, Alert, TouchableOpacity, Button, View } from 'react-native';

export default class Chat extends React.Component {
  static navigationOptions = ({ navigation }) =>{
    return {
      title: navigation.state.params.name,
    }
  }
  render(){
  return (
    <View style={[styles.container, {backgroundColor: this.props.navigation.state.params.color}] }>
      <Text style={{color: '#FFFFFF'}}>This is your chat screen</Text>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});