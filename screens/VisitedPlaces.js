import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import { auth, database } from '../firebase/firebaseSetup';
import { Feather } from '@expo/vector-icons';

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

    const [locationCounts, setLocationCounts] = useState({});
    const [markers, setMarkers] = useState([]);
    const [userUid, setUserUid] = useState(null);
    const [filter, setFilter] = useState('all');

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
        let fetchedMarkers = [];
        let counts = {};
        querySnapshot.docs.forEach(doc => {
          const data = doc.data();
          if (data.location) {  // Check if the location field exists
              const location = data.location;
              const key = location.address; 
          
            // Increment count for each location
            counts[key] = counts[key] ? counts[key] + 1 : 1;
  
            fetchedMarkers.push({
              latitude: location.latitude,
              longitude: location.longitude,
              name: location.name,
              address: location.address
            });
          }
          });
  
          setMarkers(fetchedMarkers);
          setLocationCounts(counts);
        } catch (error) {
          console.error("Error fetching Firestore documents for user:", error);
        }
      };
    


      const getMarkerImage = (locationAddress) => {
        const count = locationCounts[locationAddress] || 0;
        if (count >= 5) {
          return filter === 'all' || filter === 'heart' ? heartMarker : null;
        } else if (count >= 3) {
          return filter === 'all' || filter === 'star' ? starMarker : null;
        }
        return filter === 'all' ? redMarker : null;
      };


    
    // Legend component
    const Legend = () => (
        <View style={styles.legendContainer}>
            <View style={styles.titleContainer}>
                <Feather name="filter" size={20} color="black" />
                <Text style={styles.legendTitle}> Filter</Text>
            </View>
          <TouchableOpacity style={styles.legendItem} onPress={() => setFilter('all')}>
            <Image source={redMarker} style={styles.legendIcon} />
            <Text style={styles.legendText}>Show All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.legendItem} onPress={() => setFilter('heart')}>
            <Image source={heartMarker} style={styles.legendIcon} />
            <Text style={styles.legendText}>5+ Visits</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.legendItem} onPress={() => setFilter('star')}>
            <Image source={starMarker} style={styles.legendIcon} />
            <Text style={styles.legendText}>3+ Visits</Text>
          </TouchableOpacity>
        </View>
      );
      
  
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
          {markers.map((marker, index) => {
            const markerImage = getMarkerImage(marker.address);
            return markerImage && (
              <Marker
                key={index}
                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                title={marker.name}
                image={markerImage}
              >
              <Callout tooltip style={styles.callout}>
                <View style={styles.calloutView}>
                <Text style={styles.calloutTitle}>{marker.name}</Text>
                <Text style={styles.calloutDescription}>{marker.address}</Text>
                </View>
              </Callout>
            </Marker>
            );
        })}
        </MapView>

        <Legend />
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
      legendContainer: {
        position: 'absolute', 
        top: 10, 
        right: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
      },
      legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
      },
      legendIcon: {
        width: 30,
        height: 30,
        marginRight: 5
      },
      legendText: {
        fontSize: 14,
      },
        legendTitle: {
            fontWeight: 'bold',
            fontSize: 16,
            marginBottom: 5,
        },
        titleContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5,
            justifyContent: 'flex-start',
        },
  });





