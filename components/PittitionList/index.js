import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback, StyleSheet, Platform, ScrollView, Share } from 'react-native';
import Pittition from '../../components/Pittition';

export default class PittitionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pittitions: props.pittitions
    };
  }

  render() {
    const img_url = "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50";
    // const img_url = "../../img/demo.jpg";
    var { user } = this.props.user;
    try {
      user = JSON.parse(user);
    } catch(error) {
      user = {}
    }
    return (
      <ScrollView style={scrollViewStyle} >
        {
          this.props.pittitions.map( (pitt, i) => {
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
                followers={pitt.followers} />
            )
          })
        }
      </ScrollView>
    )
  }
}

const scrollViewStyle = {
  // marginTop: height/7.5,
  width: '100%',
}