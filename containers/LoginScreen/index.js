import React from 'react';
import { View, Text, StyleSheet, Platform, ScrollView, TouchableWithoutFeedback, TextInput } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import IonIcon from 'react-native-vector-icons/Ionicons';

export default class ProfileScreen extends React.Component {
  render() {
    return (
     <View style={{ height: '100%', marginTop: 0}}>
        <View style={{ flexDirection: 'column', backgroundColor: '#42A5F5', flex: 0.4, height: '100%', alignItems: 'flex-start', padding: 25  }}>
          <View style={{ flexDirection: 'row', flex: 1, alignSelf: 'flex-start', marginTop: 20  }}>
            <View style={{ alignSelf: 'center', marginTop: 10  }}><Text style={{ color: 'white', fontSize: 28, fontWeight: '300' }}><Text style={{ fontWeight: 'bold'}}>Pitt</Text>ition</Text></View>
          </View>
            <Text style={{ color: 'white', fontSize: 24, fontWeight: '700', alignSelf: 'center', marginTop: 10  }}>Sign in</Text>
        </View>
      
        <View style={{ flexDirection: 'column', flex: 0.1, height: '100%', marginTop: 50  }}>
       
        </View>
          <View style={{ flexDirection: 'row', padding: 15, alignSelf: 'center' }}>
           <View style={{  alignItems: 'center', justifyContent: 'center', backgroundColor: '#42A5F5', height: 50,  width: 50 }}>
              <IonIcon name="md-person" color="white" size={25} />
           </View>
            <TextInput
              style={{ padding: 10, width: '80%', height: 50, borderWidth: 0, backgroundColor: '#F7F8FC' }}
              placeholder="Username" />
          </View>
          <View style={{ flexDirection: 'column', flex: 0.8, height: '100%' }}>
            <View style={{ flexDirection: 'row', padding: 15, alignSelf: 'center' }}>
           <View style={{  alignItems: 'center', justifyContent: 'center', backgroundColor: '#42A5F5', height: 50,  width: 50 }}>
              <IonIcon name="md-lock" color="white" size={25} />
           </View>
            <TextInput
              style={{ padding: 10, width: '80%', height: 50, borderWidth: 0, backgroundColor: '#F7F8FC' }}
              placeholder="Password" />
          </View>
          </View>
          
           <View style={{ flexDirection: 'column', flex: 1, height: '100%', paddingTop: 15, paddingLeft: 25, paddingRight: 25}}>
              <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Home")}>
                <View style={{ backgroundColor: '#42A5F5', height: 60, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: 'white', alignSelf: 'center', fontSize: 20}}>Sign in</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#F7F8FC',
    height: '100%'


  },
});

const scrollViewStyle = {
  // marginTop: height/7.5,
  width: '100%',

}
