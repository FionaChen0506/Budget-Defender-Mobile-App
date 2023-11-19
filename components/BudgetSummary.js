import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { collection, query, where, onSnapshot, sum } from 'firebase/firestore';
import { database,auth } from "../firebase/firebaseSetup";

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
      <View>
        <Text>Spending: ${spending.toFixed(2)}</Text>
        {/* Add Budget and Remaining components here */}
      </View>
    );
  };
  
export default BudgetSummary;
