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
import { height, width } from '../../utils/getDimensions';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      sidebarVisible: false,
      pittition: props.pittition.pittition
    }
     this.handleOpenClose = this.handleOpenClose.bind(this);
     this.handleSidebarToggle = this.handleSidebarToggle.bind(this);
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
    const pittitions = this.state.pittition;

    pittitions.filter( (pt) => {
      return this.props.user.userName === pt.author;
    });

    this.setState({ pittitions })
  }

  sortByFollowed() {
    console.log("STATE: " + JSON.stringify(this.state, null, 4));
    const pittitions = this.state.pittition;

    pittitions.filter( (pt) => {
      return pt.followers.includes(this.props.user.userName);
    });

    this.setState({ pittitions });
  }

  render() {
  
    if(this.props.pittition === []) return <View>Loading</View>;
    const img_url = "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50";
    // const img_url = "../../img/demo.jpg";
    const { pittition, isFetching } = this.props.pittition;
    this.state.pittitions = pittition;
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
          <ScrollView style={scrollViewStyle} >
            {
              this.state.pittitions.map( (pitt, i) => {
                  return (
                    <Pittition 
                      key={i}
                      id={pitt._id}
                      viewer={user.userName}
                      author={pitt.author}
                      title={pitt.title}
                      description={pitt.description}
                      shares={pitt.shares}
                      comments={pitt.comments}
                      likes={pitt.likes}
                      img_url={img_url}
                      followers={pitt.followers}
                    />
                  )
              })
            }
           
          </ScrollView>

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

export const ProfileContainer = connect(
 mapStateToProps
)(ProfileScreen);

// Overview = connect()(Overview);
export default ProfileContainer;
