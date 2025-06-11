import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

const API_URL = 'http://192.168.77.238:5001';

const Driver_Dashboard = ({ route }) => {  // Add route as a prop
  const navigation = useNavigation();
  const [deliveries, setDeliveries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const today = new Date();

  useEffect(() => {
    fetchDeliveries();
  }, []);

  // Update the refresh effect to use optional chaining
  useEffect(() => {
    if (route?.params?.refresh) {
      fetchDeliveries();
    }
  }, [route?.params?.refresh]);

  const getRandomDate = () => {
    const today = new Date();
    const randomDays = Math.floor(Math.random() * 20) + 1; // Random number between 1-20
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + randomDays);
    return futureDate.toISOString();
  };

  const fetchDeliveries = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/deliveries`);
      // Add random dates to each delivery
      const deliveriesWithDates = response.data.map(delivery => ({
        ...delivery,
        expectedDeliveryDate: delivery.expectedDeliveryDate || getRandomDate()
      }));
      console.log('Fetched deliveries:', deliveriesWithDates);
      setDeliveries(deliveriesWithDates);
    } catch (error) {
      console.error('Error fetching deliveries:', error);
      Alert.alert('Error', 'Failed to fetch deliveries');
    } finally {
      setIsLoading(false);
    }
  };

  const getDaysLeft = dateStr => {
    const deliveryDate = new Date(dateStr);
    const diffTime = deliveryDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Helper to get color based on days left
  const getTimeColor = daysLeft => {
    if (daysLeft <= 0) return 'red';
    if (daysLeft <= 3) return 'orange';
    if (daysLeft <= 7) return 'green';
    return '#555';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('LoginScreen')}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>DRIVER DASHBOARD</Text>
        <View style={styles.notificationDot} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>
          Remaining Deliveries: {deliveries.length}
        </Text>

        {isLoading ? (
          <Text style={styles.loadingText}>Loading deliveries...</Text>
        ) : (
          deliveries
            .sort((a, b) => new Date(a.expectedDeliveryDate) - new Date(b.expectedDeliveryDate))
            .map(delivery => {
              const daysLeft = getDaysLeft(delivery.expectedDeliveryDate);
              const timeColor = getTimeColor(daysLeft);
              const formattedDate = new Date(delivery.expectedDeliveryDate).toDateString();

              return (
                <View key={delivery._id} style={styles.deliveryCard}>
                  <MaterialIcons
                    name="local-shipping"
                    size={28}
                    color="#007B7F"
                    style={styles.icon}
                  />
                  <View style={styles.deliveryInfo}>
                    <Text style={styles.partyName}>{delivery.pname}</Text>
                    <Text style={styles.deliveryDescription}>
                      {delivery.material} - {delivery.quantity}
                    </Text>
                    <Text style={[styles.deliveryDate, { color: timeColor }]}>
                      {daysLeft <= 0
                        ? 'Overdue'
                        : `In ${daysLeft} day${daysLeft > 1 ? 's' : ''} (${formattedDate})`}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        console.log('Navigating with delivery:', delivery);
                        navigation.navigate('DeliveryDetailsScreen', {
                          deliveryData: delivery
                        });
                      }}
                      style={styles.detailsButton}
                    >
                      <Text style={styles.viewDetails}>View Details</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const DeliveryDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const delivery = route.params?.deliveryData;

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
    color: '#1F2937',
  },
  deliveryCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  icon: {
    marginRight: 16,
  },
  deliveryInfo: {
    flex: 1,
  },
  partyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  deliveryDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  deliveryDate: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  viewDetails: {
    color: '#007B7F',
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  loadingText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
    fontSize: 16
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

export default Driver_Dashboard;
