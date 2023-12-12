import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import PressableButton from '../components/PressableButton';
import{REACT_APP_BASE_API_URL,} from "@env";
import Colors from '../styles/Colors';
import { Octicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import LottieView from "lottie-react-native";
import { Dimensions } from 'react-native';
import LinearGradientComp from '../components/LinearGradient';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CurrencyExchangeTool = () => {
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState(null);
    const [toCurrency, setToCurrency] = useState(null);
    const [result, setResult] = useState('');
    const [resetKey, setResetKey] = useState(0);

    // Fetch list of currencies
    const [currencyList, setCurrencyList] = useState([]);

    // Use the base API URL
    const apiUrl = REACT_APP_BASE_API_URL;

    useEffect(() => {
      const fetchCurrencies = async () => {
        try {
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

    const handleClear = () => {
      setAmount('');
      setResult('');
      setFromCurrency(null); 
      setToCurrency(null);  
      setResetKey(prevKey => prevKey + 1); 
    };

    const handleCurrencySwap = () => {
      const tempCurrency = fromCurrency;
      setFromCurrency(toCurrency);
      setToCurrency(tempCurrency);
      setResetKey(prevKey => prevKey + 1); 
    };

  
    return (
      <LinearGradientComp>
      <View style={styles.container}>
        <LottieView
            source={require('../images/moneydrop-lottie.json')}
            autoPlay
            loop
            style={styles.moneydropLottie}
          />
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={(text) => setAmount(text)}
        />
        <RNPickerSelect
          key={`from-picker-${resetKey}`}
          style={pickerSelectStyles}
          placeholder={{ label: 'Select from currency', value: null }}
          onValueChange={(value) => setFromCurrency(value)}
          value={fromCurrency}
          items={currencyList.map((currency) => ({ label: currency, value: currency }))}
        />
        <TouchableOpacity onPress={handleCurrencySwap}>
            <Octicons name="arrow-switch" style={styles.swapIcon} size={45} color={Colors.buttonBackground}/>
        </TouchableOpacity>
        {/* 5<Fontisto name="arrow-swap" style={styles.swapIcon} size={40} color={Colors.buttonBackground} /> */}
        <RNPickerSelect
          key={`to-picker-${resetKey}`}
          style={pickerSelectStyles}
          placeholder={{ label: 'Select to currency', value: null }}
          onValueChange={(value) => setToCurrency(value)}
          value={toCurrency}
          items={currencyList.map((currency) => ({ label: currency, value: currency }))}
        />
        <View style={styles.buttonContainer}>
        <PressableButton
            pressedFunction={handleClear}
            pressedStyle={styles.buttonPressed}
            defaultStyle={styles.buttonDefault}
          >
            <Text style={styles.buttonText}>Clear</Text>
          </PressableButton>
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
      </LinearGradientComp>
    );
  };
  
export default CurrencyExchangeTool

const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    input: {
      height: 45,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 15,
      paddingHorizontal: 10,
      fontSize: 18,
      borderRadius: 4,
      backgroundColor: 'white',
      marginTop: -40,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginVertical: '10%',
      alignItems:'center',
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
      fontSize: 20,
    },
    resultText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: Colors.labelText,
      alignSelf: 'center',
      marginTop: -10,
    },
    swapIcon:{
      alignSelf:'center',
      marginVertical: 10,
      transform: [{ rotate: '90deg' }],
    },
    moneydropLottie: {
      alignSelf: 'center',
      width: windowWidth*1.2,
      height: windowHeight * 0.3,
      marginTop: -25,
    },
  });
  
  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 18,
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
      fontSize: 18,
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