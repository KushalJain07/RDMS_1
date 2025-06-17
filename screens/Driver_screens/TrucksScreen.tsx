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
import { trucks } from '../../src/mockData';
import { Truck } from '../../src/types';

const { Colors, FontSizes, Spacing, BorderRadius } = Theme;
type Props = BottomTabScreenProps<TabParamList, 'Trucks'>;

const TrucksScreen: React.FC<Props> = ({ navigation }) => {
  const [truckList, _setTruckList] = useState<Truck[]>(trucks);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen' as never)}>
          <Icon name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trucks</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Truck List */}
      <ScrollView contentContainerStyle={styles.listContainer}>
        {truckList.map((truck) => (
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
      <TouchableOpacity style={styles.floatingAddButton} onPress={() => navigation.navigate('Add_Truck' as never)}>
        <Icon name="add" size={20} color={Colors.white} />
        <Text style={styles.floatingAddButtonText}>Add Truck</Text>
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
    fontWeight: 'bold',
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
    fontWeight: 'bold',
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
    fontWeight: 'bold',
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
    fontWeight: 'bold',
    marginLeft: Spacing.xs,
  },
});

export default TrucksScreen;
