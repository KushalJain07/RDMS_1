import React from 'react';
import { 
  Text, 
  View, 
  Button, 
  StyleSheet, 

  Dimensions,
  SafeAreaView 
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

// import { StackNavigationProp } from '@react-navigation/stack';

export default function MapScreen(){

const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>Order #123456</Text>
        <Text style={styles.detailText}>Delivery Address:</Text>
        <Text style={styles.addressText}>123 Main Street</Text>
        <Text style={styles.addressText}>Apt 4B</Text>
        <Text style={styles.addressText}>New York, NY 10001</Text>
        
        <Text style={styles.detailText}>Estimated Delivery Time:</Text>
        <Text style={styles.timeText}>30-45 minutes</Text>
      </View>
      <Button 
        title="Go back"
        onPress={() => navigation.goBack()}
        color="#2196F3"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
  },
  deliveryImage: {
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
    alignSelf: 'center',
    marginVertical: 20,
  },
  detailsContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    elevation: 4,
    marginVertical: 10,
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginTop: 8,
  },
  addressText: {
    fontSize: 14,
    color: '#444',
    marginVertical: 2,
    lineHeight: 20,
  },
  timeText: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: '700',
    marginTop: 4,
  }
});