import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TrucksScreen from '../screens/Driver_screens/TrucksScreen';
import CustomersScreen from '../screens/Driver_screens/CustomersScreen';
import InvoiceScreen from '../screens/Driver_screens/InvoiceScreen';
import Add_Truck from '../screens/Driver_screens/Add_Truck';
import AddCustomer from '../screens/Driver_screens/AddCustomer';
import { TabParamList } from '../types/navigation';
import { Theme } from '../constants/theme';

const Tab = createBottomTabNavigator<TabParamList>();

const iconMapping: Record<string, string> = {
  Trucks: 'local-shipping',
  Customers: 'people',
  Invoices: 'receipt-long',
};

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Trucks"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <MaterialIcons
            name={iconMapping[route.name] || 'error'}
            size={24} // Match native icon scale
            color={color}
            style={{ marginBottom: -2 }} // Slight adjustment for perfect vertical alignment
          />
        ),
        tabBarActiveTintColor: Theme.Colors.activeNavBackground,
        tabBarInactiveTintColor: Theme.Colors.navIconColor,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 85 : 65,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          backgroundColor: Theme.Colors.inactiveNavBackground,
          borderTopWidth: 1,
          borderTopColor: Theme.Colors.lightGray,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          paddingBottom: 2,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
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
        name="AddCustomer"
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
