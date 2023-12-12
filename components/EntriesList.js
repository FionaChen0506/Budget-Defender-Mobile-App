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
import getIconName from './CategoryIcons';
import * as Animatable from 'react-native-animatable';


const EntriesList = ({navigation, selectedMonth }) => {
    const [entries, setEntries] = useState([]);
    const [userUid, setUserUid] = useState(null);

    // listen for changes to selected month
  useEffect(() => {
    if (userUid) {
      fetchCategorySpendingData(userUid, selectedMonth);
    }
  }, [userUid, selectedMonth]);
  
    useEffect(() => {
        onSnapshot(query(collection(database, "Expenses"), 
        where("user", "==", auth.currentUser.uid),orderBy("date", "desc")), (querySnapshot) => {
          if (!querySnapshot.empty) {
            let newArray = [];
            querySnapshot.forEach((docSnap) => {
              const entryData = {...docSnap.data(), id: docSnap.id};
              if (isWithinSelectedMonth(entryData.date, selectedMonth)) {
                newArray.push(entryData);
              }
            });
            setEntries(newArray);
          } else {
            // Update the state to an empty array when there are no entries
            setEntries([]);
        }
          (err) => {
            console.log(err);
            if (err.code === 'permission-denied') {
              console.log("User does not have permission to access this collection");
            }
          };
        });
      }, [selectedMonth]);
    

      // check if expense is within selected month
    const isWithinSelectedMonth = (firebaseTimestamp, selectedMonth) => {
      const date = firebaseTimestamp.toDate();

      const year = date.getFullYear();
      const month = date.getMonth() + 1; 
      const formattedMonth = month < 10 ? `0${month}` : `${month}`;
      const dateMonthYear = `${year}-${formattedMonth}`;

      return dateMonthYear === selectedMonth;
    };

    // Format the date to display in the list
    function formatDate(date) {
      const entryDate = date.toDate(); 
      const today = new Date();
      const yesterday = new Date(today);
    
      today.setHours(0, 0, 0, 0); // Set time to 00:00:00 for today
      yesterday.setDate(yesterday.getDate() - 1); // Set to yesterday
      yesterday.setHours(0, 0, 0, 0);
    
      if (entryDate.setHours(0, 0, 0, 0) === today.getTime()) {
        return "Today";
      } else if (entryDate.getTime() === yesterday.getTime()) {
        return "Yesterday";
      } else {
        // Format to show as MM.DD
        let month = (entryDate.getMonth() + 1).toString().padStart(2, '0');
        let day = entryDate.getDate().toString().padStart(2, '0');
        return `${month}.${day}`;
      }
    }
    
    
    // Render the entries 
    return (
        <View style={styles.container}>
          {entries.length === 0 ? (
            <Text style={styles.noExpensesText}>
              There are no expenses record. Start today!</Text>
          ) : (
            <FlatList
              data={entries}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Animatable.View
                  animation="fadeInUp"
                  duration={1000}
                  >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Edit An Expense', {
                      entryId: item.id,
                      amount: item.amount.toString(),
                      category: item.category,
                      date: item.date.toDate().toISOString(),
                      description: item.description,
                      location: item.location,
                      photo: item.photo,
                    })
                  }
                >
                 <View style={styles.entryContainer} >
                    <View style={styles.iconContainer}>
                        {getIconName(item.category)}
                    </View>
                    <View style={styles.categoryContainer}>
                        <Text style={styles.categoryText}>{item.category}</Text>
                        <Text style={styles.descriptionText}>{item.description}</Text>
                    </View>
                    <View style={styles.priceDateContainer}>
                        <Text style={styles.priceText}>${item.amount.toFixed(2)}</Text>
                        {/* <Text style={styles.dateText}>{item.date.toDate().toLocaleDateString()}</Text> */}
                        <Text style={styles.dateText}>{formatDate(item.date)}</Text>

                    </View>
                    
                 </View>
                </TouchableOpacity>
                </Animatable.View>
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
        backgroundColor: '#70b3a1', 
        padding: 10,
        alignItems:'center',
        flexDirection: 'row',
        height: 60,
        // justifyContent: 'left',
        justifyContent: 'space-between',
        marginVertical:8,
        marginHorizontal:'5%',
        borderRadius: 8,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 1 }, // Shadow offset
        shadowOpacity: 0.8, // Shadow opacity
        shadowRadius: 5, // Shadow radius
        elevation: 4, // Android shadow elevation
      },
      iconContainer: {
        marginLeft: 5,
        marginRight: 15,
    },

      categoryContainer:{
        flex: 1, // Allow categoryContainer to take remaining space between iconContainer and priceDateContainer
        alignItems: 'flex-start', // Align children to the start
        marginVertical:1,
      },
      categoryText: {
        fontSize: 18,
        fontWeight: 'bold',
        color:Colors.entryTextDark,
    },
    descriptionText: {
        fontSize: 14,
        color: '#EEE7DA',
        fontWeight: 'bold',
    },
    priceDateContainer: {
        alignItems: 'center',
        marginLeft:10,
        marginTop: 5,
    },
    priceText: {
        fontSize: 18,
        fontWeight: 'bold',
        color:Colors.entryTextDark,
    },
    dateText: {
        fontSize: 14,
        color: '#EEE7DA',
        fontWeight: 'bold',
    },

    noExpensesText:{
      textAlign:'center',
      fontSize: 18,
      fontWeight: 'bold',
      color:Colors.entryTextDark,
    },

})