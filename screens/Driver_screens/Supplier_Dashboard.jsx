import React, { useState, useEffect } from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Alert,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

// Update API_URL to match your backend URL
const API_URL = 'http://192.168.77.238:5001';

const Supplier_Dashboard = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [deliveries, setDeliveries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDelivery, setEditingDelivery] = useState(null);
  const [newDelivery, setNewDelivery] = useState({
    partyName: '',
    address: '',
    material: '',
    quantity: '',
    expectedDate: '',
    expectedTime: ''
  });

  useEffect(() => {
    fetchDeliveries();
  }, []);

  useEffect(() => {
    if (route.params?.refresh) {
      fetchDeliveries();
    }
  }, [route.params?.refresh]);

  // Update fetchDeliveries function
  const fetchDeliveries = () => {
    setIsLoading(true);
    axios.get(`${API_URL}/deliveries`)  // Changed from /deliveries to /register
      .then(response => {
        setDeliveries(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching deliveries:', error);
        Alert.alert('Error', 'Failed to fetch deliveries');
        setIsLoading(false);
      });
  };

  // Update the deleteDelivery function
  const deleteDelivery = (id) => {
    Alert.alert(
      "Delete Delivery",
      "Are you sure you want to delete this delivery?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              console.log('Deleting delivery with ID:', id);
              const response = await axios.delete(`${API_URL}/register/${id}`);
              
              if (response.status === 200) {
                console.log('Delete successful:', response.data);
                setDeliveries(prevDeliveries => 
                  prevDeliveries.filter(delivery => delivery._id !== id)
                );
                Alert.alert("Success", "Delivery deleted successfully");
              }
            } catch (error) {
              console.error('Error details:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
              });
              Alert.alert(
                "Error", 
                error.response?.data?.message || "Failed to delete delivery"
              );
            }
          }
        }
      ]
    );
  };

  const handleEdit = (delivery) => {
    setEditingDelivery(delivery);
    setNewDelivery(delivery);
  };

  // Update saveEdit function
  const saveEdit = async () => {
    try {
      await axios.put(`${API_URL}/register/${editingDelivery._id}`, {
        pname: newDelivery.partyName,
        address: newDelivery.address,
        material: newDelivery.material,
        quantity: newDelivery.quantity,
        expectedDeliveryDate: newDelivery.expectedDate,
        contactNumber: newDelivery.contactNumber
      });

      setDeliveries((prev) =>
        prev.map((d) => (d._id === editingDelivery._id ? {
          ...d,
          pname: newDelivery.partyName,
          address: newDelivery.address,
          material: newDelivery.material,
          quantity: newDelivery.quantity,
          expectedDeliveryDate: newDelivery.expectedDate,
          contactNumber: newDelivery.contactNumber
        } : d))
      );
      setEditingDelivery(null);
      Alert.alert('Success', 'Delivery updated successfully');
    } catch (error) {
      console.error('Error updating delivery:', error);
      Alert.alert('Error', 'Failed to update delivery');
    }
  };

  const addDelivery = async () => {
    const { partyName, address, material, quantity, expectedDate, expectedTime } = newDelivery;
    
    if (!partyName || !address || !material || !quantity || !expectedDate || !expectedTime) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/register`, {
        pname: partyName,
        address: address,
        material: material,
        quantity: quantity,
        expectedDeliveryDate: expectedDate,
        expectedTime: expectedTime
      });

      setDeliveries((prev) => [...prev, response.data]);
      setNewDelivery({
        partyName: '',
        address: '',
        material: '',
        quantity: '',
        expectedDate: '',
        expectedTime: '',
      });
      setShowAddModal(false);
      
      Alert.alert(
        'Success',
        'Delivery added successfully',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('SupplierDashboard', { refresh: true })
          }
        ]
      );
    } catch (error) {
      console.error('Error adding delivery:', error);
      Alert.alert('Error', 'Failed to add delivery');
    }
  };

  // Update the renderDeliveryItem function
  const renderDeliveryItem = (delivery) => (
    <View key={delivery._id} style={styles.deliveryItem}>
      <View style={styles.deliveryHeader}>
        <Text style={styles.deliveryName}>{delivery.pname}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteDelivery(delivery._id)}
        >
          <Icon name="trash-outline" size={24} color="#FF4444" />
        </TouchableOpacity>
      </View>
      <Text style={styles.deliveryDescription}>Address: {delivery.address}</Text>
      <Text style={styles.deliveryDescription}>Material: {delivery.material}</Text>
      <Text style={styles.deliveryDescription}>Quantity: {delivery.quantity}</Text>
      <Text style={styles.deliveryDescription}>Expected: {delivery.expectedDeliveryDate}</Text>
    </View>
  );
  

  const renderInputField = (placeholder, key) => (
    <TextInput
      placeholder={placeholder}
      value={newDelivery[key]}
      onChangeText={(text) => setNewDelivery((prev) => ({ ...prev, [key]: text }))}
      style={styles.input}
    />
  );
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('DeliveryNoteScreen')}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SUPPLIER DASHBOARD</Text>
        <View style={styles.notificationDot} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Today's Deliveries</Text>
        <View style={styles.deliveryCard}>
          <MaterialIcons name="local-shipping" size={24} color="#007B7F" />
          <View style={styles.deliveryInfo}>
            <Text style={styles.deliveryTitle}>Total Deliveries</Text>
            <Text style={styles.deliveryCount}>
              {isLoading ? '...' : deliveries.length}
            </Text>
          </View>
        </View>

        {/* Wrap the conditional rendering in a View */}
        <View>
          {isLoading ? (
            <Text style={styles.loadingText}>Loading deliveries...</Text>
          ) : (
            deliveries.map(renderDeliveryItem)
          )}
        </View>

        <TouchableOpacity
          style={[styles.addButton, { marginTop: 20 }]}
          onPress={() => setShowAddModal(true)}
        >
          <Text style={styles.addButtonText}>Add Delivery Details</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Add Delivery Modal */}
      <Modal visible={showAddModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.sectionTitle}>Add New Delivery</Text>
            {renderInputField('Party Name', 'partyName')}
            {renderInputField('Address', 'address')}
            {renderInputField('Material', 'material')}
            {renderInputField('Quantity', 'quantity')}
            {renderInputField('Expected Date (YYYY-MM-DD)', 'expectedDate')}
            {renderInputField('Expected Time (e.g. 10:00 AM)', 'expectedTime')}

            <TouchableOpacity style={styles.addButton} onPress={addDelivery}>
              <Text style={styles.addButtonText}>Add Delivery</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowAddModal(false)}>
              <Text style={[styles.link, { marginTop: 10 }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Edit Modal */}
      <Modal visible={!!editingDelivery} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.sectionTitle}>Edit Delivery</Text>
            {renderInputField('Party Name', 'partyName')}
            {renderInputField('Address', 'address')}
            {renderInputField('Material', 'material')}
            {renderInputField('Quantity', 'quantity')}
            {renderInputField('Expected Date (YYYY-MM-DD)', 'expectedDate')}
            {renderInputField('Expected Time (e.g. 10:00 AM)', 'expectedTime')}
            <TouchableOpacity style={styles.addButton} onPress={saveEdit}>
              <Text style={styles.addButtonText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEditingDelivery(null)}>
              <Text style={[styles.link, { marginTop: 10 }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginBottom: 12,
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
  deliveryItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#FFE5E5',
  },
  deliveryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  deliveryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  deliveryDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#007B7F',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#007B7F',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 4,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  link: {
    color: '#007B7F',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '85%',
  },
  loadingText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
});

export default Supplier_Dashboard;
