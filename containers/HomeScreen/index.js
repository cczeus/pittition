import React from 'react';
import { StyleSheet, Text, View, ScrollView, Modal, Alert } from 'react-native';
import { connect } from 'react-redux';

import { fetchPittitionFromAPI } from '../../redux/actions';

import SideMenu from 'react-native-side-menu';
import AppBar from '../../components/AppBar';
import Pittition from '../../components/Pittition';
import Trending from '../../components/Trending';
import CreatePittition from '../../components/CreatePittition';
import MySideMenu from '../../components/SideMenu';
import { height, width } from '../../utils/getDimensions';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      sidebarVisible: false,
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
  render() {
    console.log(this.props);
    // const dispatch = this.props.dispatch(fetchPittitionFromAPI());
    const { pittition, isFetching } = this.props.pittition;

    const img_url = "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50";
    const menu = this.state.sidebarVisible ? <MySideMenu navigation={this.props.navigation} /> : <Text></Text>;
    return (
     
        <SideMenu menu={menu} isOpen={this.state.sidebarVisible}
        onChange={isOpen => this.handleSidebarToggle(isOpen)}
        >

          <AppBar navigation={this.props.navigation} handleOpen={this.handleOpenClose} handleSidebarToggle={this.handleSidebarToggle} />
          <ScrollView style={scrollViewStyle} >
            <Trending />
            {
              pittition.map(function(pitt, i){
                console.log(pitt);
                return  <Pittition 
                          key={i}
                          author={pitt.author}
                          title={pitt.title}
                          description={pitt.description}
                          shares={pitt.shares}
                          comments={pitt.comments}
                          likes={pitt.likes}
                          liked={true} 
                          img_url={img_url} />
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
    pittition: state.pittition
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getPittion: () => dispatch(fetchPittitionFromAPI())
  }
}


export const HomeScreenContainer = connect(
 mapStateToProps
)(HomeScreen);
// Overview = connect()(Overview);
export default HomeScreenContainer;
