import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Start from './components/Start';
import Chat from './components/Chat';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import KeyboardSpacer from 'react-native-keyboard-spacer';
const firebase = require("firebase");
require("firebase/firestore");

//navigation on app. start.js 1.Choose name & background color 2.Navigates to Chat.js
const navigator = createStackNavigator({
    Start: { screen: Start},
    Chat: { screen: Chat}
});

const navigatorContainer = createAppContainer(navigator);

export default navigatorContainer;