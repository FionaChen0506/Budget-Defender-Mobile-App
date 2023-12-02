import { View, Text, StyleSheet, Image, Dimensions, Input } from 'react-native'
import React from 'react'
import MapView from "react-native-maps";
import { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import * as Location from "expo-location";
import { MAPS_API_KEY, PLACES_API_KEY } from "@env";
import { useNavigation } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Ionicons } from '@expo/vector-icons';

// map view dimensions
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const ASPECT_RATIO = windowWidth / windowHeight;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;



export default function SelectLocation({route, navigation}) {
    // markers
    const balloonMarker = require('../images/markers/balloon.png');
    const heartMarker = require('../images/markers/heart.png');
    const starMarker = require('../images/markers/star.png');
    const redMarker = require('../images/markers/red.png');

    // get user's current location
    const {currentLatitude, currentLongitude} = route.params;
    // console.log("currentLatitude: ", currentLatitude);
    // console.log("currentLongitude: ", currentLongitude);


  return (
    <View style={styles.container}>
      
      <View style={styles.searchBox}>

        <GooglePlacesAutocomplete
        placeholder='Search a Place'
        fetchDetails={true}
        debounce={1000}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}

        query={{
          key: PLACES_API_KEY,
          language: 'en',
          // only show nearby results
          // components: 'country:ca',
          location: `${currentLatitude},${currentLongitude}`,
          radius: 10000,
        }}
        
        onFail={(error) => console.error('Error using GooglePlacesAutocomplete: ', error)}
      />
      <Ionicons name="search" size={24} color="gray" />
    </View>

    <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
            latitude: currentLatitude,
            longitude: currentLongitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        }}
    >
        <Marker 
            coordinate={{
                latitude: currentLatitude,
                longitude: currentLongitude,
            }}
            // use balloon as icon and adjust size
            icon={{
                uri: Image.resolveAssetSource(balloonMarker).uri,
                width: 4, 
                height: 4, 
              }}

            title="This is a title"
            description="This is a description"
        >
            
            <Callout tooltip>
              <View>
                <View style={styles.bubble}>
                  <Text style={styles.name}>Favourite Restaurant</Text>
                  <Image 
                    style={styles.image}
                    source={require('../images/markers/heart.png')}
                  />
                </View>
                <View style={styles.arrowBorder} />
                <View style={styles.arrow} />
              </View>
            </Callout>

        </Marker>

    </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      // ...StyleSheet.absoluteFillObject,
      flex: 1,
      // justifyContent: "center",
      // alignItems: "center",
    },
    searchBox: {
      zIndex:1, 
      flex: 0.5,
      // flexDirection: 'row',
      // alignItems: 'center',
      // justifyContent: 'center',
      // position: 'absolute', 
      // width: '90%',
      // top: '5%', 
      // paddingRight: 10, 
      // height: 60, 
      // backgroundColor: 'white',
      // borderRadius: 10,
      // borderWidth: 1.5,
      // borderColor: 'gray',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
      zIndex:0,
      // height: '100%',
      // width: '100%',
    },

    bubble: {
      flexDirection: 'column',
      alignSelf: 'flex-start',
      backgroundColor: '#fff',
      borderRadius: 6,
      borderColor: '#ccc',
      borderWidth: 0.5,
      padding: 15,
      width: 150,
    },

    arrow: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderTopColor: '#fff',
      borderWidth: 16,
      alignSelf: 'center',
      marginTop: -32,
    },

    arrowBorder: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderTopColor: '#007a87',
      borderWidth: 16,
      alignSelf: 'center',
      marginTop: -0.5,

    },

    name: {
      fontSize: 16,
      marginBottom: 5,
    },

    image: {
      width: "100%",
      height: 80,
    },
  });