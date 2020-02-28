import React, { Component } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  View
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { GiftedChat } from 'react-native-gifted-chat';

/**
 * Five colors referenced values = strings
 * @constant
 * @type {string}
 */
const COLOR1 = '#EBC17A',
  COLOR2 = '#BC5653',
  COLOR3 = '#909D63',
  COLOR4 = '#6A879A',
  AllGEMEINE = '#727272';

/**
 * Start Screen
 * @exports Start
 */
export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      color: ''
    };
  }

  render() {
    return (
      //React Native component ImageBackground
      <ImageBackground
        source={require('../assets/backgroundImage.png')}
        style={styles.backImage}
      >
        <Text style={styles.title}>Gunther Chat App</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.nameBox}
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
            placeholder='Your Name'
          />
          <Text style={styles.text}>Choose Background Color:</Text>
          <View style={styles.colorSelection}>
            <TouchableOpacity
              onPress={() => this.setState({ colorScheme: `${COLOR1}` })}
              style={[styles.colorButton, styles.color1]}
            />
            <TouchableOpacity
              onPress={() => this.setState({ colorScheme: `${COLOR2}` })}
              style={[styles.colorButton, styles.color2]}
            />
            <TouchableOpacity
              onPress={() => this.setState({ colorScheme: `${COLOR3}` })}
              style={[styles.colorButton, styles.color3]}
            />
            <TouchableOpacity
              onPress={() => this.setState({ colorScheme: `${COLOR4}` })}
              style={[styles.colorButton, styles.color4]}
            />
          </View>
          <Button
            // style={styles.button}
            color={`${AllGEMEINE}`}
            title='Start Chatting'
            onPress={() =>
              this.props.navigation.navigate('Chat', {
                name: this.state.name,
                colorScheme: this.state.colorScheme
              })
            }
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAFA',
    alignItems: 'center',
    justifyContent: 'center',
    height: '44%',
    width: '88%',
    borderRadius: 31,
    marginBottom: 120,
    opacity: 0.8
  },
  backImage: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  nameBox: {
    fontSize: 16,
    fontWeight: '600',
    color: `${AllGEMEINE}`,
    borderWidth: 1,
    borderColor: `${AllGEMEINE}`,
    marginBottom: 30,
    marginTop: 30,
    width: '88%'
  },
  text: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083'
  },
  title: {
    flex: 1,
    alignItems: 'center',
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 75
  },
  colorSelection: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    margin: 15
  },
  colorButton: {
    height: 35,
    width: 35,
    borderRadius: 70,
    margin: 20
  },
  color1: {
    backgroundColor: `${COLOR1}`
  },
  color2: {
    backgroundColor: `${COLOR2}`
  },
  color3: {
    backgroundColor: `${COLOR3}`
  },
  color4: {
    backgroundColor: `${COLOR4}`
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    backgroundColor: `${AllGEMEINE}`,
    width: '88%',
    marginBottom: 30
  }
});
