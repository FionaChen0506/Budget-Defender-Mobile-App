import { View, Button, StyleSheet, Image, Dimensions } from "react-native";
import React, { useState } from "react";
import * as Location from "expo-location";
import { MAPS_API_KEY } from "@env";
import { useNavigation } from "@react-navigation/native";
import PressableButton from "./PressableButton";
import { Entypo } from '@expo/vector-icons';


const windowWidth = Dimensions.get("window").width;

export default function LocationManager({originScreen}) {
  const navigation = useNavigation();
  const [status, requestPermission] = Location.useForegroundPermissions();
  const [location, setLocation] = useState(null);
  
  const verifyPermission = async () => {
    if (status.granted) {
      return true;
    }
    const response = await requestPermission();
    return response.granted;
  };

  // get user's current location
  async function locateMeHandler() {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert("You need to give access to the location");
      }
      const locationObject = await Location.getCurrentPositionAsync();
      
        // navigate to the map screen with the current location
        navigation.navigate('Location', {
            originScreen: originScreen,
            currentLatitude: locationObject.coords.latitude,
            currentLongitude: locationObject.coords.longitude,
        });
    } catch (err) {
      console.log("locate user ", err);
    }
  }


  return (
    <View>
      <PressableButton
        pressedFunction={locateMeHandler}
        pressedStyle={{ backgroundColor: "#e1f7f4", opacity: 0.5 }}
        defaultStyle={{ backgroundColor: "#e1f7f4" }}
        >
            <Entypo name="location" size={26} color="#B31312" />
        </PressableButton>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    width: windowWidth,
    height: 300,
  },
});