import React, { useState, useEffect } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { collection, query, where, onSnapshot, sum } from 'firebase/firestore';
import { database,auth } from "../firebase/firebaseSetup";
import EditBudgetLimit from './EditBudgetLimit';
import Colors from '../styles/Colors';
import GetMonthSummary from './GetMonthSummary';

const BudgetSummary = ({selectedMonth}) => {
  console.log("selected month in budget summary:",selectedMonth)
    // Assuming we only want the current month, format it to 'YYYY-MM' string
    const currentMonth = new Date().toISOString().slice(0, 7);

    // Get spending and budgetLimit using the GetMonthSummary component
    const { spending, budgetLimit } = GetMonthSummary({ month: selectedMonth });

    //const { spending, budgetLimit } = GetMonthSummary({ month: '2023-11' });
    
    return (
        <View style={styles.container}>
            <View style={styles.row1Container}>
            <Text style={styles.monthText}>{selectedMonth}</Text>
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