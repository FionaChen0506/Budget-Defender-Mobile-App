import React from 'react';
import { Pressable } from 'react-native';
import GlobalStyles from '../styles/StylesHelper';


const PressableButton = ({children, pressedFunction, pressedStyle, defaultStyle}) => {
    return (
        <Pressable onPress={pressedFunction} style={({pressed}) => [GlobalStyles.styleDefault, pressed ? pressedStyle : defaultStyle]}>
            {children}
        </Pressable>
    )
}


export default PressableButton;