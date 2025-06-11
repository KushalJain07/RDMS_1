import React, { useState } from 'react';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';




const Supplier_Dashboard = () => {
  const [deliveries, setDeliveries] = useState([
    {
      id: 1,
      partyName: 'Sendchankapur',
      address: '123 Main Street',
      material: 'Bricks',
      quantity: '3000 nos',
      expectedDate: '2025-06-12',
      expectedTime: '10:00 AM',
    },
    {
      id: 2,
      partyName: 'Jain Enterprises',
      address: '45 Industrial Zone',
      material: 'Cement',
      quantity: '29 bags',
      expectedDate: '2025-06-13',
      expectedTime: '2:00 PM',
    },
  ]);

  const [editingDelivery, setEditingDelivery] = useState(null);
  const [newDelivery, setNewDelivery] = useState({
    partyName: '',
    address: '',
    material: '',
    quantity: '',
    expectedDate: '',
    expectedTime: '',
  });
  const [showAddModal, setShowAddModal] = useState(false);

  const handleEdit = (delivery) => {
    setEditingDelivery(delivery);
    setNewDelivery(delivery);
  };

  const saveEdit = () => {
    setDeliveries((prev) =>
      prev.map((d) => (d.id === editingDelivery.id ? newDelivery : d))
    );
    setEditingDelivery(null);
  };

  const handleRemove = (deliveryId) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this delivery?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setDeliveries((prev) => prev.filter((d) => d.id !== deliveryId));
        },
      },
    ]);
  };

  const addDelivery = () => {
    const { partyName, address, material, quantity, expectedDate, expectedTime } = newDelivery;
    if (!partyName || !address || !material || !quantity || !expectedDate || !expectedTime) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    const newEntry = { ...newDelivery, id: Date.now() };
    setDeliveries((prev) => [...prev, newEntry]);
    setNewDelivery({
      partyName: '',
      address: '',
      material: '',
      quantity: '',
      expectedDate: '',
      expectedTime: '',
    });
    setShowAddModal(false);
  };

  const renderDeliveryItem = (delivery) => (
    <View key={delivery.id} style={styles.deliveryItem}>
      <View style={styles.deliveryHeader}>
        <Text style={styles.deliveryName}>{delivery.partyName}</Text>
        <TouchableOpacity
          onPress={() =>
            Alert.alert('Options', '', [
              { text: 'Edit', onPress: () => handleEdit(delivery) },
              { text: 'Remove', onPress: () => handleRemove(delivery.id), style: 'destructive' },
              { text: 'Cancel', style: 'cancel' },
            ])
          }
        >
          <MaterialIcons name="more-vert" size={20} color="#555" />
        </TouchableOpacity>
      </View>
      <Text style={styles.deliveryDescription}>Address: {delivery.address}</Text>
      <Text style={styles.deliveryDescription}>Material: {delivery.material}</Text>
      <Text style={styles.deliveryDescription}>Quantity: {delivery.quantity}</Text>
      <Text style={styles.deliveryDescription}>
        Expected Delivery: {delivery.expectedDate} at {delivery.expectedTime}
      </Text>
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
  
const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
            <Text style={styles.deliveryCount}>{deliveries.length}</Text>
          </View>
        </View>

        {deliveries.map(renderDeliveryItem)}

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
  deliveryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  deliveryName: {
    fontSize: 16,
    fontWeight: 'bold',
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
});

export default Supplier_Dashboard;
