import React, { useState, useEffect } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { collection, query, where, onSnapshot, sum } from 'firebase/firestore';
import { database,auth } from "../firebase/firebaseSetup";
import EditBudgetLimit from './EditBudgetLimit';
import Colors from '../styles/Colors';

const BudgetSummary = () => {
    const [spending, setSpending] = useState(0);
    const [budgetLimit, setBudgetLimit] = useState(0);
    
    // to show current month text
    const currentDate = new Date();
    const currentMonthString = currentDate.toLocaleString('default', {
      // year: 'numeric',
      month: 'long',
    });
  
    // useEffect(() => {
    //   const userUid = auth.currentUser.uid;
    //   const currentMonth = new Date().getMonth(); // Get the current month (0-indexed)
      
    //   const expensesQuery = query(
    //     collection(database, 'Expenses'),
    //     where('user', '==', userUid)
    //   );
  
    //   const unsubscribe = onSnapshot(expensesQuery, (snapshot) => {
    //     let totalSpending = 0;
  
    //     snapshot.forEach((doc) => {
    //       const expenseDate = doc.data().date.toDate();
    //       const expenseMonth = expenseDate.getMonth();
    //       if (expenseMonth === currentMonth) {
    //         totalSpending += doc.data().amount;
    //       }
    //     });
  
    //     setSpending(totalSpending);
    //   });
  
    //   return () => {
    //     // Unsubscribe from the snapshot listener when the component unmounts
    //     unsubscribe();
    //   };
    // }, []);

    useEffect(() => {
      const userUid = auth.currentUser.uid;
      const currentMonth = new Date().getMonth(); // Get the current month (0-indexed)
  
      const listenForChanges = () => {
        // Query for Expenses
        const expensesQuery = query(
          collection(database, 'Expenses'),
          where('user', '==', userUid)
        );
  
        // Query for Budgets
        const budgetsQuery = query(
          collection(database, 'Budgets'),
          where('user', '==', userUid)
        );
  
        // Listen for changes in both collections
        const unsubscribeExpenses = onSnapshot(expensesQuery, (expenseSnapshot) => {
          let totalSpending = 0;
  
          expenseSnapshot.forEach((doc) => {
            const expenseDate = doc.data().date.toDate();
            const expenseMonth = expenseDate.getMonth();
            if (expenseMonth === currentMonth) {
              totalSpending += doc.data().amount;
            }
          });
  
          setSpending(totalSpending);
        });
  
        const unsubscribeBudgets = onSnapshot(budgetsQuery, (budgetSnapshot) => {
          if (!budgetSnapshot.empty) {
            const latestBudget = budgetSnapshot.docs[budgetSnapshot.docs.length - 1].data();
            setBudgetLimit(latestBudget.limit || 0);
          } else {
            setBudgetLimit(0);
          }
        });
  
        return () => {
          // Unsubscribe from both snapshots when the component unmounts
          unsubscribeExpenses();
          unsubscribeBudgets();
        };
        
      };
  
      // Listen for changes when the component mounts
      const unsubscribe = listenForChanges();
  
      return () => {
        // Unsubscribe from the snapshot listener when the component unmounts
        unsubscribe();
      };
    }, []);
  

    return (
        <View style={styles.container}>
            <View style={styles.row1Container}>
            <Text style={styles.monthText}>{currentMonthString}</Text>
            </View>
            <Text style={styles.spendingText}>Spending:</Text>
            <Text style={styles.spendingText}>${spending.toFixed(2)}</Text>
            <View style={styles.BudgetRemainingContainer}>
              <Text style={styles.budgetRemainingText}>Budget:</Text>
              <Text style={styles.budgetRemainingText}>Remaining:</Text>
            </View>
            <View style={styles.row5Container}>
              <Text style={styles.budgetRemainingText}>${budgetLimit.toFixed(2)}</Text>
              <Text
              style={[
                styles.budgetRemainingText,
                budgetLimit - spending < 0 ? styles.negativeRemaining : null,
              ]}
            >
              {budgetLimit - spending < 0 ? `($${Math.abs(budgetLimit - spending).toFixed(2)})` : `$${(budgetLimit - spending).toFixed(2)}`}
            </Text>
            </View>
        </View>
    );
  };
  
export default BudgetSummary;

const styles = StyleSheet.create({
    container: {
      //flex: 1, 
      alignItems:'center',
      width:'95%',
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
  row1Container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
  monthText: {
    fontSize: 16,
    color: Colors.labelText,
    fontWeight:'600',
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
   row5Container: {
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
  negativeRemaining: {
    color: Colors.darkRed,
  },


  })