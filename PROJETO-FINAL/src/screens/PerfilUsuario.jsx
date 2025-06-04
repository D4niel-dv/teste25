// PerfilUsuario.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PerfilUsuario() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>
      {/* Adicione o conteúdo da sua tela de perfil aqui */}
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
