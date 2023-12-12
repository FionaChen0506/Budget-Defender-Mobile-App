import * as React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '../styles/Colors';
import GlobalStyles from '../styles/StylesHelper';
import PressableButton from './PressableButton';
import { Ionicons } from '@expo/vector-icons';

function BottomTabBar({ state, descriptors, navigation }) {
  
  return (
    // <View style={{ flexDirection: 'row' }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

      {state.routes.map((route, index) => {
        

        const { options } = descriptors[route.key];

        const label = route.name === 'All Expenses' ? 'Expenses' :
              route.name === 'Home' ? 'Home' : 
              route.name === 'Currency Exchange Tool' ? 'Converter' :
              'Profile'; 

        const isFocused = state.index === index;

        const iconName = route.name === 'All Expenses' ? 'chart-bar' : 
                route.name === 'Home' ? 'home' :
                route.name === 'Currency Exchange Tool' ? 'exchange-alt' :
                'user';

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={GlobalStyles.bottomTabBar}
          >
            <FontAwesome5 name={iconName} size={30} color={isFocused ? Colors.iconFocused : Colors.iconDefault} />
            <Text style={{marginTop:5, fontSize: 12, color: isFocused ? Colors.iconFocused : Colors.iconDefault }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default BottomTabBar;