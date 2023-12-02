import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import PressableButton from '../components/PressableButton';
import{REACT_APP_BASE_API_URL,} from "@env";
import Colors from '../styles/Colors';

const CurrencyExchangeTool = () => {
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('CAD');
    const [toCurrency, setToCurrency] = useState('CAD');
    const [result, setResult] = useState('');

    // Fetch list of currencies
    const [currencyList, setCurrencyList] = useState([]);

    // Use the base API URL
    const apiUrl = REACT_APP_BASE_API_URL;

    useEffect(() => {
      const fetchCurrencies = async () => {
        try {
        //   const response = await axios.get('https://open.er-api.com/v6/latest/USD');
        //   const currencies = Object.keys(response.data.rates);
        //   setCurrencyList(currencies);
        
        // Use backticks for template literals
        const response = await axios.get(`${apiUrl}/CAD`);
        const currencies = Object.keys(response.data.conversion_rates);
        setCurrencyList(currencies);
        } catch (error) {
          console.error('Error fetching currencies:', error);
        }
      };
  
      fetchCurrencies();
    }, []);
  
    const convertCurrency = async () => {
      if (!amount || isNaN(amount)) {
        // Check if the amount is not entered or not a valid numeric number
        alert('Please enter a valid numeric amount.');
        return;
      }
  
      if (!fromCurrency || !toCurrency) {
        // Check if both "from currency" and "to currency" are selected
        alert('Please choose both "from currency" and "to currency" fields.');
        return;
      }

      try {
        const response = await axios.get(`${apiUrl}/${fromCurrency}`);
        const exchangeRate = response.data.conversion_rates[toCurrency];
        const convertedAmount = (amount * exchangeRate).toFixed(2);
        setResult(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };
  
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={(text) => setAmount(text)}
        />
        <RNPickerSelect
          style={pickerSelectStyles}
          placeholder={{ label: 'Select from currency', value: null }}
          onValueChange={(value) => setFromCurrency(value)}
          items={currencyList.map((currency) => ({ label: currency, value: currency }))}
        />
        <RNPickerSelect
          style={pickerSelectStyles}
          placeholder={{ label: 'Select to currency', value: null }}
          onValueChange={(value) => setToCurrency(value)}
          items={currencyList.map((currency) => ({ label: currency, value: currency }))}
        />
        <View style={styles.buttonContainer}>
          <PressableButton
            pressedFunction={convertCurrency}
            pressedStyle={styles.buttonPressed}
            defaultStyle={styles.buttonDefault}
          >
            <Text style={styles.buttonText}>Convert</Text>
          </PressableButton>
        </View>
        <Text style={styles.resultText}>{result}</Text>
      </View>
    );
  };
  
export default CurrencyExchangeTool

const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: '5%',
    },
    buttonDefault: {
      backgroundColor: Colors.buttonBackground,
      opacity: 1,
      borderRadius: 4,
      padding: 5,
      width:'35%',
      justifyContent: 'center',
      alignItems:'center',
    },
    buttonPressed: {
      backgroundColor: '#aaa',
      opacity: 0.5,
      borderRadius: 4,
      padding: 5,
      width:'35%',
      justifyContent: 'center',
      alignItems:'center',
    },
    buttonText: {
      color: 'white', 
      fontSize: 17,
    },
    resultText: {
      fontSize: 17,
    },
  });
  
  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30,
      backgroundColor: 'white',
      marginBottom: 10,
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'gray',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30,
      backgroundColor: 'white',
      marginBottom: 10,
    },
  });