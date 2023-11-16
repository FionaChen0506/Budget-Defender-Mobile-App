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
import { AntDesign } from '@expo/vector-icons';

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

          {/* <View style={styles.dateTextContainer}>
            <Text style={styles.dateText}>
            {selectedDate.toLocaleDateString()}
            </Text>
            <TouchableOpacity onPress={showDatePicker}>
                <AntDesign name="calendar" size={24} color="black" />
            </TouchableOpacity>
          </View> */}

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
            />
            </View>
        </View>

        <View style={styles.formField}>
            <Text style={styles.labelText}>Upload a receipt</Text>
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