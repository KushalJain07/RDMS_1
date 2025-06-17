import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SignatureScreen from 'react-native-signature-canvas';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type DeliveryDetails = {
  partyName: string;
  address: string;
  material: string;
  quantity: string;
  expectedDeliveryDate: string;
  contactNumber: string;
};

export default function DeliveryNoteScreen() {
  const navigation = useNavigation<NavigationProp<any>>();
  const [signature, setSignature] = useState<string | null>(null);
  const [showSignaturePad, setShowSignaturePad] = useState<boolean>(false);
  const signatureRef = useRef<any>(null);

  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>({
    partyName: '',
    address: '',
    material: '',
    quantity: '',
    expectedDeliveryDate: '',
    contactNumber: '',
  });

  const [isLoading, _setIsLoading] = useState<boolean>(false);
  const signatureWebStyle = '.m-signature-pad--footer {display: none; margin: 0px;}';

  const handleSignature = (sig: string) => {
    setSignature(sig);
    setShowSignaturePad(false);
  };

  const handleEmpty = () => {
    Alert.alert('Warning', 'Please provide a signature.');
  };

  const clearSignature = () => {
    setSignature(null);
  };

  const handleSubmit = () => {
    if (!deliveryDetails.partyName || !deliveryDetails.address || !deliveryDetails.material) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    Alert.alert('Saved Locally', 'This is a frontend-only mockup for now.');
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('LoginScreen')}
          >
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>New Delivery Note</Text>
            <Text style={styles.headerSubtitle}>Fill in the details below</Text>
          </View>
        </View>

        <View style={styles.formContainer}>
          {/* Party Name Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Party Name</Text>
            <View style={styles.inputContainer}>
              <Icon name="people-outline" size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                placeholder="Enter party name"
                style={styles.input}
                placeholderTextColor="#9CA3AF"
                value={deliveryDetails.partyName}
                onChangeText={(text) =>
                  setDeliveryDetails({ ...deliveryDetails, partyName: text })
                }
              />
            </View>
          </View>

          {/* Address */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Delivery Address</Text>
            <View style={styles.inputContainer}>
              <Icon name="location-outline" size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                placeholder="Enter delivery address"
                style={styles.input}
                placeholderTextColor="#9CA3AF"
                multiline
                value={deliveryDetails.address}
                onChangeText={(text) =>
                  setDeliveryDetails({ ...deliveryDetails, address: text })
                }
              />
            </View>
          </View>

          {/* Material */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Material Description</Text>
            <View style={styles.inputContainer}>
              <Icon name="cube-outline" size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                placeholder="Describe the material"
                style={styles.input}
                placeholderTextColor="#9CA3AF"
                value={deliveryDetails.material}
                onChangeText={(text) =>
                  setDeliveryDetails({ ...deliveryDetails, material: text })
                }
              />
            </View>
          </View>

          {/* Quantity */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Quantity</Text>
            <View style={styles.inputContainer}>
              <Icon
                name="calculator-outline"
                size={20}
                color="#6B7280"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Enter quantity"
                style={styles.input}
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
                value={deliveryDetails.quantity}
                onChangeText={(text) =>
                  setDeliveryDetails({ ...deliveryDetails, quantity: text })
                }
              />
            </View>
          </View>

          {/* Upload Button */}
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
                    <Image
                      source={{ uri: signature }}
                      style={styles.signatureImage}
                      resizeMode="contain"
                    />
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
                        <Text style={[styles.signatureActionText, styles.signatureActionTextDanger]}>
                          Clear
                        </Text>
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
                  webStyle={signatureWebStyle}
                  autoClear
                  imageType="image/png"
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

          {/* Location Button */}
          <TouchableOpacity
            style={styles.locationButton}
            onPress={() => navigation.navigate('MapScreen')}
          >
            <Icon name="navigate-outline" size={24} color="#fff" />
            <Text style={styles.locationText}>Capture Current Location</Text>
          </TouchableOpacity>

          {/* Submit */}
          <TouchableOpacity
            style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            <Text style={styles.submitButtonText}>
              {isLoading ? 'Creating...' : 'Create Delivery Note'}
            </Text>
            <Icon
              name="checkmark-circle-outline"
              size={24}
              color="#fff"
              style={styles.submitIcon}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F9FAFB',
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#4A90E2',
    paddingTop: 60,
    paddingBottom: 25,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  headerTitleContainer: {
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
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
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#374151',
  },
  uploadButton: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 25,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  signatureSection: {
    marginBottom: 30,
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
  },
  signaturePrompt: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  signaturePromptText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginTop: 8,
  },
  signaturePromptSubtext: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  signaturePreview: {
    padding: 15,
  },
  signatureImage: {
    width: '100%',
    height: 100,
  },
  signatureActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 10,
  },
  signatureActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
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
  signatureActionTextDanger: {
    color: '#EF4444',
  },
  cancelSignatureButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  cancelSignatureText: {
    color: '#6B7280',
    fontSize: 14,
  },
  locationButton: {
    backgroundColor: '#F59E0B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 25,
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
    paddingVertical: 16,
    borderRadius: 12,
  },
  submitButtonDisabled: {
    opacity: 0.7,
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
