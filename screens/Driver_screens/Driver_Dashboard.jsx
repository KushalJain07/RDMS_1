import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

// Helper to get color based on days left
const getTimeColor = daysLeft => {
  if (daysLeft <= 0) return 'red';
  if (daysLeft <= 3) return 'orange';
  if (daysLeft <= 7) return 'green';
  return '#555';
};

// Example delivery data
const deliveries = [
  {
    id: 1,
    partyName: 'Send Chanakpur',
    description: '3000 nos of bricks',
    date: '2025-06-09', // 1 day ago -> overdue
  },
  {
    id: 2,
    partyName: 'Jain Enterprises',
    description: '5000 nos of steel rods',
    date: '2025-06-11', // tomorrow -> urgent
  },
  {
    id: 3,
    partyName: 'Ganesh Traders',
    description: '29 bags of cement',
    date: '2025-06-15', // 5 days left -> caution
  },
  {
    id: 4,
    partyName: 'Sharma Suppliers',
    description: 'Wooden planks',
    date: '2025-06-25', // 15 days -> safe
  },
];

const Driver_Dashboard = () => {
  const navigation = useNavigation();

  const today = new Date();

  const getDaysLeft = dateStr => {
    const deliveryDate = new Date(dateStr);
    const diffTime = deliveryDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('LoginScreen')}
          style={styles.backButton}
        >
          <Icon
            name="arrow-back"
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>DRIVER DASHBOARD</Text>
        <View style={styles.notificationDot} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>
          Remaining Deliveries: {deliveries.length}
        </Text>

        {deliveries.map(delivery => {
          const daysLeft = getDaysLeft(delivery.date);
          const timeColor = getTimeColor(daysLeft);
          const formattedDate = new Date(delivery.date).toDateString();

          return (
            <View key={delivery.id} style={styles.deliveryCard}>
              <MaterialIcons
                name="local-shipping"
                size={28}
                color="#007B7F"
                style={styles.icon}
              />
              <View style={styles.deliveryInfo}>
                <Text style={styles.partyName}>{delivery.partyName}</Text>
                <Text style={styles.deliveryDescription}>
                  {delivery.description}
                </Text>
                <Text style={[styles.deliveryDate, { color: timeColor }]}>
                  {daysLeft <= 0
                    ? 'Overdue'
                    : `In ${daysLeft} day${daysLeft > 1 ? 's' : ''} (${formattedDate})`}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('DeliveryDetailsScreen')}
                >
                  <Text style={styles.viewDetails}>View Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
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
});

export default Driver_Dashboard;
