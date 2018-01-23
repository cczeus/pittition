import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback, StyleSheet, Platform, ScrollView } from 'react-native';

// import { Toolbar } from 'react-native-material-ui';
// import { UITheme } from '../../utils/MuiTheme';
import { height, width } from '../../utils/getDimensions';
// import Icon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FoundationIcon from 'react-native-vector-icons/Foundation';

export default class Pittition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: true,
    };
  }
  render() {
  const C_UNSELECTED = '#BDBDBD';
  const C_SELECTED = '#64B5F6';
    return (
    	<View style={style}>
        
        <View style={styles.headerStyle}>
          <Image
            style={{ alignSelf: 'center', width: 50, height: 50, borderRadius: 25}}
            source={{uri: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'}} />
          <View style={{ padding: 5 }}>
            <Text style={{ fontSize: 16 }}>John Doe</Text>
            <Text style={{ fontSize: 12, color: '#9E9E9E' }}>8 hrs ago</Text>
          </View>
        </View>
        
        

        <View style={styles.contentStyle} />

        <View style={{...styles.lineStyle,...styles.lineStyleMargin}} />

        <View style={styles.actionsStyle}>
        
          <View style={styles.actionStyle}>
            <TouchableWithoutFeedback onPress={() => { this.setState({ liked: !this.state.liked }) }}>
              <FoundationIcon name="like" size={31} color={this.state.liked ? C_SELECTED : C_UNSELECTED}  />
            </TouchableWithoutFeedback>
              <Text style={{ fontSize: 12, color: C_UNSELECTED}}>3,213</Text> 
          </View>
          
          <View style={styles.actionStyle}>
            <FoundationIcon name="comments" size={25} color={C_UNSELECTED}/>
            <Text style={{ fontSize: 12, color: C_UNSELECTED }}>146</Text> 
          </View>
           <View style={styles.actionStyle}>
              <EntypoIcon name="share" size={25} color={C_UNSELECTED}  />
              <Text style={{ fontSize: 12, color: C_UNSELECTED }}>3,213</Text> 
          </View>
        
        </View>
      </View>
       
    );
  }
}


const styles = {
  headerStyle: {
    flex: 0.7,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  contentStyle: {
    // backgroundColor: 'red',
    flex: 1,
  },
  lineStyle: {
    // backgroundColor: 'blue',
    borderTopWidth: 1,
    borderColor:'#E0E0E0',
    marginBottom: 0
  },
  lineStyleMargin: {
    margin: 20,
  },
  actionsStyle: {
    flex: 0.25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  actionStyle: {

    flexDirection: 'column',
    alignItems: 'center',
  }
}
const style = {
  alignSelf: 'center',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '95%',
  backgroundColor: 'white',
  height: 230,
  borderRadius: 5,
  padding: 0,
  marginTop: 15,

  shadowColor: '#000000',
  shadowOffset: {
    width: 0,
    height: 3
  },
  shadowRadius: 5,
  shadowOpacity: 0.07
 
}


