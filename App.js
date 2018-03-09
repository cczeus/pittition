import React from 'react';
import { StyleSheet, Text, View, ScrollView, Easing, Animated } from 'react-native';

import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, combineReduxers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import { fetchPittitionFromAPI } from './redux/actions'
import rootReducer from './redux/reducers/index.js'

import HomeScreen from './containers/HomeScreen';
import ProfileScreen from './containers/ProfileScreen';
import LoginScreen from './containers/LoginScreen';
import PittitionScreen from './containers/PittitionScreen';
import AppBar from './components/AppBar';
// import reducer './redux/reducers'

import {  
  StackNavigator,
} from 'react-navigation';


const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore)

const store = createStore( rootReducer, applyMiddleware( thunkMiddleware ));

const Navigation = StackNavigator({
  Login: { 
    screen: LoginScreen,
  },
  Home: { 
    screen: HomeScreen,
  },
  PittitionScreen: {
    screen: PittitionScreen,
  },
  Profile: { 
    screen: ProfileScreen,
  },
},{ 
    headerMode: 'none',
  //   transitionConfig : () => ({
  //   transitionSpec: {
  //     duration: 0,
  //     timing: Animated.timing,
  //     easing: Easing.step0,
  //   },
  // }) 
  }
);


export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}


// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App)

