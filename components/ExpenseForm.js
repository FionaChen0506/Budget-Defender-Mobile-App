import React from 'react';
import { View, Text, Alert,StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
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
import SaveCancelButtons from '../components/SaveCancelButtons';
import { deletePhotoFromExpense } from '../firebase/firebaseHelper';
import LocationManager from './LocationManager';
import LinearGradientComp from './LinearGradient';


const ExpenseForm = ({
  originScreen,
  initialAmount = '',
    initialCategory = '',
    initialDescription = '',
    initialLocation = '',
    initialDate = new Date(),
    initialImageUri = null,
    categories = defaultCategories,
    onSave,
    onCancel,
    onImageTaken,
}) => {

    const [amount, setAmount] = useState(initialAmount);
    const [category, setCategory] = useState(initialCategory);
    const [description, setDescription] = useState(initialDescription);
    const [location, setLocation] = useState(initialLocation);
    const [date, setDate] = useState(initialDate);
    const [imageUri, setImageUri] = useState(initialImageUri);

    
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [selectedDate, setSelectedDate] = useState(date || new Date()); 


    useEffect(() => {
      setLocation(initialLocation);
    }, [initialLocation]);
  
    // only show the first 30 characters of the location name
    const locationName = (location && typeof location.name === 'string') ? location.name.substring(0, 30) : 'No location selected';

    // const locationName = location ? location.name.substring(0, 30) : 'No location selected';

    function onAmountChange(inputAmount) {
        setAmount(inputAmount);
    }

    function onCategoryChange(inputCategory) {
        setCategory(inputCategory);
    }

    function onDescriptionChange(inputDescription) {
        setDescription(inputDescription);
    }

    function onLocationChange(inputLocation) {

        setLocation(inputLocation);
        console.log("ExpenseForm: onLocationChange: ", location);
    }

    function onDateChange(inputDate) {
        setDate(inputDate);
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };


    
      const confirmDate = (selectedDate) => {
        const currentDate = new Date();
        // Check if the selected date is not after today
        if (selectedDate.getTime() > currentDate.getTime()) {
          alert('Oops! You cannot choose a date in the future.');
          return;
        }
        hideDatePicker();
        setSelectedDate(selectedDate);
        onDateChange(selectedDate);
      };      

      // function confirmHandler() {
      //   changeHandler({amount: amount, category: category, description: description, location: location, date: date, uri: imageUri});
      // } 
      function confirmHandler() {
        onSave({ amount, category, description, location, date, uri: imageUri });
      }
      
      function getImageUri(uri) {
        setImageUri(uri);
        onImageTaken && onImageTaken(uri);
      }

      function cancelHandler() {
        onCancel(); 
    }


    return (
      <LinearGradientComp>
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
            items={defaultCategories.map((val) => ({ label: val, value: val, icon: () => getIconName(val) }))} 
            setOpen={setOpen}
            setValue={(val) => {
                setValue(val);
                onCategoryChange(val);
            }}
            style={styles.categoryField}
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

        <View style={styles.locationField}>
          <Text style={styles.labelText}>Location</Text>
          <View style={styles.rowContainer}>
          <View style={{flex: 0.85}}>
            <TextInput
              style={styles.inputField}
              onChangeText={onLocationChange}
              value={locationName}
            />
          </View>
          <View style={{flex: 0.15}}>
            <LocationManager originScreen = {originScreen}/>
          </View>
          </View>
        </View>

        <View style={styles.dateField}>
          <View style={styles.datePickerContainer}>
            <Text style={styles.labelText}>Date</Text>

            <TouchableOpacity onPress={showDatePicker} style={styles.dateTextContainer}>
            <View style={styles.rowContainer}>
                <Text style={styles.dateText}>
                {selectedDate.toLocaleDateString()}
                </Text>
                <AntDesign name="calendar" size={28} color="#309797" />
            </View>
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={confirmDate}
              onCancel={hideDatePicker}
              date={date}
              /* IOS14 picker style */
              display='inline'
              />
          </View>
        </View>

        <View style={styles.imageField}>
          
            <Text style={styles.labelText}>Upload a receipt</Text>
            
            <ImageManager onImageTaken={getImageUri} initialPhotoUri={initialImageUri} />
        </View>
        
        <View style={styles.buttonField}>
        <SaveCancelButtons onCancel={cancelHandler} onSave={confirmHandler} />
        </View>
        
      </View>
      </LinearGradientComp>
    );
  };

export default ExpenseForm;


const styles = StyleSheet.create({
    container: {
      flex: 1, 
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      // marginHorizontal:'5%',
      marginTop:'5%',
  },
    formField: {
      flex: 0.12,
    },
    dateField: {
      flex: 0.12,
      width:'80%',
    },
    imageField: {
      flex: 0.25,
      width:'80%',

    },
    locationField: {
      flex: 0.12,

    },
    categoryField: {
      backgroundColor:'#FFFBF5',
    },
    buttonField: {
      flex:0.1,
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
      // paddingHorizontal: 5,
      backgroundColor:'transparent',
      fontSize: 20,
      width: 300,
      borderColor: 'gray',
    },
    dropDownPicker: {
        flex: 0.15,
        zIndex: 2, // Higher zIndex to make it on top of the layers
        // marginBottom: 40,
        // marginHorizontal:20,
        width:'80%',
        fontSize: 20,
        // width: 300,
    },
    datePickerContainer: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      width: '100%',
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
        backgroundColor:'#FFFBF5',
        width: '60%',
      },
      dateText: {
        fontSize: 20,
        marginHorizontal:'5%',
        alignSelf: 'center',
        color:Colors.entryTextDark,
        marginRight:'15%',
      },
      rowContainer: {
        flexDirection: 'row',
        flex: 1,

        width:'80%',
      },

  
  })