import React, { useState, useEffect  } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute, NavigationProp, RouteProp } from '@react-navigation/native';

type Delivery = {
  _id: string;
  pname: string;
  material: string;
  quantity: string;
  expectedDeliveryDate: string;
  address: string;
};

type RootStackParamList = {
  Driver_Dashboard: { refresh?: boolean } | undefined;
  // Add other screens and their params here if needed
};
const Driver_Dashboard: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Driver_Dashboard'>>();
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [isLoading, _setIsLoading] = useState(false);
  const today = new Date();


  useEffect(() => {
    // Simulated local data for frontend only
    const mockDeliveries: Delivery[] = [
      {
        _id: '1',
        pname: 'Singh Distributors',
        material: 'Bricks',
        quantity: '4000',
        expectedDeliveryDate: getRandomDate(),
        address: 'A-12, Old Town Rd, Indore',
      },
    ];
    setDeliveries(mockDeliveries);
  }, []);

  useEffect(() => {
    if (route?.params?.refresh) {
      // Could trigger state reload here if needed
    }
  }, [route?.params?.refresh]);

  const getRandomDate = () => {
    const future = new Date();
    future.setDate(future.getDate() + Math.floor(Math.random() * 10) + 1);
    return future.toISOString();
  };

  const getDaysLeft = (dateStr: string): number => {
    const deliveryDate = new Date(dateStr);
    const diffTime = deliveryDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getTimeColor = (daysLeft: number): string => {
    if (daysLeft <= 0) {
      return 'red';
    }
    if (daysLeft <= 3) {
      return 'orange';
    }
    if (daysLeft <= 7) {
      return 'green';
    }
    return '#555';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} style={styles.backButton}>
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
            .sort((a, b) =>
              new Date(a.expectedDeliveryDate).getTime() - new Date(b.expectedDeliveryDate).getTime()
            )
            .map((delivery) => {
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
                      onPress={() =>
                        navigation.navigate('DeliveryDetailsScreen', { deliveryData: delivery })
                      }
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
    fontSize: 16,
  },
  detailsButton: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    backgroundColor: '#E0F7FA',
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
