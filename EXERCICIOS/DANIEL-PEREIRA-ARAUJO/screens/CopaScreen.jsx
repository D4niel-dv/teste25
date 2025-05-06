import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

const copa = {
  nome: "Copa do Mundo FIFA 2022",
  imagem: 'https://i.pinimg.com/236x/00/63/15/00631561f4895a630508c2b0d0bdb4d1.jpg',
  local: "Qatar",
  organizacao: "FIFA",
  mascote: "La'eeb",
  edicao: 22,
  ano: 2022,
  campeao: "Argentina",
  viceCampeao: "França",
};

export default function CopaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.nome}>{copa.nome}</Text>
      <Image source={{ uri: copa.imagem }} style={styles.escudo} />
      <Text style={styles.texto}>Local: {copa.local}</Text>
      <Text style={styles.texto}>Organização: {copa.organizacao}</Text>
      <Text style={styles.texto}>Mascote: {copa.mascote}</Text>
      <Text style={styles.texto}>Edição: {copa.edicao}</Text>
      <Text style={styles.texto}>Ano: {copa.ano}</Text>
      <Text style={styles.texto}>Campeão: {copa.campeao}</Text>
      <Text style={styles.texto}>Vice: {copa.viceCampeao}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: 20
  },
  nome: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white'
  },
  escudo: {
    width: 200,
    height: 200,
    marginBottom: 20
  },
  texto: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5
  }
})
