import { StyleSheet, Text, View,  FlatList,TouchableOpacity, } from 'react-native';
import React, { useEffect, useState } from 'react';
//import { collection, getDocs, query, where } from 'firebase/firestore';
import { database,auth } from "../firebase/firebaseSetup";
import { collection, onSnapshot } from "firebase/firestore";
import { Entypo } from '@expo/vector-icons';
import EditAnExpense from '../screens/EditAnExpense';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { where, query } from 'firebase/firestore';
import Colors from '../styles/Colors';


const EntriesList = ({navigation }) => {
    const [entries, setEntries] = useState([]);
  
    useEffect(() => {
        onSnapshot(query(collection(database, "Expenses"), where("user", "==", auth.currentUser.uid)), (querySnapshot) => {
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
    // return (
    //     <View style={styles.container}>
    //         <FlatList
    //         data={entries}
    //         keyExtractor={(item) => item.id}
    //         renderItem={({ item }) => (
    //           <TouchableOpacity
    //             onPress={() => navigation.navigate('Edit An Expense', { 
    //                 entryId: item.id,
    //                 amount: item.amount.toString(),
    //                 category: item.category,
    //                 date: item.date.toString(),
    //                 description: item.description,
    //             })}
    //           >
    //             <View style={styles.entryContainer} >
    //               <View style={styles.infoContainer}>
    //                 <View style={styles.container}>
    //                     <Text style={styles.text}>Category: {item.category}</Text>
    //                     <Text style={styles.text}>Amount: ${item.amount.toFixed(2)}</Text>
    //                     <Text style={styles.text}>Description: {item.description}</Text>
    //                     <Text style={styles.text}>Date: {item.date.toLocaleDateString()}</Text>
    //                     </View>
    //               </View>
    //             </View>
    //           </TouchableOpacity>
    //         )}
    //       />
    //     </View>
    // );
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
                      date: item.date.toString(),
                      description: item.description,
                    })
                  }
                >
                 <View style={styles.entryContainer} >
                   <View style={styles.infoContainer}>
                     <View style={styles.container}>
                         <Text style={styles.text}>Category: {item.category}</Text>
                         <Text style={styles.text}>Amount: ${item.amount.toFixed(2)}</Text>
                         <Text style={styles.text}>Description: {item.description}</Text>
                         <Text style={styles.text}>Date: {item.date.toDate().toLocaleDateString()}</Text>

                         </View>
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
        padding: 10,
        alignItems:'center',
        flexDirection: 'row',
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

      itemText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
      },

      infoContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical:1,
      },

    priceContainer: {
        backgroundColor: 'white',
        width: 80, 
        padding: 5, 
        borderRadius: 2, 
        marginLeft: 5,
        alignItems: 'center',
    },

      priceText:{
        marginLeft: 3,
        color: 'black',
        fontWeight: 'bold',
        fontSize:16,
      },

})