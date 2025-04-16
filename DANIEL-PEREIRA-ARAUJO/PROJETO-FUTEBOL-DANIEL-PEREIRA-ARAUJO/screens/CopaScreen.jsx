import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

const copa = {
  nome: "Flamengo",
  escudo: "https://i.pinimg.com/236x/16/db/d2/16dbd20fd582e025dc54cc3fbd1839c9.jpg",
}

export default function CopaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.nome}>{time.nome}</Text>
      <Image source={{ uri: time.escudo }} style={styles.escudo} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 20
  },
  nome: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white'
  },
  escudo: {
    width: 300,
    height: 300,
    resizeMode: 'contain'
  }
})