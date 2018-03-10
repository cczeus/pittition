import React from 'react';
import { StyleSheet, Text, View, ScrollView, Modal, Alert } from 'react-native';
import { connect } from 'react-redux';

import { fetchPittitionFromAPI } from '../../redux/actions';

import SideMenu from 'react-native-side-menu';
import ProfileBar from '../../components/ProfileBar';
import Pittition from '../../components/Pittition';
import Trending from '../../components/Trending';
import CreatePittition from '../../components/CreatePittition';
import MySideMenu from '../../components/SideMenu';
import PittitionList from '../../components/PittitionList'
import { height, width } from '../../utils/getDimensions';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      sidebarVisible: false,
      pittitions: props.pittition.pittition.filter( (pt) => {
        return props.user.userName === pt.author;
      })
    }
     this.handleOpenClose = this.handleOpenClose.bind(this);
     this.handleSidebarToggle = this.handleSidebarToggle.bind(this);
     this.sortByYours = this.sortByYours.bind(this);
     this.sortByFollowed = this.sortByFollowed.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(
      fetchPittitionFromAPI()
    );
  }
  
  handleOpenClose() {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  }
  handleSidebarToggle(isOpen) {
    this.setState({
      sidebarVisible: isOpen,
    });
  }

  sortByYours() {
    var pittitions = this.props.pittition.pittition;

    pittitions = pittitions.filter( (pt) => {
      return this.props.user.userName === pt.author;
    });
    console.log("Pittitions: " + JSON.stringify(pittitions, null, 4))
    var state = this.state;
    state.pittitions = pittitions;
    this.setState(state)
  }

  sortByFollowed() {
    var pittitions = this.props.pittition.pittition;

    var username = JSON.parse(this.props.user.user).userName;
    pittitions = pittitions.filter( (pt) => {
      return pt.followers.includes(username);
    });
    var state = this.state;
    state.pittitions = pittitions;
    this.setState(state);
  }

  render() {
  
    if(this.props.pittition === []) return <View>Loading</View>;
    const img_url = "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50";
    // const img_url = "../../img/demo.jpg";
    var { user } = this.props.user;
    try {
      user = JSON.parse(user);
    } catch(error) {
      user = {}
    }

    // TODO fix JSON.parse()
    const menu = this.state.sidebarVisible ? <MySideMenu user={user} navigation={this.props.navigation} /> : <Text></Text>;
    return (
     
        <SideMenu 
          menu={menu} 
          isOpen={this.state.sidebarVisible}
          onChange={isOpen => this.handleSidebarToggle(isOpen)}
        >

          <ProfileBar navigation={this.props.navigation} handleOpen={this.handleOpenClose} handleSidebarToggle={this.handleSidebarToggle} sortByYours={this.sortByYours} sortByFollowed={this.sortByFollowed}/>
          <PL pittitions={this.state.pittitions} user={this.props.user}/>

          <Modal
            visible={this.state.modalVisible}
            animationType={'slide'}
         
            >
             <View>
                <CreatePittition handleClose={this.handleOpenClose}/>
             </View>
          </Modal>
        </SideMenu>
     
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
  return {
    pittition: state.pittition,
    user: state.user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getPittion: () => dispatch(fetchPittitionFromAPI())
  }
}

function mapStateToProps (state) {
  return {
    pittition: state.pittition,
    user: state.user
  }
}

function PL(props) {
  if(props.pittitions.length > 0) {
    return (<PittitionList pittitions={props.pittitions} user={props.user}/>)
  } else {
    return (<Text style={liststyle}>You have no pittitions.</Text>)
  }
}

export const ProfileContainer = connect(
 mapStateToProps
)(ProfileScreen);

const liststyle = {
  textAlign: 'center',
  color: '#999',
  fontSize: 20,
  marginTop: 50
} 

// Overview = connect()(Overview);
export default ProfileContainer;
