import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import { auth, database } from '../firebase/firebaseSetup';
import { Feather } from '@expo/vector-icons';
import ImageViewing from 'react-native-image-viewing';
import LinearGradientComp from '../components/LinearGradient';

// map view dimensions
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


export default function MyReceipts() {
    const [userUid, setUserUid] = useState(null);
    const [receipts, setReceipts] = useState([]);
    const [visible, setIsVisible] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
      // Listen for authentication state to change.
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserUid(user.uid);
          fetchReceiptsForUser(user.uid);
        } else {
          // User is signed out
          setUserUid(null);
        }
      });

      return () => unsubscribe(); 
    }, []);

    const fetchReceiptsForUser = async (userId) => {
        const q = query(collection(database, "Expenses"), where("user", "==", userId));
        try {
            const querySnapshot = await getDocs(q);
            let fetchedReceipts = [];
            querySnapshot.docs.forEach(doc => {
                const data = doc.data();
                if (data.photo) {  // Check if the photo field exists
                    const photo = data.photo;
                    const date = data.date.toDate();
                    if (data.location) {  // Check if the location field exists
                        const location = data.location.name;
                        fetchedReceipts.push({
                            photo: photo,
                            date: date,
                            location: location,
                        });
                    }
                    else {
                        fetchedReceipts.push({
                            photo: photo,
                            date: date,
                            location: null,
                        });
                    }
                }
            }
            );

            // Sort the receipts by date
            fetchedReceipts.sort((a, b) => b.date - a.date);
            setReceipts(fetchedReceipts);
        } catch (error) {
            console.log("Error getting receipts: ", error);
        }
    }
    

    const openImageViewer = (index) => {
        setCurrentImageIndex(index);
        setIsVisible(true);
    }
      

    return (
        <LinearGradientComp>
      <View style={styles.container}>
        <View style={styles.receiptsContainer}>
                {receipts.map((receipt, index) => (
                    <TouchableOpacity key={index} onPress={() => openImageViewer(index)}>
                        <Image source={{ uri: receipt.photo }} style={styles.receiptImage} />
                        <Text style={styles.dateText}>{receipt.date.toLocaleDateString()}</Text>
                        {receipt.location && (
                            <Text style={styles.locationText}>{receipt.location}</Text>
                        )}

                    </TouchableOpacity>
                ))}
            </View>
            <ImageViewing
                images={receipts.map(receipt => ({ uri: receipt.photo }))}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
                imageIndex={currentImageIndex}
            />
      </View>
        </LinearGradientComp>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    receiptsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        // marginTop: 10,
    },
    receiptImage: {
        width: windowWidth / 3,
        height: windowWidth /3,
        borderWidth:0.5,
        borderColor:'gray',
        // margin: 5,
    },
    dateText: {
        position: 'absolute',
        fontSize: 10,
        textAlign: 'center',
        alignSelf: 'center',
        backgroundColor: 'white',
        opacity: 0.5,
        color: 'black',
        padding: 2,
        bottom: 5,
    },
    locationText: {
        position: 'absolute',
        fontSize: 10,
        textAlign: 'center',
        alignSelf: 'center',
        backgroundColor: 'white',
        opacity: 0.5,
        color: 'black',
        padding: 2,
        top: 5,
    },
  });





