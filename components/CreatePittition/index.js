import React from 'react';
import { View, Text, StyleSheet, Platform, ScrollView, TouchableWithoutFeedback, TextInput } from 'react-native';

import IonIcon from 'react-native-vector-icons/Ionicons';

export default class AppBar extends React.Component {
  render() {
    return (
    	<View style={{ height: '100%', marginTop: 10 }}>
        <View style={{ flexDirection: 'column', flex: 0.2, height: '100%', alignItems: 'flex-start', padding: 25  }}>
          <View style={{ flexDirection: 'row', flex: 1, alignSelf: 'flex-end'  }}>
            <TouchableWithoutFeedback onPress={() => this.props.handleClose()}>
              <IonIcon name="ios-close" size={60} color='#42A5F5' />
            </TouchableWithoutFeedback>
          </View>
        </View>
        <Text style={{ color: 'black', fontSize: 24, fontWeight: '700', alignSelf: 'center', marginTop: 10  }}>Create a Pittition</Text>
        <View style={{ flexDirection: 'column', flex: 0.1, height: '100%', marginTop: 50  }}>
          <View style={{ flexDirection: 'row', flex: 1, padding: 15 }}>
            <TextInput
              style={{  width: '100%', height: 40, borderWidth: 0, backgroundColor: '#F7F8FC' }}
              placeholder="The Problem" />
          </View>
        </View>
          <View style={{ flexDirection: 'column', flex: 0.8, height: '100%' }}>
            <View style={{ flexDirection: 'row', flex: 1, padding: 15 }}>
              <TextInput
                style={{   width: '100%', marginTop: 50, height: 100, borderWidth: 0, backgroundColor: '#F7F8FC' }}
                placeholder="Describe it" />
            </View>
          </View>
           <View style={{ flexDirection: 'column', flex: 1, height: '100%', padding: 25 }}>
              <TouchableWithoutFeedback>
                <View style={{ backgroundColor: '#42A5F5', height: 60, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: 'white', alignSelf: 'center', fontSize: 20}}>Create Pittition</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
      </View>


       
    );
  }
}


