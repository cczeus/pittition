import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import AppBar from '../../components/AppBar';

import { height, width } from '../../utils/getDimensions';

export default class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <AppBar navigation={this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#F7F8FC',
    height: '100%'


  },
});

const scrollViewStyle = {
  // marginTop: height/7.5,
  width: '100%',

}
