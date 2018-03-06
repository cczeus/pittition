import React from 'react';
import { View, Text, StyleSheet, Platform, ScrollView, TouchableWithoutFeedback, TextInput } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import IonIcon from 'react-native-vector-icons/Ionicons';



export default class AppBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 1
    }
  }
  render() {
    const radio_props = [
      { label: 'I agree to the terms and conditions', value: 0 },
    ];
    return (
    	<View style={{ height: '100%', marginTop: 0}}>
        <View style={{ flexDirection: 'column', backgroundColor: '#42A5F5', flex: 0.4, height: '100%', alignItems: 'flex-start', padding: 25  }}>
          <View style={{ flexDirection: 'row', flex: 1, alignSelf: 'flex-end', marginTop: 20  }}>
            <TouchableWithoutFeedback onPress={() => this.props.handleClose()}>
              <IonIcon name="ios-close" size={60} color='white' />
            </TouchableWithoutFeedback>
          </View>
            <Text style={{ color: 'white', fontSize: 24, fontWeight: '700', alignSelf: 'center', marginTop: 10  }}>Create a Pittition</Text>
        </View>
      
        <View style={{ flexDirection: 'column', flex: 0.1, height: '100%', marginTop: 50  }}>
          <View style={{ flexDirection: 'row', flex: 1, padding: 15 }}>
            <TextInput
              style={{ padding: 10, width: '100%', height: 40, borderWidth: 0, backgroundColor: '#F7F8FC' }}
              placeholder="The Problem" />
          </View>
        </View>
          <View style={{ flexDirection: 'column', flex: 0.8, height: '100%' }}>
            <View style={{ flexDirection: 'row', flex: 1, padding: 15 }}>
              <TextInput
                style={{ padding: 10, width: '100%', marginTop: 50, height: 100, borderWidth: 0, backgroundColor: '#F7F8FC' }}
                placeholder="Describe it" 
                multiline={true}/>
            </View>
          </View>
          <View>
            <RadioForm
              radio_props={radio_props}
              initial={this.state.value}
              borderWidth={1}
              buttonSize={15}
              buttonOuterSize={25}
              onPress={(value) => { this.setState({value: 1 }) }} />
          </View>
           <View style={{ flexDirection: 'column', flex: 1, height: '100%', paddingTop: 15, paddingLeft: 25, paddingRight: 25}}>
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


