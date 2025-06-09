import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


const CreateDelivery = () => {
  const navigation = useNavigation();
  const [deliveryDetails, setDeliveryDetails] = useState({
    partyName: '',
    address: '',
    material: '',
    quantity: '',
    expectedDeliveryDate: '',
    contactNumber: ''
  });

  function handleSubmit(){
    const data = {
        pname: deliveryDetails.partyName,
        address: deliveryDetails.address,
        material: deliveryDetails.material,
        // quantity: deliveryDetails.quantity,
        // expectedDeliveryDate: deliveryDetails.expectedDeliveryDate,
        // contactNumber: deliveryDetails.contactNumber
    }

    
    axios.post('http://192.168.77.238:5001/register', data)  // Added data parameter
        .then((response) => {
            console.log('Delivery created successfully:', response.data);
            Alert.alert('Success', 'Delivery created successfully!');
            navigation.goBack();
        })
        .catch((error) => {
            console.error('Error creating delivery:', error);
            Alert.alert('Error', 'Failed to create delivery');
        });
    }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Delivery</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.form}>
          <Text style={styles.label}>Party Name</Text>
          <TextInput
            style={styles.input}
            value={deliveryDetails.partyName}
            onChangeText={(text) => setDeliveryDetails({...deliveryDetails, partyName: text})}
            placeholder="Enter party name"
          />

          <Text style={styles.label}>Delivery Address</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={deliveryDetails.address}
            onChangeText={(text) => setDeliveryDetails({...deliveryDetails, address: text})}
            placeholder="Enter delivery address"
            multiline
          />

          <Text style={styles.label}>Material</Text>
          <TextInput
            style={styles.input}
            value={deliveryDetails.material}
            onChangeText={(text) => setDeliveryDetails({...deliveryDetails, material: text})}
            placeholder="Enter material type"
          />

          <Text style={styles.label}>Quantity</Text>
          <TextInput
            style={styles.input}
            value={deliveryDetails.quantity}
            onChangeText={(text) => setDeliveryDetails({...deliveryDetails, quantity: text})}
            placeholder="Enter quantity"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Expected Delivery Date</Text>
          <TextInput
            style={styles.input}
            value={deliveryDetails.expectedDeliveryDate}
            onChangeText={(text) => setDeliveryDetails({...deliveryDetails, expectedDeliveryDate: text})}
            placeholder="DD/MM/YYYY"
          />

          <Text style={styles.label}>Contact Number</Text>
          <TextInput
            style={styles.input}
            value={deliveryDetails.contactNumber}
            onChangeText={(text) => setDeliveryDetails({...deliveryDetails, contactNumber: text})}
            placeholder="Enter contact number"
            keyboardType="phone-pad"
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Create Delivery</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#007B7F',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#007B7F',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateDelivery;