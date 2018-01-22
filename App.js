import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import AppBar from './components/AppBar';
import Pittition from './components/Pittition';
import Trending from './components/Trending';
import { height, width } from './utils/getDimensions';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <AppBar />
        <ScrollView style={scrollViewStyle}>
          <Trending />
          <Pittition liked={true} />
          <Pittition />
          <Pittition liked={true} />
          <Pittition />
          <Pittition />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#F7F8FC',


  },
});

const scrollViewStyle = {
  // marginTop: height/7.5,
  width: '100%',

}
