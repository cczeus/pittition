import React from 'react';
import { StyleSheet, Text, View, ScrollView, Modal, Alert } from 'react-native';
import AppBar from '../../components/AppBar';
import Pittition from '../../components/Pittition';
import Trending from '../../components/Trending';
import CreatePittition from '../../components/CreatePittition';
import { height, width } from '../../utils/getDimensions';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    }
     this.handleOpenClose = this.handleOpenClose.bind(this);
  }
  
  handleOpenClose() {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  }
  render() {

    const img_url = "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50";
    return (
      <View style={styles.container}>
        <AppBar navigation={this.props.navigation} handleOpen={this.handleOpenClose}/>
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
