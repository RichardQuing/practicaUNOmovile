import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UsuarioScreen from './screens/UsuarioScreen';


export default function App() {
  return (
    <View>
      <UsuarioScreen/>
    </View>
      
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});