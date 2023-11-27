import { StyleSheet, Text, View, TouchableOpacity, Alert, Image} from 'react-native'
import React, { useLayoutEffect,useState, useEffect } from 'react'
import ExpenseForm from '../components/ExpenseForm'
import SaveCancelButtons from '../components/SaveCancelButtons';
import { updateInDB } from '../firebase/firebaseHelper';
import { isDataValid } from '../components/ValidateInput';
import DeleteButton from '../components/DeleteButton';
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebaseSetup";



const EditAnExpense = ({ route,navigation }) => {
  const { entryId, amount, category, description, date, location, photo } = route.params

  const [formAmount, setFormAmount] = useState(amount.toString());
  const [formCategory, setFormCategory] = useState(category);
  const [formDescription, setFormDescription] = useState(description);
  const [formLocation, setFormLocation] = useState(location);
  const [formDate, setFormDate] = useState(new Date(date));
  const [formImageUri, setFormImageUri] = useState(photo);

  
  const onSave = (data) => {
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

          onPress: () => {
            const updatedExpense = {
              amount: parseFloat(data.amount),
              category: data.category,
              description: data.description,
              location: data.location,
              date: data.date,
              photo: data.uri || formImageUri, 
            };

            updateInDB(entryId, updatedExpense);
  
            navigation.goBack();
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
          setFormImageUri(url); // Assuming you want to set the fetched URL to formImageUri
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
    }, [navigation, onDeleteSuccess, photo]); // Add 'photo' as a dependency
    
      



    return (
      <View style={styles.container}>
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

      { photo && <Image source={{uri: photo}} style={{width: 100, height: 100}}/> }
      
      </View>
    );
  };
  
  export default EditAnExpense;

  const styles = StyleSheet.create({
    container:{
      flex: 1,
      justifyContent: 'center', 
      alignItems: 'center'
    },
})
  