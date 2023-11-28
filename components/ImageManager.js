import { View, Text, Image } from 'react-native'
import {useState, useEffect} from 'react';
import React from 'react'
import * as ImagePicker from 'expo-image-picker';
import PressableButton from './PressableButton';
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebaseSetup";

export default function ImageManager({onImageTaken, initialPhotoUri}) {
    const [imageUri, setImageUri] = useState(initialPhotoUri);

    console.log("ImageManager: imageUri: ", imageUri);

    // take a new image with the camera
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
            if (!result.canceled && result.assets && result.assets.length > 0) {
                const imageUri = result.assets[0].uri;
                setImageUri(imageUri);
                onImageTaken(imageUri);
            }
        }
        catch (err) {
            console.log("Error in taking image with camera: ", err);
        }
    };


    // select an image from the camera roll
    const selectImageHandler = async () => {
        let permissionResult = await ImagePicker.getMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permissionResult.granted) {
                alert("You need to grant permission to access the media library");
                return;
            }
        }
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });
            if (!result.canceled && result.assets && result.assets.length > 0) {
                const selectedImageUri = result.assets[0].uri;
                setImageUri(selectedImageUri);
                onImageTaken(selectedImageUri);
            }
        }
        catch (err) {
            console.log("Error in selecting images from library: ", err);
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

        <PressableButton 
            pressedFunction={selectImageHandler} 
            pressedStyle={{backgroundColor: 'blue'}} 
            defaultStyle={{backgroundColor: 'gray'}}>
            <Text>Select Image from Library</Text>
        </PressableButton>

        {imageUri ? (
            <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />
        ) : (
            <Text>No Image Selected</Text>
        )}

    </View>
  )
}
