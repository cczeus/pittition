import React from 'react';
import { StyleSheet, Text, View, ScrollView, Modal, Alert, Image } from 'react-native';
import { connect } from 'react-redux';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FoundationIcon from 'react-native-vector-icons/Foundation';

import { getActivePittition } from '../../redux/actions';

import SideMenu from 'react-native-side-menu';
import AppBar from '../../components/AppBar';
import Pittition from '../../components/Pittition';
import Trending from '../../components/Trending';
import CreatePittition from '../../components/CreatePittition';
import MySideMenu from '../../components/SideMenu';
import { height, width } from '../../utils/getDimensions';

class PittitionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: props.activePittition.activePittition.likes.includes(JSON.parse(this.props.user.user).userName),
    }
  }


  render() {
    console.log("in screen " + this.state.liked);
    console.log(this.props.activePittition.activePittition.likes)
    console.log(JSON.parse(this.props.user.user).userName)
    if(this.props.pittition === []) return <View>Loading</View>;
    const img_url = "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50";
    
    const { activePittition } = this.props.activePittition;
    var { user } = this.props.user;
    try {
      user = JSON.parse(user);
    } catch(error) {
      user = {}
    }
    const C_UNSELECTED = '#BDBDBD';
    const C_SELECTED = '#64B5F6';
    const SIGN_COLOR = this.state.liked ? C_SELECTED : C_UNSELECTED
    // TODO fix JSON.parse()
    const menu = this.state.sidebarVisible ? <MySideMenu user={user} navigation={this.props.navigation} /> : <Text></Text>;
    return (
      <View style={{ flexDirection: 'column', flex: 1, backgroundColor: 'white' }}>
        <View style={{ alignSelf: 'flex-start', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 75}}>
          <EntypoIcon name="chevron-left" size={30} style={{ paddingRight: 10 }}/>
           <Image
            style={{ alignSelf: 'center', width: 60, height: 60, borderRadius: 30}}
            source={{uri: img_url}} />
            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', paddingLeft: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: '700' }}>{activePittition.title}</Text>
              <Text style={{ fontSize: 16, color: 'gray' }}>{activePittition.author}</Text>
            </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 25, paddingLeft: 25, paddingRight: 25 }}>
           <Text style={{ fontSize: 16, textAlign: 'left' }}>{activePittition.description} {activePittition.description}</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 25, paddingLeft: 10, paddingRight: 10, paddingTop: 10, width: '100%', borderTopColor: C_UNSELECTED, borderTopWidth: 1}}>
          
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
              <FoundationIcon name="like" size={31} color={SIGN_COLOR}  />
              <Text style={{ fontSize: 16, color: SIGN_COLOR, fontWeight: '700', paddingLeft: 5 }}>Sign</Text>
            </View>
          
           <View style={{ flexDirection: 'row',flex: 1, alignItems: 'center',justifyContent: 'center', alignSelf: 'center' }}>
              <FoundationIcon name="comments" size={25} color={C_UNSELECTED}/>
              <Text style={{ fontSize: 16, color: C_UNSELECTED, fontWeight: '700', paddingLeft: 5 }}>Comment</Text>
            </View>
            <View style={{ flexDirection: 'row',flex: 1, alignItems: 'center',justifyContent: 'center', alignSelf: 'center' }}>
               <EntypoIcon name="share" size={25} color={C_UNSELECTED}  />
              <Text style={{ fontSize: 16, color: C_UNSELECTED, fontWeight: '700', paddingLeft: 5 }}>Share</Text>
            </View>
        </View>
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

function mapStateToProps (state) {
  console.log("printing ");
  // console.log(navigation.state.params.user);
  return {
    activePittition: state.activePittition,
    user: state.user
  }
}

function mapDispatchToProps (dispatch) {
  return {
   
  }
}


export const PittitionContainer = connect(
 mapStateToProps
)(PittitionScreen);
// Overview = connect()(Overview);
export default PittitionContainer;
