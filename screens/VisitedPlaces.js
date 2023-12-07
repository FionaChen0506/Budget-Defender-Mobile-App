import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import { auth, database } from '../firebase/firebaseSetup';

// map view dimensions
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const ASPECT_RATIO = windowWidth / windowHeight;
const LATITUDE_DELTA = 0.4;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function VisitedPlaces() {
    // markers
    const balloonMarker = require('../images/markers/balloon.png');
    const heartMarker = require('../images/markers/heart.png');
    const starMarker = require('../images/markers/star.png');
    const redMarker = require('../images/markers/red.png');


    const [markers, setMarkers] = useState([]);
    const [userUid, setUserUid] = useState(null);
  
    useEffect(() => {
      // Listen for authentication state to change.
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserUid(user.uid);
          fetchDataForUser(user.uid);
        } else {
          // User is signed out
          setUserUid(null);
        }
      });

      return () => unsubscribe(); 
    }, []);

    const fetchDataForUser = async (userId) => {
      const q = query(collection(database, "Expenses"), where("user", "==", userId));
      try {
        const querySnapshot = await getDocs(q);
        const fetchedMarkers = querySnapshot.docs.map(doc => {
          const location = doc.data().location;
          return {
            latitude: location.latitude,
            longitude: location.longitude,
            name: location.name,
            address: location.address
          };
        });
        setMarkers(fetchedMarkers);
      } catch (error) {
        console.error("Error fetching Firestore documents for user:", error);
      }
    };
  
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 49.2827, 
            longitude: -123.1207,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              title={marker.name}
            >
              <Callout tooltip style={styles.callout}>
              <View style={styles.calloutView}>
              <Text style={styles.calloutTitle}>{marker.name}</Text>
              <Text style={styles.calloutDescription}>{marker.address}</Text>
            </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    callout: {
        borderRadius: 6,
        flex: 1,
        width: 200,
        borderWidth: 2,
        borderColor: '#309797',
        backgroundColor: '#F2FFE9',
      },
      calloutView: {
        padding: 10,
        borderRadius: 6,
        backgroundColor: '#F2FFE9',
        shadowColor: '#000000',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 1
        }
      },
      calloutTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5
      },
      calloutDescription: {
        fontSize: 14
      },
  });





