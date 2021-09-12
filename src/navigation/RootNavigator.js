import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddScreen from '../screens/AddScreen';
import HomeScreen from '../screens/HomeScreen';
import colors from '../colors';


const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerBackTitle: 'Back',
        }}>
        <Stack.Screen name="home" component={HomeScreen} options={{ title: 'My Members' }} />
        <Stack.Screen name="add" component={AddScreen} options={{ title: '' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;