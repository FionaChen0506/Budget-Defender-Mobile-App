import { Alert } from 'react-native';
export function isDataValid(amount, category, description, location, date) {
    // Check if category is not null or undefined
    if (category === null || category === undefined) {
        return false;
    }

    // Check if date is a valid date
    if (isNaN(new Date(date).getTime())) {
        return false;
    }
  
    return true;
  }
  