// DeliveryDetailsScreen.js
import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const DeliveryDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const delivery = route.params?.delivery;

  const handleDelete = () => {
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
            axios.delete(`http://10.0.2.2:5001/deliveries/${delivery._id}`)
              .then(() => {
                Alert.alert("Success", "Delivery deleted successfully");
                navigation.navigate('Supplier_Dashboard', { refresh: true });
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delivery Details</Text>
        <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
          <Icon name="trash-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.label}>Party Name</Text>
          <Text style={styles.value}>{delivery.pname}</Text>

          <Text style={styles.label}>Address</Text>
          <Text style={styles.value}>{delivery.address}</Text>

          <Text style={styles.label}>Material</Text>
          <Text style={styles.value}>{delivery.material}</Text>

          <Text style={styles.label}>Quantity</Text>
          <Text style={styles.value}>{delivery.quantity}</Text>

          <Text style={styles.label}>Expected Delivery</Text>
          <Text style={styles.value}>{delivery.expectedDeliveryDate}</Text>

          <Text style={styles.label}>Contact Number</Text>
          <Text style={styles.value}>{delivery.contactNumber}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f7' },
  content: { padding: 20 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#007B7F',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
    marginLeft: -24, // To center the title properly
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  label: { fontSize: 14, color: '#888', marginTop: 8 },
  value: { fontSize: 16, fontWeight: '500', color: '#333', marginTop: 2 },
  deleteButton: {
    padding: 8,
  },
});

export default DeliveryDetailsScreen;
