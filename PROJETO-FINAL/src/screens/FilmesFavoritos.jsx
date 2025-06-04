// FilmesFavoritos.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FilmesFavoritos() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Filmes Favoritos</Text>
      {/* Adicione o conteúdo da sua tela de filmes favoritos aqui */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});