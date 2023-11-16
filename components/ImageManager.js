import { View, Text, Image } from 'react-native'
import {useState} from 'react';
import React from 'react'
import * as ImagePicker from 'expo-image-picker';
import PressableButton from './PressableButton';


export default function ImageManager({onImageTaken}) {
    const [imageUri, setImageUri] = useState(null);
    
    const takeImageHandler = async () => {
        let permissionResult = await ImagePicker.getCameraPermissionsAsync();
        if (!permissionResult.granted) {
            permissionResult = await ImagePicker.requestCameraPermissionsAsync();
            if (!permissionResult.granted) {
                alert("You need to grant permission to access the camera roll");
                return;
            }
        }
        try {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });
            if (!result.canceled) {
                const imageUri = result.assets[0].uri; 
                setImageUri(imageUri);
                //getImageUri(imageUri);
                // console.log('Image URI:', imageUri); NOT WORKING 
                onImageTaken(imageUri);
            }
        }
        catch (err) {
            console.log(err);
        }
    };

  return (
    <View>
        
        <PressableButton 
            pressedFunction={takeImageHandler} 
            pressedStyle={{backgroundColor: 'green'}} 
            defaultStyle={{backgroundColor: 'gray'}}>
            <Text>Take Image</Text>
        </PressableButton>
        {imageUri && <Image source={{uri: imageUri}} style={{width: 100, height: 100}}/> }
    </View>
  )
}

// import { View, Image, Button, StyleSheet } from "react-native";
// import React, { useState } from "react";
// import * as ImagePicker from "expo-image-picker";

// export default function ImageManager({ passImageUri }) {
//   const [status, requestPermission] = ImagePicker.useCameraPermissions();
//   const [imageUri, setImageUri] = useState("");
//   const verifyPermission = async () => {
//     if (status.granted) {
//       return true;
//     }
//     const response = await requestPermission();
//     return response.granted;
//   };
//   const takeImageHandler = async () => {
//     try {
//       const hasPermission = await verifyPermission();
//       if (!hasPermission) {
//         Alert.alert("You need to give access to the camera");
//       }
//       //   if hasPermission, launch the camera

//       const result = await ImagePicker.launchCameraAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         quality: 1,
//       });

//         if (!result.canceled) {
//             console.log(result);
//             setImageUri(result.assets[0].uri);
//             passImageUri(result.assets[0].uri);
//         }

//     } catch (err) {
//       console.log("take image error ", err);
//     }
//   };

//   return (
//     <View>
//       <Button onPress={takeImageHandler} title="Take an Image" />
//       {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   image: {
//     width: 100,
//     height: 100,
//   },
// });