import React from 'react';
import { StyleSheet, Text, View, ScrollView, Modal, Alert } from 'react-native';
import SideMenu from 'react-native-side-menu';
import AppBar from '../../components/AppBar';
import Pittition from '../../components/Pittition';
import Trending from '../../components/Trending';
import CreatePittition from '../../components/CreatePittition';
import MySideMenu from '../../components/SideMenu';
import { height, width } from '../../utils/getDimensions';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      sidebarVisible: false,
    }
     this.handleOpenClose = this.handleOpenClose.bind(this);
     this.handleSidebarToggle = this.handleSidebarToggle.bind(this);
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
    const img_url = "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50";
    const menu = this.state.sidebarVisible ? <MySideMenu navigation={this.props.navigation} /> : <Text></Text>;
    return (
     
        <SideMenu menu={menu} isOpen={this.state.sidebarVisible}
        onChange={isOpen => this.handleSidebarToggle(isOpen)}
        >

          <AppBar navigation={this.props.navigation} handleOpen={this.handleOpenClose} handleSidebarToggle={this.handleSidebarToggle} />
          <ScrollView style={scrollViewStyle} >
            <Trending />
            <Pittition liked={true} img_url={img_url} />
            <Pittition img_url={img_url}/>
            <Pittition liked={true} img_url={img_url}/>
            <Pittition img_url={img_url} />
            <Pittition img_url={img_url}/>
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
