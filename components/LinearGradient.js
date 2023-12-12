import * as React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import StyleHelper from '../styles/StylesHelper';

const LinearGradientComp = ({children}) => {
    return (
        <LinearGradient
            // Background Linear Gradient
            colors={['#F2FFE9', '#C8E6C9', '#F2FFE9']}
            style={StyleHelper.linearGradient}
        >
            {children}
        </LinearGradient>
    );
}

export default LinearGradientComp;