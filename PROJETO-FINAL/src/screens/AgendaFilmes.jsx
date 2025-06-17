// src/screens/AgendaFilmesScreen.jsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, FlatList } from 'react-native';
import { TextInput, Button, Text, Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AgendaFilmesScreen({ route }) {
  const filme = route?.params?.filme || {};
  const [agenda, setAgenda] = useState([]);

  const [dataPlanejada, setDataPlanejada] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [status, setStatus] = useState('');
  const [comentario, setComentario] = useState('');
  const [nota, setNota] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    carregarAgenda();
  }, []);

  const carregarAgenda = async () => {
    const armazenado = await AsyncStorage.getItem('agenda');
    if (armazenado) setAgenda(JSON.parse(armazenado));
  };

  const limparCampos = () => {
    setDataPlanejada('');
    setPrioridade('');
    setStatus('');
    setComentario('');
    setNota('');
    setEditandoId(null);
  };

  const salvar = async () => {
    if (!dataPlanejada || !prioridade || !status || !comentario || !nota) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    let novaLista;
    if (editandoId !== null) {
      novaLista = agenda.map((item) =>
        item.id === editandoId
          ? { ...item, dataPlanejada, prioridade, status, comentario, nota }
          : item
      );
    } else {
      const novoItem = {
        id: Date.now(),
        title: filme.title || 'Filme não especificado',
        poster_path: filme.poster_path || '',
        dataPlanejada,
        prioridade,
        status,
        comentario,
        nota,
      };
      novaLista = [...agenda, novoItem];
    }

    setAgenda(novaLista);
    await AsyncStorage.setItem('agenda', JSON.stringify(novaLista));
    limparCampos();
  };

  const editar = (item) => {
    setDataPlanejada(item.dataPlanejada);
    setPrioridade(item.prioridade);
    setStatus(item.status);
    setComentario(item.comentario);
    setNota(item.nota);
    setEditandoId(item.id);
  };

  const excluir = async (id) => {
    const novaLista = agenda.filter((item) => item.id !== id);
    setAgenda(novaLista);
    await AsyncStorage.setItem('agenda', JSON.stringify(novaLista));
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.titulo}>
        {editandoId ? 'Editar Agenda' : 'Agendar Filme'}
      </Text>
      <Text variant="titleMedium" style={styles.subtitulo}>
        {filme.title || ''}
      </Text>

      <TextInput
        label="Data Planejada"
        mode="outlined"
        value={dataPlanejada}
        onChangeText={setDataPlanejada}
        style={styles.input}
        theme={inputTheme}
      />
      <TextInput
        label="Prioridade"
        mode="outlined"
        value={prioridade}
        onChangeText={setPrioridade}
        style={styles.input}
        theme={inputTheme}
      />
      <TextInput
        label="Status"
        mode="outlined"
        value={status}
        onChangeText={setStatus}
        style={styles.input}
        theme={inputTheme}
      />
      <TextInput
        label="Comentário"
        mode="outlined"
        value={comentario}
        onChangeText={setComentario}
        multiline
        style={styles.input}
        theme={inputTheme}
      />
      <TextInput
        label="Nota"
        mode="outlined"
        value={nota}
        onChangeText={setNota}
        keyboardType="numeric"
        style={styles.input}
        theme={inputTheme}
      />

      <Button
        mode="contained"
        onPress={salvar}
        style={styles.botao}
        buttonColor="#B00020"
        textColor="#fff"
      >
        {editandoId ? 'Atualizar' : 'Salvar Agenda'}
      </Button>

      <FlatList
        data={agenda}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title
              title={item.title}
              titleStyle={{ color: '#000' }}
              subtitle={`Prioridade: ${item.prioridade}`}
              subtitleStyle={{ color: '#B00020' }}
            />
            <Card.Content>
              <Text style={styles.textoCard}>Data: {item.dataPlanejada}</Text>
              <Text style={styles.textoCard}>Status: {item.status}</Text>
              <Text style={styles.textoCard}>Comentário: {item.comentario}</Text>
              <Text style={styles.textoCard}>Nota: {item.nota}</Text>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => editar(item)} textColor="#B00020">Editar</Button>
              <Button onPress={() => excluir(item.id)} textColor="#B00020">Excluir</Button>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
}

const inputTheme = {
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#B00020',
    placeholder: '#888',
  },
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  titulo: {
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    fontSize: 20,
  },
  subtitulo: {
    color: '#B00020',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 10,
  },
  botao: {
    marginBottom: 20,
  },
  card: {
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
  },
  textoCard: {
    color: '#000',
  },
});
