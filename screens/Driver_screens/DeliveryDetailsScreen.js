// DeliveryDetailsScreen.js
import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DeliveryDetailsScreen = () => {

  const navigation = useNavigation();
  // Dummy orders data
  const orders = [
    {
      id: 'ORD001',
      partyName: 'Jain Enterprises',
      address: '123 Industrial Area, City Center, New Delhi, 110001',
      expectedDelivery: 'June 15, 2025, 10:00 AM',
      material: '5000 nos of Bricks',
    },
    {
      id: 'ORD002',
      partyName: 'Ganesh Traders',
      address: '456 Market Street, Downtown, Mumbai, 400001',
      expectedDelivery: 'June 16, 2025, 12:00 PM',
      material: '50 Bags of Cement',
    },
    {
      id: 'ORD003',
      partyName: 'Sharma Suppliers',
      address: '789 Business Park, Noida, 201301',
      expectedDelivery: 'June 17, 2025, 2:00 PM',
      material: '200 Steel Rods',
    },
    {
      id: 'ORD004',
      partyName: 'Kumar Industries',
      address: '321 Warehouse Lane, Pune, 411001',
      expectedDelivery: 'June 18, 2025, 9:30 AM',
      material: '100 Bags of Sand',
    },
  ];

  // Track which deliveries have been started
  const [started, setStarted] = useState([false, false, false, false]);

  // Toggle start delivery
  const toggleStartDelivery = (index) => {
    const updated = [...started];
    updated[index] = !updated[index];
    setStarted(updated);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headerTitle}>Delivery Details</Text>

        {orders.map((order, index) => (
          <View key={order.id} style={styles.card}>
            <Text style={styles.label}>Party Name</Text>
            <Text style={styles.value}>{order.partyName}</Text>

            <Text style={styles.label}>Delivery Address</Text>
            <Text style={styles.value}>{order.address}</Text>

            <Text style={styles.label}>Expected Delivery</Text>
            <Text style={styles.value}>{order.expectedDelivery}</Text>

            <Text style={styles.label}>Material</Text>
            <Text style={styles.value}>{order.material}</Text>

            <TouchableOpacity
              style={[
                styles.startButton,
                { backgroundColor: started[index] ? '#4CAF50' : '#ccc' },
              ]}
              onPress={() => toggleStartDelivery(index)}
            >
              <Text style={styles.startButtonText}>
                {started[index] ? 'Delivery Started' : 'Start Delivery'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f7' },
  content: { padding: 20 },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007B7F',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  label: { fontSize: 14, color: '#888', marginTop: 8 },
  value: { fontSize: 16, fontWeight: '500', color: '#333', marginTop: 2 },
  startButton: {
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DeliveryDetailsScreen;
