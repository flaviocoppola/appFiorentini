import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import Home from '../screens/Home/Home';
import Details from '../screens/Details/Details';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Lista macchine" component={Home} />
        <Stack.Screen name="Details" component={Details} options={{title: 'Dettaglio macchine'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}