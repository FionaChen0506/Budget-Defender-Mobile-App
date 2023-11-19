import { StyleSheet, Text, View,  FlatList,TouchableOpacity, } from 'react-native';
import React, { useEffect, useState } from 'react';
//import { collection, getDocs, query, where } from 'firebase/firestore';
import { database,auth } from "../firebase/firebaseSetup";
import { collection, onSnapshot } from "firebase/firestore";
import { Feather } from '@expo/vector-icons';
import EditAnExpense from '../screens/EditAnExpense';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { where, query, orderBy} from 'firebase/firestore';
import Colors from '../styles/Colors';
import { getDocs } from 'firebase/firestore';


const EntriesList = ({navigation }) => {
    const [entries, setEntries] = useState([]);
  
    useEffect(() => {
        onSnapshot(query(collection(database, "Expenses"), 
        where("user", "==", auth.currentUser.uid),orderBy("date", "desc")), (querySnapshot) => {
          if (!querySnapshot.empty) {
            let newArray = [];
            querySnapshot.forEach((docSnap) => {
              newArray.push({...docSnap.data(), id: docSnap.id});
            });
            setEntries(newArray);
          }
          (err) => {
            console.log(err);
            if (err.code === 'permission-denied') {
              console.log("User does not have permission to access this collection");
            }
          };
        });
      }, []);
    


    
    // Render the entries 
    return (
        <View style={styles.container}>
          {entries.length === 0 ? (
            <Text>No expenses found for this user.</Text>
          ) : (
            <FlatList
              data={entries}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Edit An Expense', {
                      entryId: item.id,
                      amount: item.amount.toString(),
                      category: item.category,
                      date: item.date.toDate().toISOString(),
                      description: item.description,
                    })
                  }
                >
                 <View style={styles.entryContainer} >
                    <View style={styles.iconContainer}>
                        <Feather name="file-text" size={26} color="black" />
                    </View>
                    <View style={styles.categoryContainer}>
                        <Text style={styles.categoryText}>{item.category}</Text>
                        <Text style={styles.descriptionText}>{item.description}</Text>
                    </View>
                    <View style={styles.priceDateContainer}>
                        <Text style={styles.priceText}>${item.amount.toFixed(2)}</Text>
                        <Text style={styles.dateText}>{item.date.toDate().toLocaleDateString()}</Text>
                    </View>
                    
                 </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      );
      
  };
  
export default EntriesList;
  

const styles = StyleSheet.create({
    container:{
        marginTop: 20,
    },
    entryContainer: {
        backgroundColor: Colors.entryBackground, 
        padding: 5,
        alignItems:'center',
        flexDirection: 'row',
        // justifyContent: 'left',
        justifyContent: 'space-between',
        marginVertical:8,
        marginHorizontal:'5%',
        borderRadius: 8,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 1 }, // Shadow offset
        shadowOpacity: 0.3, // Shadow opacity
        shadowRadius: 3, // Shadow radius
        elevation: 4, // Android shadow elevation
      },
      iconContainer: {
        marginLeft: 5,
        marginRight: 10,
    },

      categoryContainer:{
        flex: 1, // Allow categoryContainer to take remaining space between iconContainer and priceDateContainer
        alignItems: 'flex-start', // Align children to the start
        marginVertical:1,
      },
      categoryText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    descriptionText: {
        fontSize: 14,
        color: '#888',
    },
    priceDateContainer: {
        alignItems: 'center',
        marginLeft:10,
        marginTop: 5,
    },
    priceText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    dateText: {
        fontSize: 14,
        color: '#888',
    },

})