// MinhasAvaliacoes.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MinhasAvaliacoes() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Avaliações</Text>
      {/* Adicione o conteúdo da sua tela de avaliações aqui */}
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
