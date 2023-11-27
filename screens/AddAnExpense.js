import React, { useState, useEffect } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import ExpenseForm from '../components/ExpenseForm';
import SaveCancelButtons from '../components/SaveCancelButtons';
import { isDataValid } from '../components/ValidateInput';
import { writeToDB } from '../firebase/firebaseHelper';
import { ref, uploadBytesResumable, uploadBytes } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebaseSetup";



const AddAnExpense = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [imageUri, setImageUri] = useState(null);

  async function fetchImage(uri) {
    try{
    const response = await fetch(uri);
    const imageBlob = await response.blob();
    const imageName = uri.substring(uri.lastIndexOf('/') + 1);
    const imageRef = await ref(storage, `images/${imageName}`);
    const uploadResult = await uploadBytes(imageRef, imageBlob);
    return(uploadResult.metadata.fullPath);
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
      location: data.location,
      date: data.date,
      photo: null, 
    };

    let imageRef = null;
    if (data.uri) {
      imageRef = await fetchImage(data.uri);
    }

    if (imageRef) {
      newExpenseEntry.photo = imageRef;
      writeToDB(newExpenseEntry);
    }
    else {
      writeToDB(newExpenseEntry);
    }
    navigation.goBack();
  }
  

  const onPhotoSelected = (photoURL) => {
    setSelectedPhoto(photoURL); 
  };

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
    <View style={styles.container}>
    

    <ExpenseForm
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

