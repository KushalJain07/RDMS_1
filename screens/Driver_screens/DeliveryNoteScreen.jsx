import Icon from 'react-native-vector-icons/Ionicons';

import SignatureScreen from 'react-native-signature-canvas';
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapScreen from './MapScreen';



export default function DeliveryNoteScreen () {

const navigation = useNavigation();



  const [signature, setSignature] = useState(null);
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const signatureRef = useRef();

  function handleNavigation(screenName) {
    navigation.navigate(screenName);

    
  }




  const handleSignature = (signature) => {
    setSignature(signature);
    setShowSignaturePad(false);
  };

  const handleEmpty = () => {
    Alert.alert('Warning', 'Please provide a signature');
  };

  const clearSignature = () => {
    setSignature(null);
    signatureRef.current?.clearSignature();
  };

  const style = `.m-signature-pad--footer {display: none; margin: 0px;}`;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Icon name="add-circle" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>NEW DELIVERY NOTE</Text>
            <Text style={styles.headerSubtitle}>Fill out the details below</Text>
          </View>
        </View>

        {/* Form Container */}
        <View style={styles.formContainer}>
          {/* Party Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Party Name</Text>
            <View style={styles.inputContainer}>
              <Icon name="people-outline" size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput 
                placeholder="Enter party name" 
                style={styles.input}
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* Delivery Address */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Delivery Address</Text>
            <View style={styles.inputContainer}>
              <Icon name="location-outline" size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput 
                placeholder="Enter delivery address" 
                style={styles.input}
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={2}
              />
            </View>
          </View>

          {/* Material Description */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Material Description</Text>
            <View style={styles.inputContainer}>
              <Icon name="cube-outline" size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput 
                placeholder="Describe the material" 
                style={styles.input}
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* Quantity */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Quantity</Text>
            <View style={styles.inputContainer}>
              <Icon name="calculator-outline" size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                placeholder="Enter quantity"
                style={styles.input}
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* Upload Image Button */}
          <TouchableOpacity style={styles.uploadButton}>
            <Icon name="camera-outline" size={24} color="#fff" />
            <Text style={styles.uploadButtonText}>Upload Image</Text>
          </TouchableOpacity>

          {/* Signature Section */}
          <View style={styles.signatureSection}>
            <Text style={styles.sectionTitle}>Digital Signature</Text>
            
            {!showSignaturePad ? (
              <View style={styles.signatureContainer}>
                {signature ? (
                  <View style={styles.signaturePreview}>
                    <Text style={styles.signatureSuccessText}>✓ Signature Captured</Text>
                    <View style={styles.signatureActions}>
                      <TouchableOpacity 
                        style={styles.signatureActionButton}
                        onPress={() => setShowSignaturePad(true)}
                      >
                        <Icon name="create-outline" size={18} color="#4A90E2" />
                        <Text style={styles.signatureActionText}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={styles.signatureActionButton}
                        onPress={clearSignature}
                      >
                        <Icon name="trash-outline" size={18} color="#EF4444" />
                        <Text style={[styles.signatureActionText, {color: '#EF4444'}]}>Clear</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <TouchableOpacity 
                    style={styles.signaturePrompt}
                    onPress={() => setShowSignaturePad(true)}
                  >
                    <Icon name="create-outline" size={32} color="#6B7280" />
                    <Text style={styles.signaturePromptText}>Tap to Sign</Text>
                    <Text style={styles.signaturePromptSubtext}>Add your digital signature</Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              <View style={styles.signaturePadContainer}>
                <SignatureScreen
                  ref={signatureRef}
                  onOK={handleSignature}
                  onEmpty={handleEmpty}
                  descriptionText="Sign above"
                  clearText="Clear"
                  confirmText="Save"
                  webStyle={style}
                  autoClear={true}
                  imageType="image/svg+xml"
                />
                <TouchableOpacity 
                  style={styles.cancelSignatureButton}
                  onPress={() => setShowSignaturePad(false)}
                >
                  <Text style={styles.cancelSignatureText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Capture Location Button */}
          <TouchableOpacity style={styles.locationButton} 
            onPress={()=>navigation.navigate(MapScreen)}>
            <Icon name="navigate-outline" size={24} color="#fff" />
            <Text style={styles.locationText}>Capture Current Location</Text>
          </TouchableOpacity>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Create Delivery Note</Text>
            <Icon name="checkmark-circle-outline" size={24} color="#fff" style={styles.submitIcon} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#4A90E2',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerTitleContainer: {
    marginLeft: 15,
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  formContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: '#374151',
  },
  uploadButton: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 25,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  signatureSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 15,
  },
  signatureContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  signaturePrompt: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  signaturePromptText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginTop: 10,
  },
  signaturePromptSubtext: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  signaturePreview: {
    padding: 20,
    alignItems: 'center',
  },
  signatureSuccessText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981',
    marginBottom: 15,
  },
  signatureActions: {
    flexDirection: 'row',
    gap: 20,
  },
  signatureActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  signatureActionText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '500',
    color: '#4A90E2',
  },
  signaturePadContainer: {
    height: 250,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  cancelSignatureButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },
  cancelSignatureText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
  locationButton: {
    backgroundColor: '#F59E0B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 30,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  locationText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  submitButton: {
    backgroundColor: '#4A90E2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 12,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  submitIcon: {
    marginLeft: 8,
  },
});



