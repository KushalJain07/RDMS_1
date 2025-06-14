import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type Delivery = {
  _id: string;
  partyName: string;
  address: string;
  material: string;
  quantity: string;
  expectedDate: string;
  expectedTime: string;
};

const SupplierDashboard: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [isLoading, _setIsLoading] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [editingDelivery, setEditingDelivery] = useState<Delivery | null>(null);
  const [newDelivery, setNewDelivery] = useState<Omit<Delivery, '_id'>>({
    partyName: '',
    address: '',
    material: '',
    quantity: '',
    expectedDate: '',
    expectedTime: '',
  });

  useEffect(() => {
    loadMockData();
  }, []);

  const loadMockData = () => {
    const mock: Delivery[] = [
      {
        _id: 'del_001',
        partyName: 'Agarwal Cement Traders',
        address: '132 Industrial Road, Nagpur',
        material: '40 bags Cement',
        quantity: '40',
        expectedDate: '2025-06-17',
        expectedTime: '11:30 AM',
      },
      {
        _id: 'del_002',
        partyName: 'Universal Bricks',
        address: 'Plot 45, Wadi Layout',
        material: '3000 Bricks',
        quantity: '3000',
        expectedDate: '2025-06-18',
        expectedTime: '2:00 PM',
      },
    ];
    setDeliveries(mock);
  };

  const deleteDelivery = (id: string) => {
    Alert.alert('Delete Delivery', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () =>
          setDeliveries((prev) => prev.filter((d) => d._id !== id)),
      },
    ]);
  };

  const handleEdit = (delivery: Delivery) => {
    setEditingDelivery(delivery);
    setNewDelivery({
      partyName: delivery.partyName,
      address: delivery.address,
      material: delivery.material,
      quantity: delivery.quantity,
      expectedDate: delivery.expectedDate,
      expectedTime: delivery.expectedTime,
    });
  };

  const saveEdit = () => {
    if (!editingDelivery) {
      return;
    }
    setDeliveries((prev) =>
      prev.map((d) =>
        d._id === editingDelivery._id
          ? {
              ...d,
              ...newDelivery,
            }
          : d
      )
    );
    setEditingDelivery(null);
    Alert.alert('Success', 'Delivery updated');
  };

  const addDelivery = () => {
    const { partyName, address, material, quantity, expectedDate, expectedTime } = newDelivery;
    if (!partyName || !address || !material || !quantity || !expectedDate || !expectedTime) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const id = `mock_${Date.now()}`;
    const newItem: Delivery = { _id: id, ...newDelivery };
    setDeliveries((prev) => [...prev, newItem]);

    setNewDelivery({
      partyName: '',
      address: '',
      material: '',
      quantity: '',
      expectedDate: '',
      expectedTime: '',
    });
    setShowAddModal(false);
    Alert.alert('Added', 'New delivery created');
  };

  const renderInputField = (
    placeholder: string,
    key: keyof Omit<Delivery, '_id'>
  ): React.ReactElement => (
    <TextInput
      placeholder={placeholder}
      value={newDelivery[key]}
      onChangeText={(text) =>
        setNewDelivery((prev) => ({ ...prev, [key]: text }))
      }
      style={styles.input}
    />
  );

  const renderDeliveryItem = (delivery: Delivery) => (
    <View key={delivery._id} style={styles.deliveryItem}>
      <View style={styles.deliveryHeader}>
        <Text style={styles.deliveryName}>{delivery.partyName}</Text>
        <TouchableOpacity onPress={() => deleteDelivery(delivery._id)}>
          <Icon name="trash-outline" size={22} color="#EF4444" />
        </TouchableOpacity>
      </View>
      <Text>📍 {delivery.address}</Text>
      <Text>📦 {delivery.material}</Text>
      <Text>📐 {delivery.quantity}</Text>
      <Text>🕓 {delivery.expectedDate} at {delivery.expectedTime}</Text>
      <TouchableOpacity onPress={() => handleEdit(delivery)} style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
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
            <Text>Total Deliveries</Text>
            <Text style={styles.deliveryCount}>
              {isLoading ? '...' : deliveries.length}
            </Text>
          </View>
        </View>

        <View>{deliveries.map(renderDeliveryItem)}</View>

        <TouchableOpacity style={styles.addButton} onPress={() => setShowAddModal(true)}>
          <Text style={styles.addButtonText}>Add Delivery</Text>
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
            {renderInputField('Expected Date', 'expectedDate')}
            {renderInputField('Expected Time', 'expectedTime')}

            <TouchableOpacity style={styles.modalActionButton} onPress={addDelivery}>
              <Text style={styles.addButtonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowAddModal(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
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
            {renderInputField('Expected Date', 'expectedDate')}
            {renderInputField('Expected Time', 'expectedTime')}

            <TouchableOpacity style={styles.modalActionButton} onPress={saveEdit}>
              <Text style={styles.addButtonText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEditingDelivery(null)}>
              <Text style={styles.cancelText}>Cancel</Text>
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
  editButton: {
    backgroundColor: '#FBBF24',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalActionButton: {
    backgroundColor: '#007B7F',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelText: {
    color: '#EF4444',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default SupplierDashboard;
