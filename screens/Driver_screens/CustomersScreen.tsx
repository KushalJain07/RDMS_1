import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Theme } from '../../constants/theme';
// import { useNavigation } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../../types/navigation';

const { Colors, FontSizes, FontWeights, Spacing, BorderRadius } = Theme;

import { Customer } from '../../src/types';
import { customers as mockCustomers } from '../../src/mockData';

type Props = BottomTabScreenProps<TabParamList, 'Customers'>;

const CustomersScreen: React.FC<Props> = ({ navigation }) => {
  const [expandedCustomerId, setExpandedCustomerId] = useState<string | null>(null);
  const [customers, _setCustomers] = useState<Customer[]>(mockCustomers);

  const toggleSites = (customerId: string) => {
    setExpandedCustomerId((prevId) => (prevId === customerId ? null : customerId));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Customers</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Customer List */}
      <ScrollView contentContainerStyle={styles.listContainer}>
        {customers.map((customer) => (
          <View key={customer.id} style={styles.customerCard}>
            <View style={styles.customerHeader}>
              <MaterialIcons name="person" size={22} color={Colors.primary} />
              <Text style={styles.nameText}>{customer.name}</Text>
            </View>

            <Text style={styles.companyText}>Company: {customer.company}</Text>
            <Text style={styles.companyText}>Contact: {customer.contact}</Text>
            <Text style={styles.customerIdText}>Customer ID: {customer.id}</Text>

            {customer.sites.length > 0 && (
              <TouchableOpacity onPress={() => toggleSites(customer.id)}>
                <Text style={styles.siteToggle}>
                  {expandedCustomerId === customer.id ? 'Hide Sites ▲' : 'Show Sites ▼'}
                </Text>
              </TouchableOpacity>
            )}

            {expandedCustomerId === customer.id && customer.sites.length > 0 && (
              <View>
                {customer.sites.map((site) => (
                  <Text key={site.id} style={styles.siteAddress}>• {site.address}</Text>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Floating Add Customer Button */}
      <TouchableOpacity style={styles.floatingAddButton}  onPress={() => navigation.navigate('AddCustomer')}>
        <Icon name="add" size={20} color={Colors.white} />
        <Text style={styles.floatingAddButtonText}>Add Customer</Text>
      </TouchableOpacity>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.primary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primaryDark,
  },
  headerTitle: {
    fontSize: FontSizes.large,
    fontWeight: FontWeights.bold,
    color: Colors.white,
  },
  listContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 150,
    paddingTop: Spacing.md,
  },
  customerCard: {
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    borderLeftWidth: 5,
    borderLeftColor: Colors.primary,
  },
  customerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  nameText: {
    fontSize: FontSizes.medium,
    fontWeight: '700',
    color: Colors.black,
    fontFamily: 'monospace',
    marginLeft: Spacing.sm,
  },
  companyText: {
    fontSize: FontSizes.small,
    color: Colors.black80,
    marginTop: Spacing.xs,
  },
  customerIdText: {
    fontSize: FontSizes.xs,
    color: Colors.gray,
    marginTop: Spacing.xs,
  },
  siteToggle: {
    color: Colors.primary,
    fontSize: FontSizes.small,
    marginTop: Spacing.sm,
    fontWeight: '500',
  },
  siteAddress: {
    marginLeft: Spacing.md,
    fontSize: FontSizes.xs,
    color: Colors.black80,
    marginTop: 2,
  },
  floatingAddButton: {
    position: 'absolute',
    right: Spacing.lg,
    bottom: 100,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  floatingAddButtonText: {
    color: Colors.white,
    fontSize: FontSizes.medium,
    fontWeight: '700',
    marginLeft: Spacing.xs,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
    padding: Spacing.sm,
  },
  navText: {
    fontSize: FontSizes.small,
    color: '#444',
  },
});

export default CustomersScreen;
