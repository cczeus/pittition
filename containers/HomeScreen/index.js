import React from 'react';
import { StyleSheet, Text, View, ScrollView, Modal, TouchableWithoutFeedback, Picker } from 'react-native';
import { connect } from 'react-redux';
import CustomModal from 'react-native-modal'
import { fetchPittitionFromAPI, getActivePittition, updatePittitionStatusAPI, deletePittitionFromAPI } from '../../redux/actions';

import SideMenu from 'react-native-side-menu';
import IonIcon from 'react-native-vector-icons/Ionicons';

import AppBar from '../../components/AppBar';
import Pittition from '../../components/Pittition';
import Trending from '../../components/Trending';
import CreatePittition from '../../components/CreatePittition';
import MySideMenu from '../../components/SideMenu';
import { height, width } from '../../utils/getDimensions';

import Moment from 'moment'

const pittitionStatuses = [
  {
    status: 'In Process',
    description: 'You have viewed the pittition and looking into it',
  },
  {
    status: 'Resolved',
    description: 'A solution has been proposed and accepted',
  },
  {
    status: 'Dismissed',
    description: 'The problem raised by the Pittition is infeasible',
  },
  {
    status: 'Remove',
    description: ' The Pittition violates the guidelines and will be removed entirely',
  },
 
]

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
    if(value === 'update status') {
      this.setState({
        statusModalVisible: !this.state.statusModalVisible,
      });
    }
    else if(value === 'delete') {
      this.handleDeletePittition()
    }
  }

  // TODO -> Fix issue: Creating a pittition and deleting it without refreshing server causes server side error, because no ID is assigned
  //                    to pittition until after server refresh. Need to use Redux for this
  handleDeletePittition() {
     const pittitions = this.state.pittitions;

      this.props.dispatch(
        deletePittitionFromAPI(pittitions[this.state.activePittitionOpen]._id)
      )
      pittitions.splice(this.state.activePittitionOpen, 1);
      this.setState({ pittitions, statusModalVisible: false });
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
    console.log("Hello");
    const pittitions = this.state.pittitions;
    pittitions.sort(function(pittA, pittB) {
      return pittB.likes.length - pittA.likes.length;
    });
    this.setState({ pittitions })
    return pittitions;
  }

  sortByDate() {
    console.log("Hello1");
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
    if(!newStatus) this.setState({ statusModalVisible: false });
    else if(newStatus === currentStatus) return;
    else if(newStatus === 'Removed')  this.handleDeletePittition();
    else {
      this.props.dispatch(
        updatePittitionStatusAPI(this.state.pittitions[index]._id, newStatus)
      );
      pittitions[index].status = newStatus;

      this.setState({ pittitions, statusModalVisible: false });
    }
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
                        img_url={pitt.img_url}
                        date={Moment(pitt.date).fromNow()}
                        title={pitt.title}
                        description={pitt.description}
                        status={pitt.status}
                        shares={pitt.shares}
                        followers={pitt.followers}
                        comments={pitt.comments}
                        likes={pitt.likes}
                        handleClickOption={this_pt.handleClickOption} 
                        handleOpenCloseStatus={this_pt.handleOpenCloseStatus}/>
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
          <CustomModal isVisible={this.state.statusModalVisible}>
              <View style={styles.modalStyle}>
                <View style={{ flexDirection: 'column', flex: 1 }}>
                
                  <View style={{ flexDirection: 'row', flex: 0.6, alignItems: 'center', paddingLeft: 20 }}>
                    <Text style={{ fontSize: 20 }}>Update Status</Text>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', paddingRight: 20 }}>
                      <TouchableWithoutFeedback onPress={() => this.handleUpdateStatus()}>
                        <IonIcon name="ios-close" size={40} color='black' style={{ alignSelf: 'flex-end' }}/>
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
                  {

                  pittitionStatuses.map(function(status, i) {
                    if(this_pt.state.pittitions[0] === undefined)  return 

                    const selected = this_pt.state.pittitions[this_pt.state.activePittitionOpen].status === status.status;
                    const style = selected ? styles.activeStatusStyle : styles.statusStyle;
                    const color = selected ? '#42A5F5' : 'gray';
                    const fontWeight = selected ? 'bold' : '500';
                    return (
                      <TouchableWithoutFeedback key={i} onPress={ () => {this_pt.handleUpdateStatus(status.status)}}>
                        <View style={style}>
                          <Text style={{ fontSize: 20, color, fontWeight }}>{status.status}</Text>
                          <Text style={{ color: 'gray' }}>{status.description}</Text>
                        </View>
                      </TouchableWithoutFeedback>
                    )
                  })
                }
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
    height: '60%',
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  statusStyle:{
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
   activeStatusStyle:{
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#F7F8FC',
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    borderTopColor: '#E0E0E0',
    borderTopWidth: 1,
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
