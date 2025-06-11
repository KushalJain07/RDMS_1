// DeliveryDetailsScreen.js
import React, { useState } from 'react';
import { 
  SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, LayoutAnimation, UIManager, Platform 
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental)
{
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DeliveryDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const delivery = route.params?.deliveryData;

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

  if (!delivery) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Error</Text>
        </View>
        <View style={styles.content}>
          <Text>No delivery data available</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delivery Details</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.detailCard}>
          <Text style={styles.label}>Party Name</Text>
          <Text style={styles.value}>{delivery.pname}</Text>
          
          <Text style={styles.label}>Address</Text>
          <Text style={styles.value}>{delivery.address}</Text>
          
          <Text style={styles.label}>Material</Text>
          <Text style={styles.value}>{delivery.material}</Text>
          
          <Text style={styles.label}>Quantity</Text>
          <Text style={styles.value}>{delivery.quantity}</Text>
          
          <Text style={styles.label}>Expected Delivery</Text>
          <Text style={styles.value}>
            {new Date(delivery.expectedDeliveryDate).toLocaleDateString()}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
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
  content: {
    padding: 20,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  detailCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 12,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
});

export default DeliveryDetailsScreen;
