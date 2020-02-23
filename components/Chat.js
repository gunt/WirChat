import React, { Component } from 'react';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { StyleSheet, View, Text, Platform } from "react-native";
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const firebase = require('firebase');
require('firebase/firestore');



export default class Chat extends React.Component {
  // creation of the state object
  //A chat app needs to send, receive, and display messages, so it makes sense to add messages into the state object.
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      user: {
        _id: '',
        name: '',
        avatar: ''
      },
      uid: 0
    }

    var firebaseConfig = {
      apiKey: "AIzaSyB-i22Bh0y9bzHMboFVLerRrTTCqznUcQo",
    authDomain: "chatapp-00777.firebaseapp.com",
    databaseURL: "https://chatapp-00777.firebaseio.com",
    projectId: "chatapp-00777",
    storageBucket: "chatapp-00777.appspot.com",
    messagingSenderId: "325168557156",
    appId: "1:325168557156:web:7eb6b38071d4e463ce0371",
    measurementId: "G-P4PX54H1E3"
    };

    if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    }

    this.referenceMessages = firebase.firestore().collection('messages');
  }




  //each element of the UI displayed on screen right away using the setState() function
  //componentWillMount() is a deprecated method.
  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/tech',
          },
        },
        {
          _id: 2,
          text: this.props.navigation.state.params.name + ' has entered the chat',
          createdAt: new Date(),
          system: true,
  },
      ],
    })
  }
  
  //custom function named onSend() when a user sends a message. 
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          }
        }}
      />
    )
  }

  render(){
  return (
    <View style={{flex: 1, backgroundColor: this.props.navigation.state.params.color}}>
    {/* rendering your chat interface   */}
    <GiftedChat
          // renderBubble={this.renderBubble}
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1
          }}
        />
        {Platform.OS === "android" ? <KeyboardSpacer topSpacing={55} /> : null }
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
    width: '100%',
  },
});