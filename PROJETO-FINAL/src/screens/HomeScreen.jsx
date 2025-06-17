// src/screens/Home/HomeScreen.jsx
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Card, Title, Paragraph, ActivityIndicator } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY = "d8ec948e86a55f7490e2005056eb19bf"; // Keep your API key
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
      const favoritosAtuais = await AsyncStorage.getItem('favoritos');
      const lista = favoritosAtuais ? JSON.parse(favoritosAtuais) : [];
      const jaExiste = lista.some(f => f.id === filme.id);

      if (jaExiste) {
        Alert.alert('Aviso', 'Este filme já está nos seus favoritos.');
        return;
      }

      const novoFilmeFavorito = {
        id: filme.id,
        title: filme.title,
        poster_path: filme.poster_path,
        vote_average: filme.vote_average,
        overview: filme.overview,
        nota: '',
        comentario: '',
        dataAssistido: '',
        emocao: '',
        companhia: '',
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
          <Title style={styles.cardTitle}>{item.title}</Title>
          <Paragraph style={styles.cardParagraph}>Nota: {item.vote_average}</Paragraph>
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
        placeholderTextColor="#666" // Dark grey placeholder
        value={busca}
        onChangeText={aoBuscarTexto}
        style={styles.input}
      />

      {carregando ? (
        <ActivityIndicator size="large" color="#FF0000" />
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
    backgroundColor: '#FFFFFF', // White background
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000000', // Black title
    textAlign: 'center',
    fontFamily: 'Roboto', // Modern font, remember to link it
  },
  input: {
    backgroundColor: '#F0F0F0', // Light grey input background
    color: '#000000', // Black text in input
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    fontFamily: 'Roboto',
    borderWidth: 1, // Add a subtle border
    borderColor: '#CCCCCC', // Light grey border
  },
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: '#FFFFFF', // White background for cards
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1, // Add a border to cards
    borderColor: '#E0E0E0', // Light grey border for cards
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000', // Black title on card
    marginTop: 8,
    fontFamily: 'Roboto',
  },
  cardParagraph: {
    fontSize: 14,
    color: '#333333', // Dark grey for paragraph text
    marginTop: 4,
    fontFamily: 'Roboto',
  },
  botaoFavorito: {
    backgroundColor: '#FF0000', // Red for the favorite button
    padding: 10,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#FFFFFF', 
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Roboto',
  },  
});