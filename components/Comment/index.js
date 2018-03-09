import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback, StyleSheet, Platform, ScrollView, Share } from 'react-native';

import { height, width } from '../../utils/getDimensions';

import EntypoIcon from 'react-native-vector-icons/Entypo';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
  	const { user, comment } = this.props;
  	const C_UNSELECTED = '#757575';
  	const img_url = "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50";
  	return (
  		<View style={{ flexDirection: 'column', flex: 1, backgroundColor: 'white', paddingLeft: 30, paddingTop: 25, paddingBottom: 25 }}>
        	<View style={{ alignSelf: 'flex-start', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
	           <Image
	            style={{ alignSelf: 'center', width: 40, height: 40, borderRadius: 20 }}
	            source={{uri: img_url}} />
	            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', paddingLeft: 10, width: '85%' }}>
	              <Text style={{ fontSize: 14, fontWeight: '500' }}>{user}</Text>
	              <Text style={{ fontSize: 16, color: C_UNSELECTED }}>{comment}</Text>
	            </View>
	        </View>
        </View>
  	)
  }
}