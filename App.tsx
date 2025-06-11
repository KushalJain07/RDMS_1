import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screen imports
import LoginScreen from './screens/Driver_screens/LoginScreen.js';
import DriverDashboard from './screens/Driver_screens/Driver_Dashboard.jsx';
import DeliveryNoteScreen from './screens/Driver_screens/DeliveryNoteScreen.jsx';
import SupplierDashboard from './screens/Driver_screens/Supplier_Dashboard.jsx';
import DeliveryDetailsScreen from './screens/Driver_screens/DeliveryDetailsScreen.js';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Stack.Navigator 
          initialRouteName="LoginScreen" 
          screenOptions={{headerShown: false}}
        >
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="DriverDashboard" component={DriverDashboard} />
          <Stack.Screen name="DeliveryDetailsScreen" component={DeliveryDetailsScreen} />
          <Stack.Screen name="DeliveryNoteScreen" component={DeliveryNoteScreen} />
          <Stack.Screen 
            name="SupplierDashboard" 
            component={SupplierDashboard}
            options={{
              gestureEnabled: false
            }}
          />
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
