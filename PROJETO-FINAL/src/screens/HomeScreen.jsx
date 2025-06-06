// src/screens/Home/HomeScreen.jsx
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Card, Title, Paragraph, ActivityIndicator } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY = "d8ec948e86a55f7490e2005056eb19bf";
const BASE_URL = "https://api.themoviedb.org/3";

export default function HomeScreen() {
  const [filmes, setFilmes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    buscarFilmes();
  }, []);

  async function buscarFilmes(texto = '') {
    setCarregando(true);
    const url = texto
      ? `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${texto}`
      : `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt-BR`;

    try {
      const resposta = await axios.get(url);
      setFilmes(resposta.data.results);
    } catch (erro) {
      console.log('Erro ao buscar filmes:', erro);
    } finally {
      setCarregando(false);
    }
  }

  function aoBuscarTexto(texto) {
    setBusca(texto);
    buscarFilmes(texto);
  }

  async function adicionarFavorito(filme) {
    try {
      const favoritosAtuais = await AsyncStorage.getItem('favoritos'); // Note: chave 'favoritos'
      const lista = favoritosAtuais ? JSON.parse(favoritosAtuais) : [];
      const jaExiste = lista.some(f => f.id === filme.id);

      if (jaExiste) {
        Alert.alert('Aviso', 'Este filme já está nos seus favoritos.');
        return;
      }

      // Adiciona os campos de CRUD vazios ao favoritar
      const novoFilmeFavorito = {
        id: filme.id,
        title: filme.title,
        poster_path: filme.poster_path,
        vote_average: filme.vote_average,
        overview: filme.overview,
        nota: '', // Inicializado vazio
        comentario: '', // Inicializado vazio
        dataAssistido: '', // Inicializado vazio
        emocao: '', // Inicializado vazio
        companhia: '', // Inicializado vazio
      };

      lista.push(novoFilmeFavorito);
      await AsyncStorage.setItem('favoritos', JSON.stringify(lista));
      Alert.alert('Sucesso', 'Filme adicionado aos favoritos!');
    } catch (erro) {
      console.log('Erro ao adicionar favorito:', erro);
      Alert.alert('Erro', 'Não foi possível adicionar o filme aos favoritos.');
    }
  }

  function renderizarFilme({ item }) {
    return (
      <Card style={styles.card}>
        <Card.Cover source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} />
        <Card.Content>
          <Title>{item.title}</Title>
          <Paragraph>Nota: {item.vote_average}</Paragraph>
          <TouchableOpacity
            style={styles.botaoFavorito}
            onPress={() => adicionarFavorito(item)}
          >
            <Text style={styles.textoBotao}>❤️ Favoritar</Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Filmes</Text>
      <TextInput
        placeholder="Digite o nome do filme"
        value={busca}
        onChangeText={aoBuscarTexto}
        style={styles.input}
      />

      {carregando ? (
        <ActivityIndicator size="large" color="#2196F3" />
      ) : (
        <FlatList
          data={filmes}
          renderItem={renderizarFilme}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#E0F2F7',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2196F3',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  card: {
    flex: 1,
    margin: 5,
  },
  botaoFavorito: {
    backgroundColor: '#FF0000',
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
});