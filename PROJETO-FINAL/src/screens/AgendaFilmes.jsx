import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AgendaForm({ navigation, route }) {
  const filme = route.params?.filme || {};
  const [dataPlanejada, setDataPlanejada] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [status, setStatus] = useState('');
  const [comentario, setComentario] = useState('');

  async function salvarAgenda() {
    if (!dataPlanejada || !prioridade || !status) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios!');
      return;
    }

    const novaAgenda = {
      id: filme.id,
      title: filme.title,
      poster_path: filme.poster_path,
      dataPlanejada,
      prioridade,
      status,
      comentario,
    };

    try {
      const armazenado = await AsyncStorage.getItem('agenda');
      const lista = armazenado ? JSON.parse(armazenado) : [];

      const jaExiste = lista.find(item => item.id === novaAgenda.id);
      if (jaExiste) {
        Alert.alert('Aviso', 'Este filme já está agendado.');
        return;
      }

      lista.push(novaAgenda);
      await AsyncStorage.setItem('agenda', JSON.stringify(lista));
      Alert.alert('Sucesso', 'Filme agendado com sucesso!');
      navigation.goBack();
    } catch (erro) {
      console.log(erro);
      Alert.alert('Erro', 'Não foi possível salvar a agenda.');
    }
  }

  return (
    <View style={styles.container}>
      <Text variant='titleLarge'>Agendar Filme:</Text>
      <Text variant='titleMedium'>{filme.title || 'Filme não encontrado'}</Text>

      <TextInput
        label="Data Planejada (DD/MM/AAAA)"
        mode="outlined"
        value={dataPlanejada}
        onChangeText={setDataPlanejada}
        style={styles.input}
      />
      <TextInput
        label="Prioridade (Alta, Média, Baixa)"
        mode="outlined"
        value={prioridade}
        onChangeText={setPrioridade}
        style={styles.input}
      />
      <TextInput
        label="Status (Não iniciado, Em andamento, Assistido)"
        mode="outlined"
        value={status}
        onChangeText={setStatus}
        style={styles.input}
      />
      <TextInput
        label="Comentário (opcional)"
        mode="outlined"
        value={comentario}
        onChangeText={setComentario}
        style={styles.input}
        multiline
      />

      <Button mode="contained" onPress={salvarAgenda} style={styles.input}>
        Salvar Agenda
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  input: {
    marginBottom: 10,
  },
});
