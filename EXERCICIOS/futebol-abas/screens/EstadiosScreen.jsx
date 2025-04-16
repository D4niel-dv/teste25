import React from 'react'
import { View, Text, FlatList, Image, StyleSheet } from 'react-native'

// Dados dos estádios
const estadios = [
  {
    id: 1,
    nome: "Lusail Iconic Stadium",
    cidade: "Lusail",
    capacidade: 80000,
    imagem: "https://i.pinimg.com/1200x/80/3d/0f/803d0f07020dac1ac638e6dfcc7a0607.jpg"
  },
  {
    id: 2,
    nome: "Al Bayt Stadium",
    cidade: "Al Khor",
    capacidade: 60000,
    imagem: "https://i.pinimg.com/1200x/d9/87/a5/d987a5f490e32083c094839e78e97e67.jpg"
  },
  {
    id: 3,
    nome: "Stadium 974",
    cidade: "Doha",
    capacidade: 40000,
    imagem: "https://i.pinimg.com/1200x/63/47/7b/63477b146143956117fdeb6d06b7b2f6.jpg"
  },
  {
    id: 4,
    nome: "Al Thumama Stadium",
    cidade: "Al Thumama",
    capacidade: 40000,
    imagem: "https://i.pinimg.com/1200x/7c/d4/3f/7cd43f44ceb9a451011c6fb5b4c7b6ad.jpg"
  },
  {
    id: 5,
    nome: "Education City Stadium",
    cidade: "Al Rayyan",
    capacidade: 45350,
    imagem: "https://i.pinimg.com/1200x/91/be/c9/91bec9fa27d8ff1ec426260ba475a185.jpg"
  }
]

export default function EstadiosScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={estadios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imagem }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.text}>Cidade: {item.cidade}</Text>
              <Text style={styles.text}>Capacidade: {item.capacidade}</Text>
            </View>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#1e1e1e'
  },
  card: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2
  },
  image: {
    width: 120,
    height: 120
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  text: {
    fontSize: 14,
    color: '#ccc'
  }
})
