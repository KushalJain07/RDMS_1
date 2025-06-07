import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import DeliveryNoteScreen from './screens/Driver_screens/DeliveryNoteScreen';
import MapScreen from './screens/Driver_screens/MapScreen';


const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <DeliveryNoteScreen />
      <MapScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
