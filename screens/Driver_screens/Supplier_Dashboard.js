import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

const Supplier_Dashboard = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    fetchDeliveries();
  }, []);

  useEffect(() => {
    if (route.params?.refresh) {
      fetchDeliveries();
    }
  }, [route.params?.refresh]);

  const fetchDeliveries = () => {
    axios.get('http://192.168.77.238:5001/deliveries')
      .then(response => {
        setDeliveries(response.data);
      })
      .catch(error => {
        console.error('Error fetching deliveries:', error);
        Alert.alert('Error', 'Failed to fetch deliveries');
      });
  };

  const deleteDelivery = (id) => {
    Alert.alert(
      "Delete Delivery",
      "Are you sure you want to delete this delivery?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            axios.delete(`http://192.168.77.238:5001/deliveries/${id}`)
              .then(() => {
                // Remove from local state
                setDeliveries(deliveries.filter(delivery => delivery._id !== id));
                Alert.alert("Success", "Delivery deleted successfully");
              })
              .catch(error => {
                console.error('Error deleting delivery:', error);
                Alert.alert("Error", "Failed to delete delivery");
              });
          }
        }
      ]
    );
  };

  const renderDeliveryItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.deliveryContent}>
        <Text style={styles.partyName}>{item.pname}</Text>
        <Text style={styles.details}>Material: {item.material}</Text>
        <Text style={styles.details}>Quantity: {item.quantity}</Text>
        <Text style={styles.details}>Expected: {item.expectedDeliveryDate}</Text>
      </View>
      <TouchableOpacity 
        style={styles.deleteIconButton}
        onPress={() => deleteDelivery(item._id)}
      >
        <Icon name="trash-outline" size={24} color="#FF4444" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Icon name="arrow-back" size={24} color="#fff" onPress={()=>navigation.goBack()} />
        <Text style={styles.headerTitle}>SUPPLIER DASHBOARD</Text>
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
        <FlatList
          data={deliveries}
          renderItem={renderDeliveryItem}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.listContainer}
        />
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
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deliveryContent: {
    flex: 1,
  },
  deleteIconButton: {
    backgroundColor: '#FFE5E5',
    padding: 8,
    borderRadius: 8,
    marginLeft: 12,
  },
});

export default Supplier_Dashboard;

