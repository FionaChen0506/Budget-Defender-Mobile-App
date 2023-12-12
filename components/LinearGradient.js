import * as React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import StyleHelper from '../styles/StylesHelper';

const LinearGradientComp = ({children}) => {
    return (
        <LinearGradient
            // Background Linear Gradient
            colors={['#edfaf8', '#e1f7f4', '#edfaf8']}
            style={StyleHelper.linearGradient}
        >
            {children}
        </LinearGradient>
    );
}

export default LinearGradientComp;