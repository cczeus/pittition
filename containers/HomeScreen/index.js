import React from 'react';
import { StyleSheet, Text, View, ScrollView, Modal, TouchableWithoutFeedback, Picker } from 'react-native';
import { connect } from 'react-redux';
import CustomModal from 'react-native-modal'
import { fetchPittitionFromAPI, getActivePittition, updatePittitionStatusAPI } from '../../redux/actions';

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
      pittitions: props.pittition.pittition,
      statusModalVisible: false,
      activePittitionOpen: 0,
    }
    this.handleOpenClose = this.handleOpenClose.bind(this);
    this.handleSidebarToggle = this.handleSidebarToggle.bind(this);
    this.handleCreatePittition = this.handleCreatePittition.bind(this);
    this.sortByPopularity = this.sortByPopularity.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
    this.handleClickOption = this.handleClickOption.bind(this);
    this.handleOpenCloseStatus = this.handleOpenCloseStatus.bind(this);
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
  handleOpenCloseStatus(idx, value) {
    console.log("VALUE " + value)
    if(value === 'update status') {
      this.setState({
        statusModalVisible: !this.state.statusModalVisible,
      });
    }
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

  handleClickOption(activePittitionOpen) {
    this.setState({ activePittitionOpen })
  }

  handleUpdateStatus(newStatus) {
    const index = this.state.activePittitionOpen;
    const pittitions = this.state.pittitions;
    const currentStatus = pittitions[index].status;
    if(newStatus === currentStatus) return;

    this.props.dispatch(
      updatePittitionStatusAPI(this.state.pittitions[index]._id, newStatus)
    );
    pittitions[index].status = newStatus;
    this.setState({ pittitions, statusModalVisible: false });
  }

  handleCreatePittition(pittition) {
    const pittitions = this.state.pittitions;
    pittitions.unshift(pittition);
    this.setState({ pittitions });
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
                return (
                  <TouchableWithoutFeedback key={i} onPress={() => { this_pt.handleViewPittition(this_pt.props, i) }}>
                    <View>
                      <Pittition
                        num={i}
                        id={pitt._id}
                        viewer={user}
                        author={pitt.author}
                        date={Moment(pitt.date).fromNow()}
                        title={pitt.title}
                        description={pitt.description}
                        status={pitt.status}
                        shares={pitt.shares}
                        followers={pitt.followers}
                        comments={pitt.comments}
                        likes={pitt.likes}
                        img_url={img_url}
                        handleClickOption={this_pt.handleClickOption} 
                        handleOpenCloseStatus={this_pt.handleOpenCloseStatus}/>
                    </View>
                  </TouchableWithoutFeedback>
                )
              })
            }
           
          </ScrollView>

          <Modal
            visible={false}
            animationType={'slide'}
         
            >
             <View>
                <CreatePittition user={user} handleCreatePittition={this.handleCreatePittition} handleClose={this.handleOpenClose} />
             </View>
          </Modal>
          <CustomModal isVisible={this.state.statusModalVisible}>
              <View style={styles.modalStyle}>
                <View style={{ flexDirection: 'column', flex: 1 }}>
                  <View style={{ flexDirection: 'row', flex: 0.3, borderBottomColor: '#E0E0E0', borderBottomWidth: 1, alignItems: 'center'}}>
                    <Text>Update Status</Text>
                  </View>
                  <TouchableWithoutFeedback onPress={ () => {this.handleUpdateStatus('In Process')}}>
                    <View style={styles.statusStyle}>
                      <Text style={{ fontSize: 20 }}>In Process</Text>
                      <Text style={{ color: 'gray' }}>You have viewed the pittition and looking into it</Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={ () => {this.handleUpdateStatus('Resolved')}}>
                    <View style={styles.statusStyle}>
                      <Text style={{ fontSize: 20 }}>Resolved</Text>
                      <Text style={{ color: 'gray'}}>A solution has been proposed and accepted</Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={ () => {this.handleUpdateStatus('Dismissed')}}>
                    <View style={styles.statusStyle}>
                      <Text style={{ fontSize: 20 }}>Dismissed</Text>
                      <Text style={{ color: 'gray'}}>The problem raised by the Pittition is infeasible</Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={ () => {this.handleUpdateStatus('Removed')}}>
                    <View style={styles.statusStyle}>
                      <Text style={{ fontSize: 20 }}>Remove</Text>
                      <Text style={{ color: 'gray'}}>The Pittition violates the guidelines and will be removed entirely</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
          </CustomModal>
        </SideMenu>
     
    );
  }
}

const styles = StyleSheet.create({
  modalStyle: {
    backgroundColor: "white",
    height: '50%',
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  statusStyle:{
    alignItems: 'center',
    paddingBottom: 20,
  },
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
