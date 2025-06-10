import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useNavigation } from '@react-navigation/native';
import DeliveryDetailsScreen from './DeliveryDetailsScreen';

const Supplier_Dashboard = () => {

const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}><Icon name="arrow-back" size={24} color="#fff" onPress={()=>navigation.goBack()} />
        
        <Text style={styles.headerTitle}>DRIVER DASHBOARD</Text>
        <View style={styles.notificationDot} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Today's Deliveries</Text>
        <View style={styles.deliveryCard}>
          <MaterialIcons name="local-airport" size={24} color="#007B7F" />
          <View style={styles.deliveryInfo}>
            <Text style={styles.deliveryTitle}>Send deliveries</Text>
            <Text style={styles.deliveryCount}>5</Text>
          </View>
        </View>
        <View style={styles.submittedContainer}>
          <Text style={styles.submittedLabel}>Submitted on</Text>
          <TouchableOpacity >
            <Text style={styles.link}>Link</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.deliveryItem}>
          <Text style={styles.deliveryName}>Send Chanakpur</Text>
          <Text style={styles.deliveryDescription}>3000 nos of bricks</Text>
          <TouchableOpacity onPress={() => navigation.navigate('DeliveryDetailsScreen')}>
            <Text style={styles.link}>Web link</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.deliveryItem}>
          <Text style={styles.deliveryName}>Jain Enterprises</Text>
          <View style={styles.deliveryDetails}>
            <Text style={styles.deliveryDescription}>Today, 10:00 AM</Text>
            <Text style={styles.deliveryDescription}>Today, 10:00 AM</Text>
          </View>
        </View>
        <View style={styles.deliveryItem}>
          <Text style={styles.deliveryName}>Ganesh Traders</Text>
          <Text style={styles.deliveryDescription}>29 bags of cement</Text>
          <Text style={styles.deliveryDescription}>April 28</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#007B7F',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
  },
  notificationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  deliveryCard: {
    flexDirection: 'row',
    backgroundColor: '#E8F9F8',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  deliveryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginLeft: 12,
  },
  deliveryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007B7F',
  },
  deliveryCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007B7F',
  },
  submittedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  submittedLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  link: {
    color: '#007B7F',
    fontWeight: 'bold',
  },
  deliveryItem: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    paddingVertical: 12,
    marginBottom: 8,
  },
  deliveryName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  deliveryDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  deliveryDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
});

export default Supplier_Dashboard;

