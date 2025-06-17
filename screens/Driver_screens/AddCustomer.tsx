import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Theme } from '../../constants/theme';

type CustomerDetails = {
  customerName: string;
  gstId: string;
  companyName: string;
  numberOfSites: string;
  siteAddress: string;
  contactNumber: string;
  email: string;
  remarks: string;
};

const CustomerDetailsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [details, setDetails] = useState<CustomerDetails>({
    customerName: '',
    gstId: '',
    companyName: '',
    numberOfSites: '',
    siteAddress: '',
    contactNumber: '',
    email: '',
    remarks: '',
  });

  const handleSubmit = () => {
    Alert.alert('Note', 'Customer data saved (mock). API integration pending.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={Theme.Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Customer Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.form}>
          <Text style={styles.sectionTitle}>Customer Information</Text>

          <Text style={styles.label}>
            Customer Name <Text style={styles.asterisk}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter customer name"
            placeholderTextColor={Theme.Colors.gray}
            value={details.customerName}
            onChangeText={(text) => setDetails({ ...details, customerName: text })}
          />

          <Text style={styles.label}>Company Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter company name"
            placeholderTextColor={Theme.Colors.gray}
            value={details.companyName}
            onChangeText={(text) => setDetails({ ...details, companyName: text })}
          />

          <Text style={styles.label}>
            GST ID <Text style={styles.asterisk}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter GST ID"
            placeholderTextColor={Theme.Colors.gray}
            value={details.gstId}
            onChangeText={(text) => setDetails({ ...details, gstId: text })}
          />

          <Text style={styles.label}>
            Contact Number <Text style={styles.asterisk}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter contact number"
            placeholderTextColor={Theme.Colors.gray}
            keyboardType="phone-pad"
            value={details.contactNumber}
            onChangeText={(text) => setDetails({ ...details, contactNumber: text })}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            placeholderTextColor={Theme.Colors.gray}
            keyboardType="email-address"
            value={details.email}
            onChangeText={(text) => setDetails({ ...details, email: text })}
          />

          <Text style={styles.sectionTitle}>Site Information</Text>

          <Text style={styles.label}>
            Number of Sites <Text style={styles.asterisk}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 3"
            placeholderTextColor={Theme.Colors.gray}
            keyboardType="numeric"
            value={details.numberOfSites}
            onChangeText={(text) => setDetails({ ...details, numberOfSites: text })}
          />

          <Text style={styles.label}>
            Site Address <Text style={styles.asterisk}>*</Text>
          </Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter address(es)"
            placeholderTextColor={Theme.Colors.gray}
            multiline
            value={details.siteAddress}
            onChangeText={(text) => setDetails({ ...details, siteAddress: text })}
          />

          <Text style={styles.label}>Remarks</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Any additional remarks"
            placeholderTextColor={Theme.Colors.gray}
            multiline
            value={details.remarks}
            onChangeText={(text) => setDetails({ ...details, remarks: text })}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Save Customer</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.Colors.background,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: Theme.Colors.primary,
    alignItems: 'center',
    paddingVertical: Theme.Spacing.xl,
    paddingHorizontal: Theme.Spacing.lg,
    justifyContent: 'space-between',
    paddingTop: Theme.Spacing.xxl,
  },
  headerTitle: {
    color: Theme.Colors.white,
    fontSize: Theme.FontSizes.xl,
    fontWeight: 'bold',
    fontFamily: Theme.Fonts.bold,
  },
  headerSpacer: {
    width: 24,
  },
  content: {
    padding: Theme.Spacing.lg,
  },
  form: {
    backgroundColor: Theme.Colors.white,
    borderRadius: Theme.BorderRadius.lg,
    padding: Theme.Spacing.lg,
    ...Theme.Shadows.medium,
  },
  sectionTitle: {
    fontSize: Theme.FontSizes.large,
    fontWeight: '600',
    color: Theme.Colors.black80,
    marginBottom: Theme.Spacing.md,
  },
  label: {
    fontSize: Theme.FontSizes.medium,
    fontWeight: '500',
    color: Theme.Colors.black80,
    marginBottom: Theme.Spacing.xs,
    fontFamily: Theme.Fonts.regular,
  },
  asterisk: {
    color: Theme.Colors.danger,
  },
  input: {
    borderWidth: 1,
    borderColor: Theme.Colors.lightGray,
    borderRadius: Theme.BorderRadius.md,
    padding: Theme.Spacing.md,
    marginBottom: Theme.Spacing.lg,
    fontSize: Theme.FontSizes.medium,
    color: Theme.Colors.black,
    fontFamily: Theme.Fonts.regular,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: Theme.Colors.primaryDark,
    padding: Theme.Spacing.lg,
    borderRadius: Theme.BorderRadius.md,
    alignItems: 'center',
    marginTop: Theme.Spacing.md,
  },
  submitButtonText: {
    color: Theme.Colors.white,
    fontSize: Theme.FontSizes.medium,
    fontWeight: 'bold',
    fontFamily: Theme.Fonts.bold,
  },
});

export default CustomerDetailsScreen;
