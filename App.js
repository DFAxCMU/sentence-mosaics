import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SMApp from './app/App.js';

export default function App() {
  return (
      <SMApp />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
