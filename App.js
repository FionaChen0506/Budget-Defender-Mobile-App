import React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from './firebase/firebaseSetup';
import { onAuthStateChanged } from 'firebase/auth';
import { Text } from 'react-native';

import WelcomePage from './screens/WelcomePage';
import Signup from './screens/Signup';
import Login from './screens/Login';

import Home from './screens/Home';
import AllExpenses from './screens/AllExpenses';
import Profile from './screens/Profile';

import AddAnExpense from './screens/AddAnExpense';
import EditAnExpense from './screens/EditAnExpense';
import ExportReports from './screens/ExportReports';
import EditProfile from './screens/EditProfile';

import BottomTabBar from './components/BottomTabBar';
import Colors from './styles/Colors';
import PressableButton from './components/PressableButton';
import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


// Auth Screens
const AuthStack = <>
  <Stack.Screen
      name="Welcome"
      component={WelcomePage}
      options={{ title: 'Welcome'}}
    />
  <Stack.Screen
    name="Signup"
    component={Signup}
    options={{ title: 'Sign Up'}}
    />
  <Stack.Screen
    name="Login"
    component={Login}
    options={{ title: 'Log In'}}
    />
</>


// Tab Screens
function TabNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <Tab.Screen 
        name="Home" 
        component={Home}
        options={({ navigation }) => ({
          headerRight: () => (
            <PressableButton
              pressedFunction={() => navigation.navigate('Profile')}
              pressedStyle={{ 
                backgroundColor: Colors.header,
                marginRight: 10,
              }}
              defaultStyle={{ 
                backgroundColor: Colors.header,
                marginRight: 10,
              }}
            >
              <Ionicons name="person-circle" size={24} color="white" />
            </PressableButton>
          ),
          headerStyle: {
            backgroundColor: Colors.header,
          },
          headerTintColor: Colors.headerText,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },

        })
      }
      />
      <Tab.Screen 
        name="All Expenses" 
        component={AllExpenses}
        options={({ navigation }) => ({
          headerRight: () => (
            <PressableButton
              pressedFunction={() => navigation.navigate('Export Reports')}
              pressedStyle={{ 
                backgroundColor: Colors.header,
                marginRight: 10,
              }}
              defaultStyle={{ 
                backgroundColor: Colors.header,
                marginRight: 10,
              }}
            >
              <Foundation name="page-export" size={24} color="white" />
            </PressableButton>
          ),
          headerStyle: {
            backgroundColor: Colors.header,
          },
          headerTintColor: Colors.headerText,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          }
        })}
      />

      <Tab.Screen 
        name="Profile" 
        component={Profile}
        options={({ navigation }) => ({
          headerRight: () => (
            <PressableButton
              pressedFunction={() => auth.signOut()}
              pressedStyle={{ 
                backgroundColor: Colors.header,
                marginRight: 10,
                opacity: 0.5,
              }}
              defaultStyle={{ 
                backgroundColor: Colors.header,
                marginRight: 10,
              }}
            >
              <Text>Log Out</Text>
            </PressableButton>
          ),
          headerStyle: {
            backgroundColor: Colors.header,
          },
          headerTintColor: Colors.headerText,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          }
        })}
      />
    </Tab.Navigator>
  );
}

// App Screens
const AppStack = 
  <>
    <Stack.Screen
      name="Tabs" 
      component={TabNavigator} 
    />

    <Stack.Screen 
      name="Add An Expense" 
      component={AddAnExpense}
      options={{ 
        headerShown: true,
        }} 
    />

    <Stack.Screen 
      name="Edit"
      component={EditAnExpense}
      options={{ 
        headerShown: true,
        }} 
    />

    <Stack.Screen
      name="Export Reports"
      component={ExportReports}
      options={{ 
        headerShown: true,
        }}
    />

    <Stack.Screen
      name="Edit Profile"
      component={EditProfile}
      options={{ 
        headerShown: true,
        }}
    />
  </>


// Default Header Options
const defaultHeaderOptions = {
  headerShown: false,
  headerStyle: {
    backgroundColor: Colors.header,
  },
  headerTintColor: Colors.headerText,
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
};


// App
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    })
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={defaultHeaderOptions}>

      { loggedIn ? AppStack : AuthStack }

      
      </Stack.Navigator>
    </NavigationContainer>
  );
}
