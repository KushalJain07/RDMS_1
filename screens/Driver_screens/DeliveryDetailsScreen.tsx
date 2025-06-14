import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  UIManager,
  Platform,
} from 'react-native';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';


// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Delivery = {
  pname: string;
  address: string;
  material: string;
  quantity: string;
  expectedDeliveryDate: string;
};

type RouteParams = {
  deliveryData: Delivery;
};

const DeliveryDetailsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const delivery = route.params?.deliveryData;

  // State to manage the active delivery index for animations
  // add useState at imports to use this -- future ref
  // const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // const handleStartDelivery = (index: number) => {
  //   LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  //   setActiveIndex((prev) => (prev === index ? null : index));
  // };

  if (!delivery) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
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
