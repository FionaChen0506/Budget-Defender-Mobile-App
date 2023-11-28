import { View, Text, Image, StyleSheet } from 'react-native'
import {useState, useEffect} from 'react';
import React from 'react'
import * as ImagePicker from 'expo-image-picker';
import PressableButton from './PressableButton';
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebaseSetup";
import { Entypo } from '@expo/vector-icons';

export default function ImageManager({onImageTaken, initialPhotoUri}) {
    const [imageUri, setImageUri] = useState(initialPhotoUri);

    // console.log("ImageManager: imageUri: ", imageUri);

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
      <View style={styles.buttonImageContainer}>
        <View style={styles.buttonContainer}>
        <PressableButton 
            pressedFunction={takeImageHandler} 
            pressedStyle={{backgroundColor: '#309797', margin: 10}}
            defaultStyle={{backgroundColor: 'gray', margin: 10}}>
            <Entypo name="camera" size={30} color="black" />
            {/* <Text>Take Image</Text> */}
        </PressableButton>

        <PressableButton 
            pressedFunction={selectImageHandler} 
            pressedStyle={{backgroundColor: '#309797', margin: 10}}
            defaultStyle={{backgroundColor: 'gray', margin: 10}}>
            <Entypo name="folder-images" size={30} color="black" />
            {/* <Text>Select Image from Library</Text> */}
        </PressableButton>
        </View>

        {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.showImage} />
        ) : (
            <Text>No Image Selected</Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    buttonImageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // margin: 10,
    },
    showImage: {
        width: 100,
        height: 100,
        marginBottom: 10,
        alignSelf: 'center',
    }

})