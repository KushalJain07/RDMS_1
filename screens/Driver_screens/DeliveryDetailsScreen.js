// DeliveryDetailsScreen.js
import React, { useState } from 'react';
import { 
  SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, LayoutAnimation, UIManager, Platform 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const DeliveryDetailsScreen = () => {
  const navigation = useNavigation();

  const todayDate = new Date().toDateString();

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

  const [activeIndex, setActiveIndex] = useState(null);

  const handleStartDelivery = (index) => {
    // Animate the toggle
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    if (activeIndex === index) {
      // If clicking the same active delivery, deactivate it
      setActiveIndex(null);
    } else {
      // Activate only one delivery
      setActiveIndex(index);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delivery Details</Text>
        <View style={styles.notificationDot} />
      </View>

      {/* Date row */}
      <View style={styles.dateContainer}>
        <MaterialIcons name="calendar-today" size={20} color="#007B7F" />
        <Text style={styles.dateText}>{todayDate}</Text>
      </View>

      {/* Orders List */}
      <ScrollView contentContainerStyle={styles.content}>
        {orders.map((order, index) => (
          <View key={order.id} style={styles.card}>
            <View style={styles.cardRow}>
              <Text style={styles.label}>Party Name:</Text>
              <Text style={styles.value}>{order.partyName}</Text>
            </View>

            <View style={styles.cardRow}>
              <Text style={styles.label}>Delivery Address:</Text>
              <Text style={styles.value}>{order.address}</Text>
            </View>

            <View style={styles.cardRow}>
              <Text style={styles.label}>Expected Delivery:</Text>
              <Text style={styles.value}>{order.expectedDelivery}</Text>
            </View>

            <View style={styles.cardRow}>
              <Text style={styles.label}>Material:</Text>
              <Text style={styles.value}>{order.material}</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.startButton,
                activeIndex === index ? styles.activeButton : styles.inactiveButton,
              ]}
              onPress={() => handleStartDelivery(index)}
            >
              <Text style={styles.startButtonText}>
                {activeIndex === index ? 'Delivery Started' : 'Start Delivery'}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#007B7F',
    padding: 16,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  notificationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#E8F9F8',
    margin: 16,
    borderRadius: 8,
  },
  dateText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#007B7F',
    fontWeight: 'bold',
  },
  content: { paddingHorizontal: 16, paddingBottom: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardRow: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#777',
    marginBottom: 2,
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  startButton: {
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#4CAF50',
  },
  inactiveButton: {
    backgroundColor: '#007B7F',
  },
  startButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DeliveryDetailsScreen;
