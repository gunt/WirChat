<!-- Title -->
<h1 align="center">
Chat APP - Expo React Native
</h1>

<!-- Title -->
<h2 align="center">
Made with love by  -- gunt --
</h2>

The chat app project was created with React-Native app using [Expo Cli](https://github.com/expo).

You will also need a [Firebase Account](https://firebase.google.com/).
Firebase is Google's mobile platform that helps you quickly develop high-quality apps

## Table of Contents

- [Recommendations](#recomendations)
- [Installation](#installation)
- [Creating the APP](#creating-the-app)
- [Clear/reset the Cache](#clear-the-cache)
- [Dependencies](#dependencies)

## Recomendations

For this project, I use `npm install` & `expo install`.

You can use yarn or npm to install all the required libraries.
It is a matter of personal choice, but both have their advantages.

The `expo install` will install compatible dependencies that works with your current setup.

`npm install` will look for the latest dependency library the output might cause your App not to work properly.

Read more at [Difference expo install versus npm install](https://forums.expo.io/t/difference-expo-install-versus-npm-install/31388)

## Installation

To install expo globally run:
npm install expo-cli --global

## Creating the App

To create an expo react native App use the command expo init plus the name of your App.
In this case:
expo init chatApp

## Clear the Cache

Sometimes you may need to reset or clear the React Native packager's cache. To do so, run after `npm start or expo start:`

```
expo r -c
# or
shift + r
```

## Dependencies

@react-native-community/masked-view": "^0.1.6",<br />
"@react-native-community/netinfo": "^4.6.0",<br />
"@reason-react-native/safe-area-context": "^0.6.0",<br />
"base-64": "^0.1.0",<br />
"expo": "~36.0.0",<br />
"expo-location": "~8.0.0",<br />
"firebase": "^7.9.1",<br />
"react-dom": "~16.9.0",<br />
"react-native": "^0.61.5",<br />
"react-native-gesture-handler": "~1.5.0",<br />
"react-native-gifted-chat": "^0.13.0",<br />
"react-native-keyboard-spacer": "^0.4.1",<br />
"react-native-maps": "0.26.1",<br />
"react-native-reanimated": "~1.4.0",<br />
"react-native-safe-area-context": "0.6.0",<br />
"react-native-safe-area-view": "^1.0.0",<br />
"react-navigation": "^4.1.1",<br />
"react-navigation-stack": "^2.1.1",<br />
"react-web-gifted-chat": "^0.6.7",<br />
"reason-react": "^0.7.0",<br />
"reason-react-native": "^0.61.0",<br />
"expo-permissions": "~8.0.0",<br />
"expo-image-picker": "~8.0.1"<br />
