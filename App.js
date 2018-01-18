import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import AppBar from './components/AppBar';
import Pittition from './components/Pittition';
import { height, width } from './utils/getDimensions';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <AppBar />
        <ScrollView style={scrollViewStyle}>
          <Pittition />
          <Pittition />
          <Pittition />
          <Pittition />
          <Pittition />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FC',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const scrollViewStyle = {
  marginTop: height/7.5,
  width: '100%',
  flex: 1,
}
