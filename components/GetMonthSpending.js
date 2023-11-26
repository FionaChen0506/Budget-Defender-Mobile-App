import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { database,auth } from "../firebase/firebaseSetup";

const GetMonthSpending = ({ month }) => {
  const [spending, setSpending] = useState(0);

  useEffect(() => {
    const userUid = auth.currentUser.uid;
    const [year, monthString] = month.split('-');
    const monthDate = new Date(year, parseInt(monthString) - 1, 1);
    const monthStart = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
    const monthEnd = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);
    // console.log("year:", year)
    // console.log("month string:", monthString)
    // console.log("month start:", monthStart)
    // console.log("month end:", monthEnd)
    // console.log("month date:", monthDate)

    const listenForChanges = () => {
      // Query for Expenses within the specified month
      const expensesQuery = query(
        collection(database, 'Expenses'),
        where('user', '==', userUid),
        where('date', '>=', monthStart),
        where('date', '<=', monthEnd)
      );

      // Listen for changes in Expenses
      const unsubscribeExpenses = onSnapshot(expensesQuery, (expenseSnapshot) => {
        let totalSpending = 0;
        expenseSnapshot.forEach((doc) => {
            totalSpending += doc.data().amount;
          });

        setSpending(totalSpending);
      });


      return () => {
        // Unsubscribe from both snapshots when the component unmounts
        unsubscribeExpenses();
      };
    };

    // Call the listenForChanges function to start listening for changes
    const unsubscribe = listenForChanges();

    return () => {
      // Unsubscribe from listenForChanges when the component unmounts
      unsubscribe();
    };
  }, [month]);

  // Return spending and budgetLimit as an object
  return { spending };
};

export default GetMonthSpending;
