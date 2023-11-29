import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import MapView from "react-native-maps";
import { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';


export default function SelectLocation() {
    const balloonMarker = require('../images/markers/balloon.png');
    const heartMarker = require('../images/markers/heart.png');
    const starMarker = require('../images/markers/star.png');
    const redMarker = require('../images/markers/red.png');


  return (
    
    <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
            latitude: 49.2807357633535,
            longitude: -123.11568756751942,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
        }}
    >
        <Marker 
            coordinate={{
                latitude: 49.2807357633535,
                longitude: -123.11568756751942,
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
  )
}

const styles = StyleSheet.create({

    map: {
      height: '100%'
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