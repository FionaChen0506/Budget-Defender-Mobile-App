import React, { useState, useEffect } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import ExpenseForm from '../components/ExpenseForm';
import SaveCancelButtons from '../components/SaveCancelButtons';
import { isDataValid } from '../components/ValidateInput';
import { writeToDB } from '../firebase/firebaseHelper';
import { ref, uploadBytesResumable } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebaseSetup";


const AddAnExpense = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [selectedPhoto, setSelectedPhoto] = useState(null); 
  

  const onPhotoSelected = (photoURL) => {
    setSelectedPhoto(photoURL); 
  };


  const saveExpense = async () => {
    if (!isDataValid(amount, category, description, date)) {
      return;
    }      
      
    const newExpenseEntry = {
      amount: parseFloat(amount),
      category,
      description,
      location,
      date,
      photo: selectedPhoto, 
    };

    const checkSelectedPhoto = () => {
      if (selectedPhoto) {
        try {
          newExpenseEntry.photo = selectedPhoto;
          console.log('New expense entry:', newExpenseEntry);
          writeToDB(newExpenseEntry);
        } catch (error) {
          console.log("Error saving expense:", error.message);
        }
      navigation.goBack();
      }
      else {
        setTimeout(checkSelectedPhoto, 1000); 
      }
    };

    checkSelectedPhoto();
  }

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
        onPhotoSelected={onPhotoSelected}
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

