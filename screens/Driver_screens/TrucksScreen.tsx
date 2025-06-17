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
import AddTruck from '../screens/Driver_screens/Add_Truck';
import { useNavigation } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../../types/navigation';

const { Colors, FontSizes, FontWeights, Spacing, BorderRadius } = Theme;

type Truck = {
  id: string;
  number: string;
  driverName: string;
  status: string;
};

type Props = BottomTabScreenProps<TabParamList, 'Trucks'>;

const TrucksScreen: React.FC<Props> = ({ navigation }) => {
  const [trucks, setTrucks] = useState<Truck[]>([
    { id: '1', number: 'MH 29 CB-2233', driverName: 'Rahul Patil', status: 'Active' },
    { id: '2', number: 'MH 31 DF-7831', driverName: 'Amit Sharma', status: 'In Transit' },
    { id: '3', number: 'MH 12 AB-9876', driverName: 'Sunil Deshmukh', status: 'Active' },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Icon name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trucks</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Truck List */}
      <ScrollView contentContainerStyle={styles.listContainer}>
        {trucks.map((truck) => (
          <View key={truck.id} style={styles.truckCard}>
            <View style={styles.truckHeader}>
              <MaterialIcons name="local-shipping" size={22} color={Colors.primary} />
              <Text style={styles.truckNumber}>{truck.number}</Text>
            </View>
            <Text style={styles.driverName}>Driver: {truck.driverName}</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{truck.status}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Floating Add Truck Button */}
      <TouchableOpacity style={styles.floatingAddButton} onPress={() => navigation.navigate('Add_Truck')}>
        <Icon name="add" size={20} color={Colors.white} />
        <Text style={styles.floatingAddButtonText}>Add Truck</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      {/* <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
           <MaterialIcons name="local-shipping" size={24} color={Colors.gray} />
           <Text style={styles.navText}>Trucks</Text>
           </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="people" size={24} color={Colors.gray} />
          <Text style={styles.navText}>Customers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="receipt-long" size={24} color={Colors.gray} />
          <Text style={styles.navText}>Invoices</Text>
        </TouchableOpacity>
      </View> */}
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
  truckCard: {
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    borderLeftWidth: 5,
    borderLeftColor: Colors.primary,
  },
  truckHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  truckNumber: {
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.bold,
    color: '#1A1A1A',
    fontFamily: 'monospace',
    marginLeft: Spacing.sm,
  },
  driverName: {
    fontSize: FontSizes.small,
    color: '#3A3A3A',
    marginBottom: Spacing.xs,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#DFF2E1',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 999,
  },
  statusText: {
    fontSize: FontSizes.small - 2,
    color: '#2E7D32',
    fontWeight: FontWeights.bold,
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
    fontWeight: FontWeights.bold,
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
  navItemActive: {
    alignItems: 'center',
    backgroundColor: 'green',
    padding: Spacing.sm,
    borderRadius: BorderRadius.lg,
  },
  navTextActive: {
    fontSize: FontSizes.small,
    color: Colors.white,
    fontWeight: FontWeights.bold,
  },
});

export default TrucksScreen;
