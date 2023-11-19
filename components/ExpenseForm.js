import React from 'react';
import { View, Text, Alert,StyleSheet } from 'react-native';
import { useState } from 'react';
import { TextInput, Menu, Divider, Provider } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import DropDownPicker from 'react-native-dropdown-picker'; 
import Colors from '../styles/Colors';
import { AntDesign } from '@expo/vector-icons';
import ImageManager from './ImageManager';
import { auth, database, storage } from "../firebase/firebaseSetup"
import { ref, uploadBytesResumable,getDownloadURL } from "firebase/storage";
import defaultCategories from './DefaultCategories';
import getIconName from './CategoryIcons';

const ExpenseForm = ({
    amount,
    category,
    description,
    location,
    date,
    //selectedPhoto,
    onAmountChange,
    onCategoryChange,
    onDescriptionChange,
    onLocationChange,
    onDateChange,
    //onSelectPhoto,
  }) => {

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    // Use the provided date if available, otherwise default to a new Date()
    const [selectedDate, setSelectedDate] = useState(date || new Date()); 
    //const [takenImageUri, setTakenImageUri] = useState("");
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    // const handleImageTaken = (uri) => {
    //     setSelectedPhoto(uri);
    //     console.log('Image URI in ExpenseForm:', uri);
    // };
  
    const handleImageTaken = async (uri) => {
        try {
          setSelectedPhoto(uri);
          console.log('Image URI in ExpenseForm:', uri);
    
          if (uri) {
            // If a photo is selected, upload it to storage and get the download URL
            const photoURL = await uploadImageToStorage(uri);
            console.log('Download URL:', photoURL);
          }
        } catch (error) {
          console.error('Error handling image:', error);
        }
      };
    
    //   async function uploadImageToStorage(uri) {
    //     try {
    //       const response = await fetch(uri);
    //       const imageBlob = await response.blob();
    //       const imageName = uri.substring(uri.lastIndexOf('/') + 1);
    //       const imageRef = storage.ref().child(`images/${imageName}`);
    
    //       // Upload the image
    //       await imageRef.put(imageBlob);
    
    //       // Get the URL of the uploaded image
    //       const downloadURL = await imageRef.getDownloadURL();
    
    //       return downloadURL;
    //     } catch (error) {
    //       console.error('Error uploading image:', error);
    //       throw error;
    //     }
    //   }
    async function uploadImageToStorage(uri) {
        try {
          const response = await fetch(uri);
          const imageBlob = await response.blob();
          const imageName = uri.substring(uri.lastIndexOf("/") + 1);
          const imageRef = await ref(storage, `images/${imageName}`);
          const uploadResult = await uploadBytesResumable(imageRef, imageBlob);
          const downloadURL = await imageRef.getDownloadURL();
          //return uploadResult.metadata.fullPath;
          return downloadURL
        } catch (err) {
          console.log(err);
        }
      }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
      const handleConfirm = (selectedDate) => {
        const currentDate = new Date();
        // Check if the selected date is not after today
        if (selectedDate.getTime() > currentDate.getTime()) {
          alert('Oops! You cannot choose a date in the future.');
          return;
        }
        hideDatePicker();
        onDateChange(selectedDate);
        setSelectedDate(selectedDate);
      };      
    

    return (
      <View style={styles.container}>
        <View style={styles.formField}>
          <Text style={styles.labelText}>Amount</Text>
          <TextInput
            style={styles.inputField}
            onChangeText={onAmountChange}
            value={amount.toString()}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.dropDownPicker}>
          <Text style={styles.labelText}>Category</Text>
            <DropDownPicker
            placeholder={category}
            open={open}
            value={value}
            // items={categories.map((val) => ({ label: val, value: val }))}
            items={defaultCategories.map((val) => ({ label: val, value: val, icon: () => getIconName(val) }))} 
            setOpen={setOpen}
            setValue={(val) => {
                setValue(val);
                onCategoryChange(val);
            }}
            style={styles.inputField}
            autoScroll={true}
            />
        </View>

        <View style={styles.formField}>
          <Text style={styles.labelText}>Description</Text>
          <TextInput
            style={styles.inputField}
            onChangeText={onDescriptionChange}
            value={description}
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.labelText}>Location</Text>
          <TextInput
            style={styles.inputField}
            onChangeText={onLocationChange}
            value={location}
          />
        </View>

        <View style={styles.formField}>
        <View style={styles.datePickerContainer}>
          <Text style={styles.labelText}>Date</Text>

        <TouchableOpacity onPress={showDatePicker} style={styles.dateTextContainer}>
        <View style={styles.rowContainer}>
            <Text style={styles.dateText}>
            {selectedDate.toLocaleDateString()}
            </Text>
            <AntDesign name="calendar" size={24} color="black" />
        </View>
        </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            /* IOS14 picker style */
            display='inline'
            />
            </View>
        </View>

        <View style={styles.formField}>
            <Text style={styles.labelText}>Upload a receipt</Text>
            
            {/* <ImageManager onImageTaken={handleImageTaken} /> */}
        </View>
        
        
      </View>
    );
  };

export default ExpenseForm;


const styles = StyleSheet.create({
    container: {
      flex: 1, 
      //alignItems: 'center',
      //padding: 10,
      marginHorizontal:'5%',
      marginTop:'10%',
  },
    formField: {
      marginBottom: 20,
      marginHorizontal:20,
    },
    labelText: {
      fontSize: 20,
      marginBottom: 5,
      fontWeight:"bold",
      marginRight:'5%',
      color:Colors.labelText,
    },
    inputField: {
      height: 40,
      paddingHorizontal: 5,
      backgroundColor:'transparent',
      fontSize: 20,
      width: 300,
      borderColor: 'gray',
    },
    dropDownPicker: {
        zIndex: 2, // Higher zIndex to make it on top of the layers
        marginBottom: 40,
        marginHorizontal:20,
        width:'90%',
        fontSize: 20,
        width: 300,
    },
    datePickerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    datePicker: {
      flex: 1,
      height: 40,
    },
    dateTextContainer: {
        flexDirection: 'row',
        padding: 5,
        borderRadius: 5, 
        borderColor:'gray',
        borderWidth:1,
      },
      dateText: {
        fontSize: 20,
        marginHorizontal:'5%',
      },
      rowContainer: {
        flexDirection: 'row',
        alignItems: 'center', 
      },

  
  })