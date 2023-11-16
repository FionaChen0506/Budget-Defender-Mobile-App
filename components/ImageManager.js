import { View, Text, Image } from 'react-native'
import {useState} from 'react';
import React from 'react'
import * as ImagePicker from 'expo-image-picker';
import PressableButton from './PressableButton';


export default function ImageManager({getImageUri}) {
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
                getImageUri(imageUri);
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
        {imageUri && <Image source={{uri: imageUri}} style={{width: 200, height: 200}}/> }
    </View>
  )
}