import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TrucksScreen from '../screens/Driver_screens/TrucksScreen';
import CustomersScreen from '../screens/Driver_screens/CustomersScreen';
import InvoiceScreen from '../screens/Driver_screens/InvoiceScreen';
import Add_Truck from '../screens/Driver_screens/Add_Truck';
import AddCustomer from '../screens/Driver_screens/AddCustomer'; // Updated import name
import { TabParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<TabParamList>();

interface IconMapping {
  [key: string]: string;
}

const TabNavigator: React.FC = () => {
  const iconMapping: IconMapping = {
    Trucks: 'local-shipping',
    Customers: 'people',
    Invoices: 'receipt-long',
  };

  return (
    <Tab.Navigator
      initialRouteName="Trucks"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons
            name={iconMapping[route.name] || 'error'}
            size={size}
            color={color}
          />
        ),
        tabBarActiveTintColor: '#007B7F',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 85 : 65,
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E5E5',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      })}
    >
      <Tab.Screen
        name="Trucks"
        component={TrucksScreen}
        options={{ tabBarLabel: 'Trucks' }}
      />
      <Tab.Screen
        name="Add_Truck"
        component={Add_Truck}
        options={{
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tab.Screen
        name="Customers"
        component={CustomersScreen}
        options={{ tabBarLabel: 'Customers' }}
      />
      <Tab.Screen
        name="Invoices"
        component={InvoiceScreen}
        options={{ tabBarLabel: 'Invoices' }}
      />
      <Tab.Screen
        name="AddCustomer" // Changed from Add_Customer
        component={AddCustomer}
        options={{
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;