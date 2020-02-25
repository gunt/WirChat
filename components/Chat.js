import KeyboardSpacer from 'react-native-keyboard-spacer';
import React, { Component } from "react";
import { StyleSheet, View, Text, Platform, AsyncStorage } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import NetInfo from "@react-native-community/netinfo";

const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
      messages: [],
      user: {
        _id: '',
        name: '',
        avatar: ''
      },
      uid: 0
    }

    var firebaseConfig = {
      apiKey: "AIzaSyBG3PvN4FYZI7hPaHUoWZlXui6I4eTU1Ss",
      authDomain: "chatr-de81d.firebaseapp.com",
      databaseURL: "https://chatr-de81d.firebaseio.com",
      projectId: "chatr-de81d",
      storageBucket: "chatr-de81d.appspot.com",
      messagingSenderId: "1099391712733",
      appId: "1:1099391712733:web:d0b450bfe9ace063ef0a34",
      measurementId: "G-0XD433W9WD"
    };

    if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    }

    this.referenceMessages = firebase.firestore().collection('messages');
  }

  //Using NetInfo: exposes info about online/offline status NetInfo.
  componentDidMount(){
    NetInfo.fetch().then(state => {
      if (state.isConnected){
        this.setState({
          isConnected: true
        });
      }
      if (state.isConnected) {
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async user => {
          if (!user) {
            await firebase.auth().signInAnonymously();
          }

          if (this.props.navigation.state.params.name){
            this.setUser(user.uid, this.props.navigation.state.params.name);
          } else {
            this.setUser(user.uid);
          }

          this.setState({
            uid: user.uid,
            loggedInText: 'TeleG Chat'
          });

          this.unsubscribe = this.referenceMessages.onSnapshot(this.onCollectionUpdate);
        });
      } else {
        this.setState({
          isConnected: false
        });
        this.getMessages();
      }
    });
  }

  componentWillUnmount() {
    this.authUnsubscribe();
    this.unsubscribe();
  }

  setUser = (_id, name = "Anonymous") => {
    this.setState({
      user: {
        _id: _id,
        name: name,
        avatar: "https://placeimg.com/140/140/any"
      }
    });
  }

  addMessage(){
    this.referenceMessages.add({
      _id: this.state.messages[0]._id,
      text: this.state.messages[0].text || '',
      createdAt: this.state.messages[0].createdAt,
      user: this.state.user,
      uid: this.state.uid
    });
  }

  //asyncStorage implementation
  getMessages = async () => {
    let messages = [];
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (err){
      console.log(err.message);
    }
  };

  saveMessages = async () => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (err){
      console.log(err.message);
    }
  };

  //asyncStorage delete Function
  deleteMessages = async () => {
    try {
      await AsyncStorage.removeItem('messages');
    } catch (err){
      console.log(err.message);
    }
  };

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }),
    () => {
      this.addMessage();
      this.saveMessages();
    });
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    querySnapshot.forEach(doc => {
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user
      });
    });
    this.setState({
      messages
    });
  };

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#333"
          },
          left: {
            backgroundColor: "#FFB"
          }
        }}
      />
    );
  }

  renderInputToolbar(props){
    if (this.state.isConnected){
      return(
        <InputToolbar
          {...props}
        />
      );
    }
  }

  //Sets the title in the Navigation Bar up top
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.name
    };
  };

render(){
  return (
    <View style={{flex: 1, backgroundColor: this.props.navigation.state.params.color}}>
    {/* rendering your chat interface   */}
    <Text>{this.state.loggedInText}</Text>
    <GiftedChat
          // renderBubble={this.renderBubble}
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={this.state.user}
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