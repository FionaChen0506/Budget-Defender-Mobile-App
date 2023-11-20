import { StyleSheet, Text, View, TouchableOpacity, Alert,} from 'react-native'
import React, { useLayoutEffect,useState } from 'react'
import ExpenseForm from '../components/ExpenseForm'
import SaveCancelButtons from '../components/SaveCancelButtons';
import { updateInDB } from '../firebase/firebaseHelper';
import { isDataValid } from '../components/ValidateInput';
import DeleteButton from '../components/DeleteButton';


const EditAnExpense = ({ route,navigation }) => {
  const { entryId, amount, category, date, description,} = route.params;
    const [editedAmount, setEditedAmount] = useState(amount);
    const [editedCategory, setEditedCategory] = useState(category);
    const [editedDescription, setEditedDescription] = useState(description);
    const [editedDate, setEditedDate] = useState(new Date(date)); // Convert back to a Date object


    const handleAmountChange = (text) => {
      setEditedAmount(text);
    };
  
    const handleCategoryChange = (text) => {
      setEditedCategory(text);
    };
  
    const handleDescriptionChange = (text) => {
      setEditedDescription(text);
    };
  
  
    const handleDateChange = (selectedDate) => {
      setEditedDate(selectedDate);
    };

    const onDeleteSuccess = () => {
        navigation.goBack();
    };

    //Define the navigation tab options
    useLayoutEffect(() => {
        navigation.setOptions({
        headerRight: () => (
            <DeleteButton entryId={entryId} onDeleteSuccess={onDeleteSuccess} />
        ),
        });
    }, [navigation, onDeleteSuccess]);

    const handleSave = () => {
        if (!isDataValid(editedAmount, editedCategory, editedDescription, editedDate)) {
          console.log("Data is not valid");
          return;
        }
      
        Alert.alert(
          'Important',
          'Are you sure you want to save these changes?',
          [
            {
              text: 'No', 
              style: 'cancel', // This makes it a "Cancel" action
            },
            {
              text: 'Yes',
              // this is the real "save" action
              onPress: () => {
                // Prepare the updated entry object
                const updatedEntry = {
                  amount: parseFloat(editedAmount),
                  category:editedCategory,
                  description: editedDescription,
                  date: editedDate,
                };
      
                // Call the updateInDB function to update the entry
                updateInDB(entryId, updatedEntry);
      
                // Navigate back to the previous screen
                navigation.goBack();
              },
            },
          ]
        );
      };
      

    const handleCancel = () => {
        navigation.goBack();
      };

    return (
      <View style={styles.container}>
      <ExpenseForm
        amount={editedAmount}
        category={editedCategory}
        description={editedDescription}
        date={editedDate}
        onAmountChange={handleAmountChange}
        onCategoryChange={handleCategoryChange}
        onDescriptionChange={handleDescriptionChange}
        onDateChange={handleDateChange}
      />
        <SaveCancelButtons onCancel={handleCancel} onSave={handleSave} />
      
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
  