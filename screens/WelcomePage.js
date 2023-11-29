import React from 'react';
import { View, Text, TouchableOpacity, Dimensions,StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';
import LottieView from "lottie-react-native";
import { FontAwesome } from '@expo/vector-icons';


export default function WelcomePage({ navigation }) {


  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.appName}>Budget Defender</Text>
          <LottieView
            source={require('../images/animation.json')}
            autoPlay
            loop
            style={styles.logo}
          />
        
      </View>

      <Animatable.View 
          style={styles.footer}
          animation="fadeInUpBig"
      >
          <Text style={styles.title}>Illuminate Your Spendings, </Text>
          <Text style={styles.title}>Ignite Your Savings!</Text>

          <View style={styles.button}>
          <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
              <LinearGradient
                  colors={['#A6CF98', '#309797']}
                  style={styles.signIn}
              >
                  <Text style={styles.textSign}>Get Started</Text>
                  <FontAwesome name="arrow-circle-right" size={24} color="white" />
              </LinearGradient>
          </TouchableOpacity>
          </View>
      </Animatable.View>
    </View>
  );
};

const {height} = Dimensions.get("screen");
const height_logo = height * 0.4;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#309797'
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    top: '20%',
    textAlign: 'center',
    left: 0,
    right: 0,
    // textShadowColor: '#FEFAE0', 
    // textShadowOffset: {width: 0, height: 0},
    // textShadowRadius: 10,
  },
  logo: {
    width: 250, 
    height: 250, 
    alignSelf: 'center',
  },
  footer: {
      flex: 1,
      backgroundColor: '#F2FFE9',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo,
      alignSelf: 'center',
      marginRight: '5%'
  },
  title: {
      color: '#435585',
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 20
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 40
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold',
      marginRight: 8
  }
});
