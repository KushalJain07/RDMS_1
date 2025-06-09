import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import DeliveryNoteScreen from './screens/Driver_screens/DeliveryNoteScreen';
import MapScreen from './screens/Driver_screens/MapScreen';
import Supplier_Dashboard from './screens/Driver_screens/Supplier_Dashboard';
import DeliveryDetailsScreen from './screens/Driver_screens/DeliveryDetailsScreen';
import LoginScreen from './screens/Driver_screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Stack.Navigator initialRouteName="LoginScreen" screenOptions={ {headerShown: false}}>
          <Stack.Screen name="DeliveryNoteScreen" component={DeliveryNoteScreen} />
          <Stack.Screen name="MapScreen" component={MapScreen} />
          <Stack.Screen name="Supplier_Dashboard" component={Supplier_Dashboard} />
          <Stack.Screen name="DeliveryDetailsScreen" component={DeliveryDetailsScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
})

export default App;
