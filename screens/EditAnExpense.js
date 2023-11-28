import { StyleSheet, Text, View, TouchableOpacity, Alert, Image, ScrollView} from 'react-native'
import React, { useLayoutEffect,useState, useEffect } from 'react'
import ExpenseForm from '../components/ExpenseForm'
import SaveCancelButtons from '../components/SaveCancelButtons';
import { isDataValid } from '../components/ValidateInput';
import DeleteButton from '../components/DeleteButton';
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebaseSetup";
import { deletePhotoFromExpense, updateInDB } from '../firebase/firebaseHelper';
import { uploadBytes } from "firebase/storage";





const EditAnExpense = ({ route,navigation }) => {
  const { entryId, amount, category, description, date, location, photo } = route.params

  const [formAmount, setFormAmount] = useState(amount.toString());
  const [formCategory, setFormCategory] = useState(category);
  const [formDescription, setFormDescription] = useState(description);
  const [formLocation, setFormLocation] = useState(location);
  const [formDate, setFormDate] = useState(new Date(date));
  const [formImageUri, setFormImageUri] = useState(photo);



  async function fetchImage(uri) {
    if (!uri) {
      return null;
    }
    try{
    const response = await fetch(uri);
    const imageBlob = await response.blob();
    const imageName = uri.substring(uri.lastIndexOf('/') + 1);
    const imageRef = await ref(storage, `images/${imageName}`);
    const uploadResult = await uploadBytes(imageRef, imageBlob);
    const downloadURL = await getDownloadURL(uploadResult.ref);
    // return(uploadResult.metadata.fullPath);
    return(downloadURL);
    }
    catch(err) {
      console.log('Error in fetchImage in EditAnExpense: ', err);
    }

  }
  
  const onSave = async(data) => {
    if (!isDataValid(data.amount, data.category, data.description, data.date)) {
      return;
    }

  
    Alert.alert(
      'Important',
      'Are you sure you want to save these changes?',
      [
        {
          text: 'No', 
          style: 'cancel', 
        },
        {
          text: 'Yes',

          onPress: async() => {

            try{
              let newPhoto = null;
              if (data.uri && data.uri !== photo) {
                newPhoto = await fetchImage(data.uri);
                if (photo) {
                  deletePhotoFromExpense(photo);
                }
              }
          
            const updatedExpense = {
              amount: parseFloat(data.amount),
              category: data.category,
              description: data.description,
              location: data.location,
              date: data.date,
              photo: newPhoto || formImageUri,
            };

            
            await updateInDB(entryId, updatedExpense);
  
            navigation.goBack();
          }
          catch(err) {
            console.log('Error in onSave in EditAnExpense: ', err);
          }
          },
          },
      ]
    );
  };

  const onCancel = () => {
    navigation.goBack();
  };

  const onImageTaken = (uri) => {
    setFormImageUri(uri);
  };

  

  const onDeleteSuccess = () => {
    navigation.goBack();
  };


    useEffect(() => {
      const fetchDownloadUrl = async () => {
        if (!photo || typeof photo !== 'string') {
          console.log("No valid photo path provided.");
          return;
        }
        
        try {
          const reference = ref(storage, photo);
          const url = await getDownloadURL(reference);
          setFormImageUri(url); 
        } catch (error) {
          console.error("Error fetching download URL:", error);
        }
      };
    
      if (photo) {
        fetchDownloadUrl();
      }
    
      navigation.setOptions({
        headerRight: () => (
          <DeleteButton entryId={entryId} onDeleteSuccess={onDeleteSuccess} />
        ),
      });
    }, [navigation, onDeleteSuccess, photo]); 
    




    return (
      <ScrollView>
      <ExpenseForm
        initialAmount={formAmount}
        initialCategory={formCategory}
        initialDescription={formDescription}
        initialLocation={formLocation}
        initialDate={formDate}
        initialImageUri={formImageUri}
        onSave={onSave}
        onCancel={onCancel}
        onImageTaken={onImageTaken}
      />

      
      </ScrollView>
    );
  };
  
  export default EditAnExpense;

  const styles = StyleSheet.create({
    container:{
      flex: 1,
      justifyContent: 'center', 
      alignItems: 'center',
      marginBottom: 20,
    },
})
  