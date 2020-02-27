import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import firebase from "firebase";
import "firebase/firestore";

import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

export default class CustomActions extends Component {
  constructor(props){
    super(props);
  }

  pickImage = async () => {
    try{
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === "granted"){
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images
        }).catch(err => console.error(err.message));
        if (!result.cancelled){
          const imageUrl = await this.uploadImage(result.uri);
          this.props.onSend({ image: imageUrl });
        }
      }
    } catch(err) {
      console.error(err.message);
    }
  }

  takePhoto = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions. CAMERA);
      if(status === "granted"){
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images
        }).catch(err => console.error(err.message));
        if (!result.cancelled){
          const imageUrl = await this.uploadImage(result.uri);
          this.props.onSend({ image: imageUrl });
        }
      }
    } catch(err) {
      console.error(err.message);
    }
  }

  getLocation = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === "granted"){
        let result = await Location.getCurrentPositionAsync({}).catch(
          result = {
            location: {
              longitude: -38.119293,
              latitude: -16.489689
            }
          }
        );
        if (result) {
          this.props.onSend({
            location: {
              longitude: result.coords.longitude,
              latitude: result.coords.latitude
            }
          });
        }
      }
    } catch(err){
      console.error(err.message);
    }
  }

  uploadImage = async (uri) => {
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function(err) {
          console.error(err);
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      });
      let uriParts = uri.split('/');
      let imageName = uriParts[uriParts.length - 1];
      const ref = firebase.storage().ref().child(`${imageName}`);
      const snapshot = await ref.put(blob);
      blob.close();
      const imageUrl = await snapshot.ref.getDownloadURL();
      return imageUrl;
    } catch(err){
      console.error(err.message);
    }
  }

  onActionPress = () => {
    const options = ['Choose Image from Library', 'Take Picture', 'Send Location', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            return this.pickImage();
          case 1:
            return this.takePhoto();
          case 2:
            return this.getLocation();
          case 3:
            return null;
          default:
        }
      }
    );
  }

  render(){
    return(
      <TouchableOpacity
        style={styles.container}
        onPress={this.onActionPress}>
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
          <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10
  },
  wrapper: {
    borderRadius: 13,
    borderColor: "#333",
    borderWidth: 2,
    flex: 1
  },
  iconText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "transparent",
    textAlign: "center"
  }
});

CustomActions.contextTypes = {
  actionSheet: PropTypes.func
};