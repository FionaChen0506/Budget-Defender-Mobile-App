import React, { useState } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import ExpenseForm from '../components/ExpenseForm';
import SaveCancelButtons from '../components/SaveCancelButtons';
import { isDataValid } from '../components/ValidateInput';
import { writeToDB } from '../firebase/firebaseHelper';
import { ref, uploadBytesResumable } from "firebase/storage";


const uploadImageToStorage = async (uri) => {
  try {
    const response = await fetch(uri);
    const imageBlob = await response.blob();
    const imageName = uri.substring(uri.lastIndexOf("/") + 1);
    const imageRef = ref(storage, `images/${imageName}`);
    const uploadResult = await uploadBytesResumable(imageRef, imageBlob);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(imageRef);

    return downloadURL;
    // return uploadResult.metadata.fullPath;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to upload image to storage');
  }
};

const AddAnExpense = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [selectedPhoto, setSelectedPhoto] = useState(null); // State to store the selected photo


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
      photo: selectedPhoto, // Include the selected photo in the expense data
    };

    try {
      if (selectedPhoto) {
        const photoURL = await uploadImageToStorage(selectedPhoto);
        newExpenseEntry.photo = photoURL;
      }
  
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
        selectedPhoto={selectedPhoto}
        onAmountChange={(text) => setAmount(text)}
        onCategoryChange={(text) => setCategory(text)}
        onDescriptionChange={(text) => setDescription(text)}
        onLocationChange={(text) => setLocation(text)}
        onDateChange={(selectedDate) => setDate(selectedDate)}
        getImageUri={(imageUri) => setSelectedPhoto(imageUri)}
        onSelectPhoto={(photo) => setSelectedPhoto(photo)}
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

