import React from 'react';
import { View, Text, StyleSheet, Platform, ScrollView } from 'react-native';

// import { Toolbar } from 'react-native-material-ui';
// import { UITheme } from '../../utils/MuiTheme';
import { height, width } from '../../utils/getDimensions';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import EntypoIcon from 'react-native-vector-icons/Entypo';

export default class Pittition extends React.Component {
  render() {
    return (
    	<View style={style}>
        
      </View>
       
    );
  }
}



const style = {
  alignSelf: 'center',
  width: '95%',
  backgroundColor: 'white',
  height: 135,
  borderRadius: 5,
  padding: 20,
  marginTop: 15,

  shadowColor: '#000000',
  shadowOffset: {
    width: 0,
    height: 3
  },
  shadowRadius: 5,
  shadowOpacity: 0.1
 
}


