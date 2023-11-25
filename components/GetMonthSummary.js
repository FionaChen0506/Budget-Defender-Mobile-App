import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { database,auth } from "../firebase/firebaseSetup";

const GetMonthSummary = ({ month }) => {
  const [spending, setSpending] = useState(0);
  const [budgetLimit, setBudgetLimit] = useState(0);

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

      // Query for Budgets fot the user
      const budgetsQuery = query(
        collection(database, 'Budgets'),
        where('user', '==', userUid)
      );

      // Listen for changes in Expenses
      const unsubscribeExpenses = onSnapshot(expensesQuery, (expenseSnapshot) => {
        let totalSpending = 0;
        expenseSnapshot.forEach((doc) => {
            totalSpending += doc.data().amount;
          });

        setSpending(totalSpending);
      });

      // Listen for changes in Budgets
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

    // Call the listenForChanges function to start listening for changes
    const unsubscribe = listenForChanges();

    return () => {
      // Unsubscribe from listenForChanges when the component unmounts
      unsubscribe();
    };
  }, [month]);

  // Return spending and budgetLimit as an object
  return { spending, budgetLimit };
};

export default GetMonthSummary;
