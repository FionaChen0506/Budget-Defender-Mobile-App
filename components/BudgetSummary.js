import React, { useState, useEffect } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { collection, query, where, onSnapshot, sum } from 'firebase/firestore';
import { database,auth } from "../firebase/firebaseSetup";
import EditBudgetLimit from './EditBudgetLimit';
import Colors from '../styles/Colors';

const BudgetSummary = () => {
    const [spending, setSpending] = useState(0);
  
    useEffect(() => {
      const userUid = auth.currentUser.uid;
      const expensesQuery = query(
        collection(database, 'Expenses'),
        where('user', '==', userUid)
      );
  
      const unsubscribe = onSnapshot(expensesQuery, (snapshot) => {
        let totalSpending = 0;
  
        snapshot.forEach((doc) => {
          totalSpending += doc.data().amount;
        });
  
        setSpending(totalSpending);
      });
  
      return () => {
        // Unsubscribe from the snapshot listener when the component unmounts
        unsubscribe();
      };
    }, []);
  
    return (
        <View style={styles.container}>
            <Text style={styles.spendingText}>Spending:</Text>
            <Text style={styles.spendingText}>${spending.toFixed(2)}</Text>
            <View style={styles.BudgetRemainingContainer}>
              <Text style={styles.budgetRemainingText}>Budget:</Text>
              <Text style={styles.budgetRemainingText}>Remaining:</Text>
            </View>
            <View style={styles.row4Container}>
              <Text style={styles.budgetRemainingText}>$00.00</Text>
              <Text style={styles.budgetRemainingText}>$00.00</Text>
            </View>
        </View>
    );
  };
  
export default BudgetSummary;

const styles = StyleSheet.create({
    container: {
      //flex: 1, 
      alignItems:'center',
      width:'90%',
      backgroundColor: Colors.summaryBackground,
      borderRadius: 18,
      padding: 15,
      margin: 10,
      justifyContent: 'center',
      shadowColor: 'gray',
      shadowOffset: { width: 0, height: 1 }, // Shadow offset
      shadowOpacity: 0.3, // Shadow opacity
      shadowRadius: 3, // Shadow radius
      elevation: 4, // Android shadow elevation
  },
   spendingText: {
    fontSize: 32,
    color: 'white',
    fontWeight:'bold',
   },

   BudgetRemainingContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%', 
    marginTop: 10, 
   },

   BudgetContainer:{
    //justifyContent: 'space-between',
   },
   row4Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 5, 
  },

  budgetRemainingText: {
    fontSize: 20,
    color: 'white',
    fontWeight:'600',
  },


  })