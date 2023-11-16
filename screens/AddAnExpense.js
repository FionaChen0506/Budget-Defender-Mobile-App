import React, { useState } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import ExpenseForm from '../components/ExpenseForm';
import SaveCancelButtons from '../components/SaveCancelButtons';
import { isDataValid } from '../components/ValidateInput';
import { writeToDB } from '../firebase/firebaseHelper';

const AddAnExpense = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());

  const saveExpense = async () => {
    if (!isDataValid(amount, category, description, location, date)) {
      return;
    }

    const newExpenseEntry = {
      amount: parseFloat(amount),
      category,
      description,
      location,
      date,
    };

    try {
      writeToDB(newExpenseEntry);
    } catch (error) {
      console.log("Error saving expense:", error.message);
    }

    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        amount={amount}
        category={category}
        description={description}
        location={location}
        date={date}
        onAmountChange={(text) => setAmount(text)}
        onCategoryChange={(text) => setCategory(text)}
        onDescriptionChange={(text) => setDescription(text)}
        onLocationChange={(text) => setLocation(text)}
        onDateChange={(selectedDate) => setDate(selectedDate)}
      />
      <SaveCancelButtons onCancel={handleCancel} onSave={saveExpense} />
    </View>
  );
};
export default AddAnExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
},

})

