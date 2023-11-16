import React from 'react';
import { View, Text, Alert,StyleSheet } from 'react-native';
import { useState } from 'react';
import { TextInput, Menu, Divider, Provider } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Picker} from '@react-native-picker/picker';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import DropDownPicker from 'react-native-dropdown-picker'; 
import Colors from '../styles/Colors';

const ExpenseForm = ({
    amount,
    category,
    description,
    location,
    date,
    onAmountChange,
    onCategoryChange,
    onDescriptionChange,
    onLocationChange,
    onDateChange,
  }) => {

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const categories = ['Food', 'Grocery', 'Travel', 'Furniture', 'Entertainment', 'Health and Wellness', 'Housing', 'Education', 'Miscellaneous', 'Gifts and Celebrations'];
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
      const handleConfirm = (selectedDate) => {
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
            items={categories.map((val) => ({ label: val, value: val }))}
            setOpen={setOpen}
            setValue={(val) => {
                setValue(val);
                onCategoryChange(val);
            }}
            style={styles.inputField}
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
          <Text style={styles.selectedDateText}>
            {selectedDate.toLocaleDateString()}
          </Text>

          <TouchableOpacity onPress={showDatePicker}>
            <Ionicons name="calendar" size={24} color="black" />
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            />
            </View>
        </View>

        <Text style={styles.labelText}>Upload a receipt</Text>

          
        
      </View>
    );
  };

export default ExpenseForm;


const styles = StyleSheet.create({
    container: {
      flex: 1, 
      //justifyContent: 'center', 
      alignItems: 'center',
      //padding: 10,
      marginHorizontal:'5%',
      marginTop:'10%',
  },
    formField: {
      marginBottom: 20,
      marginHorizontal:20,
      //width:'90%',
    },
    labelText: {
      fontSize: 20,
      marginBottom: 5,
      fontWeight:"bold",
    },
    inputField: {
      height: 40,
      paddingHorizontal: 5,
      backgroundColor:'transparent',
      fontSize: 20,
      width: 300,
    },
    dropDownPicker: {
        zIndex: 2, // Higher zIndex to make it on top of the layers
        marginBottom: 40,
        marginHorizontal:20,
        width:'90%',
        fontSize: 20,
    },
    datePickerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    datePicker: {
      flex: 1,
      height: 40,
    },

  
  })