import React from 'react'
import { View, Text, FlatList, Image, StyleSheet } from 'react-native'

const jogadores = [
  {
    nome: "LUCAS MOURA",
    numero: 7,
    imagem: "https://i.pinimg.com/736x/74/15/da/7415dae214542926621e5501adf52eee.jpg"
  },
  {
    nome: "CALLERI",
    numero: 9,
    imagem: "https://i.pinimg.com/736x/6e/c0/55/6ec0554d81bd8cc1b928a03bd3e6daaf.jpg"
  },
  {
    nome: "ARBOLEDA",
    numero: 5,
    imagem: "https://i.pinimg.com/736x/6c/45/c9/6c45c940fded9270285a1e7375b454ef.jpg"
  },
  {
    nome: "FERREIRINHA",
    numero: 11,
    imagem: "https://i.pinimg.com/736x/b9/95/e1/b995e14bea1e72a5d451d1bd6c564263.jpg"
  },
  {
    nome: "rato",
    numero: 11,
    imagem: "https://i.pinimg.com/236x/b1/aa/08/b1aa087dedb695a7892c42f50f191cb1.jpg"
  },
]

export default function JogadoresScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={jogadores}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imagem }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.numero}>Camisa: {item.numero}</Text>
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
    backgroundColor: 'black'
  },
  card: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: 'red',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2
  },
  image: {
    width: 100,
    height: 100
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  numero: {
    fontSize: 16,
    color: 'white'
  }
})