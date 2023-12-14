import { View, Text, Image, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native'
import {useState, useEffect} from 'react';
import React from 'react'
import * as ImagePicker from 'expo-image-picker';
import PressableButton from './PressableButton';
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebaseSetup";
import { Entypo } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import ImageViewing from 'react-native-image-viewing';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ImageManager({onImageTaken, initialPhotoUri}) {
    const [imageUri, setImageUri] = useState(initialPhotoUri);
    const [visible, setIsVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

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
            pressedStyle={{backgroundColor: '#e1f7f4', margin: 10, opacity: 0.5 }}
            defaultStyle={{backgroundColor: '#e1f7f4', margin: 10}}>
            <Entypo name="camera" size={30} color="#3081D0" />
            {/* <Text>Take Image</Text> */}
        </PressableButton>

        <PressableButton 
            pressedFunction={selectImageHandler} 
            pressedStyle={{backgroundColor: '#e1f7f4', margin: 10, opacity: 0.5}}
            defaultStyle={{backgroundColor: '#e1f7f4', margin: 10}}>
            <Entypo name="folder-images" size={30} color="#EE7214" />
            {/* <Text>Select Image from Library</Text> */}
        </PressableButton>
        </View>

        {imageUri ? (
                        // <Image source={{ uri: imageUri }} style={styles.showImage} />
                        <View>
                            <TouchableOpacity onPress={() => setIsVisible(true)}>
                            <Image source={{ uri: imageUri }} style={styles.showImage} />
                            </TouchableOpacity>
                            <ImageViewing
                            images={[{uri: imageUri}]}
                            visible={visible}
                            onRequestClose={() => setIsVisible(false)}
                            />
                        </View>
                           
                        
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
    },
   
})