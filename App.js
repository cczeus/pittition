import React from 'react';
import { StyleSheet, Text, View, ScrollView, Easing, Animated } from 'react-native';
import HomeScreen from './containers/HomeScreen';
import ProfileScreen from './containers/ProfileScreen';
import AppBar from './components/AppBar';
import {  
  StackNavigator,
} from 'react-navigation';


const Navigation = StackNavigator({
  Home: { 
    screen: HomeScreen,
  },
  Profile: { 
    screen: ProfileScreen,
  },
},{ 
    headerMode: 'none',
    transitionConfig : () => ({
    transitionSpec: {
      duration: 0,
      timing: Animated.timing,
      easing: Easing.step0,
    },
  }) 
  }
);

export default class App extends React.Component {

  render() {
    return (
      <Navigation />
    );
  }
}

