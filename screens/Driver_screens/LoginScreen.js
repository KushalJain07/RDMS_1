import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [selectedRole, setSelectedRole] = useState('Driver');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (selectedRole === 'Driver') {
      navigation.navigate('DriverDashboard');
    } else if (selectedRole === 'Supplier') {
      navigation.navigate('Supplier_Dashboard');
    } else {
      navigation.navigate('CustomerDashboard');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../public/images/logo.png')}
            style={styles.logo}
          />
        </View>

        <Text style={styles.loginHeading}>LOG IN</Text>

        {/* Role Selection */}
        <View style={styles.radioGroup}>
          {['Driver', 'Supplier', 'Customer'].map(role => (
            <TouchableOpacity
              key={role}
              style={styles.radioButton}
              onPress={() => setSelectedRole(role)}
            >
              <View style={styles.outerCircle}>
                {selectedRole === role && <View style={styles.innerCircle} />}
              </View>
              <Text style={styles.radioLabel}>{role}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Inputs */}
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>

        <Text style={styles.link}>Forgot password?</Text>
        <Text style={styles.link}>Sign up</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
  },
  container: {
    padding: 30,
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#4F46E5',
    backgroundColor: '#fff',
  },
  loginHeading: {
    alignSelf: 'center',
    backgroundColor: '#4F46E5',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 25,
    textAlign: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outerCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  innerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#4F46E5',
  },
  radioLabel: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  loginButton: {
    backgroundColor: '#4F46E5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  link: {
    textAlign: 'center',
    color: '#4F46E5',
    marginTop: 15,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
