import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text } from 'react-native-paper';

// Dados das estatísticas
const estatisticas = {
  totalPublico: 3404252,
  totalJogos: 64,
  totalGols: 172,
  totalCartoes: 301,
  totalCartoesAmarelos: 288,
  totalCartoesVermelhos: 13,
  totalEstadios: 8,
  totalSelecoes: 32,
  totalJogadores: 831
};

// Funções de cálculo
const calcularMediaGolsPorJogo = () => (estatisticas.totalGols / estatisticas.totalJogos).toFixed(2);
const calcularMediaPublicoPorJogo = () => (estatisticas.totalPublico / estatisticas.totalJogos).toFixed(0);
const calcularMediaCartoesPorJogo = () => (estatisticas.totalCartoes / estatisticas.totalJogos).toFixed(2);

export default function EstatisticasScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Estatísticas - Copa do Mundo 2022</Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">Total de Gols: {estatisticas.totalGols}</Text>
          <Text variant="titleMedium">Total de Jogos: {estatisticas.totalJogos}</Text>
          <Text variant="titleMedium">Total de Público: {estatisticas.totalPublico.toLocaleString()}</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">Média de Gols por Jogo: {calcularMediaGolsPorJogo()}</Text>
          <Text variant="titleMedium">Média de Público por Jogo: {calcularMediaPublicoPorJogo()}</Text>
          <Text variant="titleMedium">Média de Cartões por Jogo: {calcularMediaCartoesPorJogo()}</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">Total de Cartões: {estatisticas.totalCartoes}</Text>
          <Text variant="titleMedium">Cartões Amarelos: {estatisticas.totalCartoesAmarelos}</Text>
          <Text variant="titleMedium">Cartões Vermelhos: {estatisticas.totalCartoesVermelhos}</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">Estádios Utilizados: {estatisticas.totalEstadios}</Text>
          <Text variant="titleMedium">Seleções Participantes: {estatisticas.totalSelecoes}</Text>
          <Text variant="titleMedium">Jogadores Participantes: {estatisticas.totalJogadores}</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 12
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#ffffff'
  }
});
