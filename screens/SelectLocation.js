import { View, Text, StyleSheet, Image, Dimensions, Input} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import MapView from "react-native-maps";
import { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { MAPS_API_KEY, PLACES_API_KEY } from "@env";
import { useNavigation } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Ionicons } from '@expo/vector-icons';
import PressableButton from '../components/PressableButton';

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

    const [selectedLocation, setSelectedLocation] = useState(null);
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const mapRef = useRef(null);


    const handleButtonPress = () => {
      if (selectedLocation) {
        navigation.navigate("Add An Expense", {
          location: selectedLocation,
        });
      }
    }


  return (
    <View style={styles.container}>
      
      <View style={styles.searchBox}>

        <GooglePlacesAutocomplete
          placeholder='Search a Place'
          fetchDetails={true}
          debounce={1000}
          onPress={(data, details = null) => {
            if (details) {
              const newLocation = {
                name: details.name,
                address: details.formatted_address,
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              }

              //show the button
              setIsButtonVisible(true);

          setSelectedLocation(newLocation);
          console.log(newLocation);
            
          // animate map to the selected location
          mapRef.current?.animateToRegion({
            ...newLocation,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }, 1000);
        }
        }}
      

        query={{
          key: PLACES_API_KEY,
          language: 'en',
          // only show nearby results
          location: `${currentLatitude},${currentLongitude}`,
          radius: 10000,
        }}
        
        onFail={(error) => console.error('Error using GooglePlacesAutocomplete: ', error)}
      />
      {/* <Ionicons name="search" size={24} color="gray" /> */}
    </View>

    <View style={styles.map}>
      <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
              latitude: currentLatitude,
              longitude: currentLongitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
          }}
      >

          {/* current location marker */}
          <Marker 
              coordinate={{
                  latitude: currentLatitude,
                  longitude: currentLongitude,
              }}
              onPress={() => {console.log("You are here")}}
          >

        
          </Marker>

          {/* selected location marker */}
          {selectedLocation && (
            <Marker 
              coordinate={{
                  latitude: selectedLocation.latitude,
                  longitude: selectedLocation.longitude,
              }}

              title={selectedLocation.name}
              description={selectedLocation.address}
          >


          </Marker>
          )}
      </MapView>


            {selectedLocation && isButtonVisible && (
              <View style={styles.locationDetailsContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.locationText}>
                      {selectedLocation.name}
                  </Text>
                  <Text style={styles.locationText}>
                      {selectedLocation.address}
                  </Text>
                </View>

                <PressableButton
                  pressedFunction={handleButtonPress}
                  pressedStyle={styles.buttonPressed}
                  defaultStyle={styles.buttonDefault}
                >
                    <Text style={styles.buttonText}>Add Location</Text>
                </PressableButton>
            </View>
            )}

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    searchBox: {
      zIndex:1, 
      flex: 0.5,
    },
    map: {
      ...StyleSheet.absoluteFillObject,
      zIndex:0,
      flex: 0.8,
    },
    locationDetailsContainer: {
      position: 'absolute',
      bottom: '20%',
      alignSelf: 'center',
      width: '80%',
    },
    textContainer: {
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
      borderColor: '#2D9596',
      borderWidth: 2,
      opacity: 0.8,
    },
    locationText: {
      fontSize: 16,
      color: '#2D9596', 
      fontWeight: 'bold',
      textAlign: 'center',
  },
    buttonDefault: {
      backgroundColor: '#309797',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 30,
        width: '60%',
        alignSelf: 'center',
    },
    buttonPressed: {
      backgroundColor: '#309797',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 30,
        opacity: 0.5,
        width: '60%',
        alignSelf: 'center',
    },
    buttonText: {
      color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },


  });