import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

const time = {
  nome: "SAO PAULO FC",
  escudo: "https://i.pinimg.com/736x/6c/5d/2b/6c5d2b7fb35ba8deccf2406b39544627.jpg",
}

export default function EscudoScreen() {
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
    backgroundColor: 'white',
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