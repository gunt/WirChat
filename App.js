import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Start from './components/Start';
import Chat from './components/Chat';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import KeyboardSpacer from 'react-native-keyboard-spacer';

// local setup fixing errors
// you must first run the code in the chatApp directory 
// npm install base-64 when it shows that the variable atob() and btoa() are missing.
//https://www.npmjs.com/package/base-64
import {decode, encode} from 'base-64'

if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}

const navigator = createStackNavigator({
    Start: { screen: Start},
    Chat: { screen: Chat}
});

const navigatorContainer = createAppContainer(navigator);

export default navigatorContainer;