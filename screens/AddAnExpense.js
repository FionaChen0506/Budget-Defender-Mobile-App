import React, { useState, useEffect } from 'react';
import { View, Text,StyleSheet, ScrollView } from 'react-native';
import ExpenseForm from '../components/ExpenseForm';
import SaveCancelButtons from '../components/SaveCancelButtons';
import { isDataValid } from '../components/ValidateInput';
import { writeToDB } from '../firebase/firebaseHelper';
import { ref, uploadBytesResumable, uploadBytes } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebaseSetup";


const AddAnExpense = ({ navigation, route }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(null);
  const [date, setDate] = useState(new Date());
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    // Check if location is passed from SelectLocation screen
    if (route.params?.userSelectedLocation) {
      const selectedLocation = route.params.userSelectedLocation;
      // Update the location state and console log
      setLocation(selectedLocation);
    }
  }, [route.params?.userSelectedLocation]);




  async function fetchImage(uri) {
    try{
    const response = await fetch(uri);
    const imageBlob = await response.blob();
    const imageName = uri.substring(uri.lastIndexOf('/') + 1);
    const imageRef = await ref(storage, `images/${imageName}`);
    const uploadResult = await uploadBytesResumable(imageRef, imageBlob);
    const downloadURL = await getDownloadURL(uploadResult.ref);
    // return(uploadResult.metadata.fullPath);
    return(downloadURL);
    }
    catch(err) {
      console.log(err);
    }

  }

  
  const onSave = async (data) => {
    if (!isDataValid(data.amount, data.category, data.description, data.date)) {
      return;
    }
    
    const newExpenseEntry = {
      amount: parseFloat(data.amount),
      category: data.category,
      description: data.description,
      location: null,
      date: data.date,
      photo: null, 
    };

    // Add location to the entry if it's provided
  if (data.location) {
    newExpenseEntry.location = data.location;
  }

  // Handle image uploading
  if (data.uri) {
    const imageRef = await fetchImage(data.uri);
    if (imageRef) {
      newExpenseEntry.photo = imageRef;
    }
  }

  // Write the expense entry to the database
  writeToDB(newExpenseEntry);
  navigation.goBack();

  }
  


  const onCancel = () => {
    // Reset local state if needed
    setAmount('');
    setCategory('');
    setDescription('');
    setLocation('');
    setDate(new Date());
    setImageUri(null);

    // Navigate back
    navigation.goBack();
  };


  const onImageTaken = (uri) => {
    setImageUri(uri);
  };


  

  return (
    // <ScrollView>
    
    <ExpenseForm
        originScreen='Add An Expense'
        initialAmount={amount}
        initialCategory={category}
        initialDescription={description}
        initialLocation={location}
        initialDate={date}
        initialImageUri={imageUri}
        onSave={onSave}
        onCancel={onCancel}
        onImageTaken={onImageTaken}
      />


    // </ScrollView>
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

