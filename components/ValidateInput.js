import { Alert } from 'react-native';
export function isDataValid(amount, category, description, date) {
    // Check if amount is a numeric number with 2 decimal digits
    const amountRegex = /^\d+(\.\d{1,2})?$/;
    if (!amountRegex.test(amount)) {
        Alert.alert('Invalid Data', 'Please enter valid numeric values with no more than 2 decimal digits');
        return false;
    }
    // Check if category is not null or undefined
    if (!category) {
        Alert.alert('Invalid Data', 'Please choose a category');
        return false;
    }

    // Check if date is a valid date
    if (isNaN(new Date(date).getTime())) {
        Alert.alert('Invalid Data', 'Please choose a date');
        return false;
    }
  
    return true;
  }
  