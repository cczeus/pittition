import React from 'react';
import { StyleSheet, Text, View, ScrollView, Modal, TouchableWithoutFeedback, Picker } from 'react-native';
import { connect } from 'react-redux';

import { fetchPittitionFromAPI, getActivePittition } from '../../redux/actions';

import SideMenu from 'react-native-side-menu';
import AppBar from '../../components/AppBar';
import Pittition from '../../components/Pittition';
import Trending from '../../components/Trending';
import CreatePittition from '../../components/CreatePittition';
import MySideMenu from '../../components/SideMenu';
import { height, width } from '../../utils/getDimensions';

import Moment from 'moment'

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      sidebarVisible: false,
      pittitions: props.pittition.pittition
    }
     this.handleOpenClose = this.handleOpenClose.bind(this);
     this.handleSidebarToggle = this.handleSidebarToggle.bind(this);
     this.handleCreatePittition = this.handleCreatePittition.bind(this);
     this.sortByPopularity = this.sortByPopularity.bind(this);
     this.sortByDate = this.sortByDate.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(
      fetchPittitionFromAPI()
    );
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      pittitions: this.initPittitions(nextProps.pittition.pittition),
    })
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

  handleViewPittition(props, i) {
    props.dispatch(
      getActivePittition(props.pittition.pittition[i])
    );
    props.navigation.navigate("PittitionScreen");
  }
  initPittitions(pittitions) {
    return pittitions.sort(function(pittA, pittB) {
      return pittB.likes.length - pittA.likes.length;
    });
  }
  sortByPopularity() {
    const pittitions = this.state.pittitions;
    pittitions.sort(function(pittA, pittB) {
      return pittB.likes.length - pittA.likes.length;
    });
    this.setState({ pittitions })
    return pittitions;
  }

  sortByDate() {
    const pittitions = this.state.pittitions;

    pittitions.sort(function(pittA, pittB) {
      const timeA = parseInt(new Date(pittA.date).getTime());
      const timeB = parseInt(new Date(pittB.date).getTime());

      return timeB - timeA;
    });

    this.setState({ pittitions })

  }

  handleCreatePittition(pittition) {
    const pittitions = this.state.pittitions;
    pittitions.unshift(pittition);
    this.setState({pittitions});
  }
  render() {

    if(this.props.pittition === []) return <View>Loading</View>;
    const img_url = "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50";

    const { pittition, isFetching } = this.props.pittition;

    const this_pt = this;
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

          <AppBar navigation={this.props.navigation} sortByPopularity={this.sortByPopularity} sortByDate={this.sortByDate} handleOpen={this.handleOpenClose} handleSidebarToggle={this.handleSidebarToggle} />

          <ScrollView style={scrollViewStyle} >
           {/* <Trending /> */}
            {
              this.state.pittitions.map(function(pitt, i){
                console.log(pitt.comments)
                return (
                  <TouchableWithoutFeedback key={i} onPress={() => { this_pt.handleViewPittition(this_pt.props, i) }}>
                    <View>
                      <Pittition 
                        id={pitt._id}
                        viewer={user.userName}
                        author={pitt.author}
                        date={Moment(pitt.date).fromNow()}
                        title={pitt.title}
                        description={pitt.description}
                        shares={pitt.shares}
                        followers={pitt.followers}
                        comments={pitt.comments}
                        likes={pitt.likes}
                        img_url={img_url} />
                    </View>
                  </TouchableWithoutFeedback>
                )
              })
            }
           
          </ScrollView>

          <Modal
            visible={this.state.modalVisible}
            animationType={'slide'}
         
            >
             <View>
                <CreatePittition user={user} handleCreatePittition={this.handleCreatePittition} handleClose={this.handleOpenClose} />
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
    activePittition: state.activePittition,
    user: state.user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getPittion: () => dispatch(fetchPittitionFromAPI()),
    getActivePittition: () => dispatch(getActivePittition())
  }
}


export const HomeScreenContainer = connect(
 mapStateToProps
)(HomeScreen);
// Overview = connect()(Overview);
export default HomeScreenContainer;
