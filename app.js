import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MenuProvider } from './context/MenuContext';

import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import FormScreen from './screens/FormScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: '#8b0000' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Chef's Dashboard" }} />
          <Stack.Screen name="Menu" component={MenuScreen} options={{ title: "Manage Menu" }} />
          <Stack.Screen name="Form" component={FormScreen} options={{ title: "Menu Item Form" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}