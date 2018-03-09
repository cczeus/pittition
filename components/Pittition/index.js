import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback, StyleSheet, Platform, ScrollView, Share } from 'react-native';

import { height, width } from '../../utils/getDimensions';

import EntypoIcon from 'react-native-vector-icons/Entypo';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'

export default class Pittition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      viewer: props.viewer,
      poster_name: props.name,
      profile_URL: props.img_url,
      posted_time: props.time,
      title: props.title,
      likes: props.likes,
      liked: props.likes.includes(props.viewer),
      status: props.status,
      description: props.description,
    };
  }
  handleClickLike() {
    const likes = this.state.likes;
    var liked = !this.state.liked;

    if(!this.state.liked) {
      likes.push(this.state.viewer);
    }
    else {
      const index =   likes.indexOf(this.state.viewer);
      if (index > -1) likes.splice(index, 1);
    }
    // TODO: Move into actions
    let data = {
      method: 'POST',
      body: JSON.stringify({ likes: likes }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
      }
    }
    fetch('http://localhost:3000/like/' + this.state.id, data)
        .then(response => {
          response.json()
        })
        .catch(function(error) {
          console.log('There was a problem: ' + error);
          liked = this.state.liked; // there was an issue so don't update UI
          throw error;
        });
  
     this.setState({ liked, likes })
  }
  handleClickShare() {
    Share.share(
      {
        title: this.state.title,
        message: this.state.description,
        url: 'https://facebook.com',
      }
    );
  } 

   

  render() {
    const C_UNSELECTED = '#BDBDBD';
    const C_SELECTED = '#64B5F6';
    const { id, viewer, author, title, description, shares, comments, likes, img_url } = this.props;

    return (
    	<View style={style}>
        
        <View style={styles.headerStyle}>
          <Image
            style={{ alignSelf: 'center', width: 50, height: 50, borderRadius: 25}}
            source={{uri: this.state.profile_URL}} />
          <View style={{ padding: 5 }}>
            <Text style={{ fontSize: 16, fontWeight: '400', marginLeft: 5 }}>{title}</Text>
            <Text style={{ fontSize: 14, color: '#9E9E9E', marginLeft: 5 }}>{author}</Text>
          </View>
          <View style={{ flex: 1, alignSelf: 'flex-start', alignItems: 'flex-end', padding: 10 }}>
            <SimpleLineIcon name="options-vertical" size={18} color={C_UNSELECTED}/>
          </View>
        </View>
        
        
  
        <View style={styles.contentStyle}>
          <Text style={{ fontSize: 14, color: '#757575', fontWeight: '400' }}>{description}</Text>
        </View>


      <View style={styles.metaDataStyle}>
          <Text style={{ color: '#47B536', fontWeight: '500'}}>Accepted</Text>
           {/*<Text style={{ paddingLeft: 5, color: '#9E9E9E'}}>8 hrs ago</Text>*/}
        </View>
        <View style={{...styles.lineStyle,...styles.lineStyleMargin}} />

        <View style={styles.actionsStyle}>
        
          <View style={styles.actionStyle}>
            <TouchableWithoutFeedback onPress={() => { this.handleClickLike() }}>
              <FoundationIcon name="like" size={31} color={this.state.liked ? C_SELECTED : C_UNSELECTED}  />
            </TouchableWithoutFeedback>
              <Text style={{ fontSize: 12, color: C_UNSELECTED, fontWeight: '500' }}>{likes.length}</Text> 
          </View>
          
          <View style={styles.actionStyle}>
            <FoundationIcon name="comments" size={25} color={C_UNSELECTED}/>
            <Text style={{ fontSize: 12, color: C_UNSELECTED, fontWeight: '500' }}>{comments.length}</Text> 
          </View>
           <View style={styles.actionStyle}>
            <TouchableWithoutFeedback onPress={() => { this.handleClickShare() }}>
              <EntypoIcon name="share" size={25} color={C_UNSELECTED}  />
            </TouchableWithoutFeedback>
            <Text style={{ fontSize: 12, color: C_UNSELECTED, fontWeight: '500' }}>{shares}</Text> 
          </View>
        
        </View>
      </View>
       
    );
  }
}


const styles = {
  headerStyle: {
    flex: 0.6,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  contentStyle: {
    // backgroundColor: 'red',
    marginTop: 15,
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  lineStyle: {
    // backgroundColor: 'blue',
    borderTopWidth: 1,
    borderColor:'#E0E0E0',
    marginBottom: 0
  },
  lineStyleMargin: {
    // margin: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  metaDataStyle: {
    marginLeft: 20,
    flexDirection: 'row'
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
  height: 245,
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


