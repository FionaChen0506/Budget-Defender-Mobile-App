import * as React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
// import { FontAwesome5 } from '@expo/vector-icons';
// import colors from '../styles/colors';
// import GlobalStyles from '../styles/StylesHelper';

function BottomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const label = route.name === 'All Expenses' ? 'Home' : 'Overbudget';

        const isFocused = state.index === index;

        const iconName = route.name === 'All Expenses' ? 'home' : 'exclamation';

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
            <FontAwesome5 name={iconName} size={20} color={isFocused ? colors.iconFocused : colors.iconDefault} />
            <Text style={{fontSize: 16, color: isFocused ? colors.iconFocused : colors.iconDefault }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default BottomTabBar;