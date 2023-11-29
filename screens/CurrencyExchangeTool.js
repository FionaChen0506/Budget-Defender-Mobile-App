import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import{REACT_APP_BASE_API_URL,} from "@env";

const CurrencyExchangeTool = () => {
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('USD');
    // Set the initial state of 'toCurrency' to 'CAD'
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
        const currencies = Object.keys(response.data.rates);
        setCurrencyList(currencies);
        } catch (error) {
          console.error('Error fetching currencies:', error);
        }
      };
  
      fetchCurrencies();
    }, []);
  
    const convertCurrency = async () => {
      try {
        const response = await axios.get(`${apiUrl}/${fromCurrency}`);
        const exchangeRate = response.data.rates[toCurrency];
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
        <Button title="Convert" onPress={convertCurrency} />
        <Text>{result}</Text>
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