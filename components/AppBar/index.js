import React from 'react';
import { View, Text, StyleSheet, Platform, ScrollView } from 'react-native';

// import { Toolbar } from 'react-native-material-ui';
// import { UITheme } from '../../utils/MuiTheme';
import { height, width } from '../../utils/getDimensions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FoundationIcon from 'react-native-vector-icons/Foundation';

export default class AppBar extends React.Component {
  render() {
    return (
    	<View style={style}>
      {/*<View style={{ flexDirection: 'column', alignItems: 'center', flex: 1 }}>
          <FontAwesome name="fire" size={30} color='white' />
        </View>
        <View style={{ flexDirection: 'column', alignItems: 'center', flex: 1 }}>
          <FontAwesome name="fire" size={30} color='white' />
        </View> */}
        <View style={{ flex: 1 }}>
          <FoundationIcon name="align-left" size={30} color='white' style={{ marginLeft: 15 }} />
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <FoundationIcon name="home" size={30} color='white' />
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <EntypoIcon name="plus" size={30} color='white' style={{ marginRight: 15 }} />
        </View>
      </View>
       
    );
  }
}



const style = {
  flex: 0.08,
  flexDirection: 'row',
  alignItems: 'center',
  height: (Platform.OS === 'ios') ? 100 : 0, //this is just to test if the platform is iOS to give it a height of 20, else, no height (Android apps have their own status bar)
  backgroundColor: '#2196F3',
  height: height/7.5,
  paddingTop: (Platform.OS === 'ios') ? 30 : 0, //this is just to test if the platform is iOS to give it a height of 20, else, no height (Android apps have their own status bar)

  shadowColor: '#000000',
  shadowOffset: {
    width: 0,
    height: 3
  },
  shadowRadius: 5,
  shadowOpacity: 0.2
}


