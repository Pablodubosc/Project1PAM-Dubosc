import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import  {createNativeStackNavigator}  from '@react-navigation/native-stack';
import Menu from './src/screens/Menu';
import Fav from './src/screens/Favoritos';
import { Provider } from 'react-redux';
import store from './src/store/Index'
export default function App () {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="RICK AND MORTY" component={Menu}/>
        <Stack.Screen name="FAVORITES CHARACTERS" component={Fav}/>
      </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    )
};
