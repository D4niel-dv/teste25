// src/screens/FilmesFavoritosScreen.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, Alert, Image, TextInput, TouchableOpacity, ScrollView, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native'; // Mantido para recarregar a lista

export default function FilmesFavoritosScreen() {
  const [filmesFavoritos, setFilmesFavoritos] = useState([]);
  const [filmeEditando, setFilmeEditando] = useState(null); // Armazena o filme que está sendo editado
  const [mostrarFormularioEdicao, setMostrarFormularioEdicao] = useState(false); // Controla a visibilidade do formulário de edição

  // Campos do formulário de edição
  const [nota, setNota] = useState('');
  const [comentario, setComentario] = useState('');
  const [dataAssistido, setDataAssistido] = useState('');
  const [companhia, setCompanhia] = useState('');

  const isFocused = useIsFocused();

  useEffect(() => {
    carregarFilmesFavoritos();
  }, [isFocused]);

  const carregarFilmesFavoritos = async () => {
    try {
      const dados = await AsyncStorage.getItem('favoritos');
      if (dados) {
        setFilmesFavoritos(JSON.parse(dados));
      } else {
        setFilmesFavoritos([]);
      }
    } catch (error) {
      console.error('Erro ao carregar filmes favoritos:', error);
      Alert.alert('Erro', 'Não foi possível carregar seus filmes favoritos.');
    }
  };

  const salvarDetalhesFilme = async () => {
    if (!filmeEditando) return;

    // Validação simples
    if (!nota || !comentario || !dataAssistido || !companhia) {
        Alert.alert('Atenção', 'Por favor, preencha todos os campos da avaliação.');
        return;
    }

    try {
      const novaLista = filmesFavoritos.map(f =>
        f.id === filmeEditando.id
          ? {
              ...f,
              nota,
              comentario,
              dataAssistido,
              companhia,
            }
          : f
      );
      setFilmesFavoritos(novaLista);
      await AsyncStorage.setItem('favoritos', JSON.stringify(novaLista));
      Alert.alert('Sucesso', 'Detalhes do filme atualizados!');
      fecharFormularioEdicao(); // Fecha o formulário
    } catch (error) {
      console.error('Erro ao salvar detalhes do filme:', error);
      Alert.alert('Erro', 'Não foi possível salvar os detalhes do filme.');
    }
  };

  const abrirFormularioEdicao = (filme) => {
    setFilmeEditando(filme);
    setNota(filme.nota || '');
    setComentario(filme.comentario || '');
    setDataAssistido(filme.dataAssistido || '');
    setCompanhia(filme.companhia || '');
    setMostrarFormularioEdicao(true); // Abre o formulário
  };

  const fecharFormularioEdicao = () => {
    setFilmeEditando(null);
    setNota('');
    setComentario('');
    setDataAssistido('');
    setCompanhia('');
    setMostrarFormularioEdicao(false); // Fecha o formulário
  };

  const handleExcluir = (id) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja remover este filme dos seus favoritos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              const novasAvaliacoes = filmesFavoritos.filter((item) => item.id !== id);
              setFilmesFavoritos(novasAvaliacoes);
              await AsyncStorage.setItem('favoritos', JSON.stringify(novasAvaliacoes));
              Alert.alert('Sucesso', 'Filme removido dos favoritos!');
            } catch (error) {
              console.error('Erro ao excluir filme:', error);
              Alert.alert('Erro', 'Não foi possível remover o filme dos favoritos.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      {item.poster_path ? (
        <Card.Cover source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.imagem} />
      ) : null}
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>Nota TMDB: {item.vote_average}</Paragraph>
        <Paragraph>Minha Nota: {item.nota || 'Não avaliado'}</Paragraph>
        <Paragraph>Comentário: {item.comentario || 'Nenhum'}</Paragraph>
        <Paragraph>Data Assistido: {item.dataAssistido || 'Não informado'}</Paragraph>
        <Paragraph>Companhia: {item.companhia || 'Não informada'}</Paragraph>
      </Card.Content>
      <View style={styles.botoes}>
        <Button mode="contained" onPress={() => abrirFormularioEdicao(item)} style={styles.botaoEditar}>
          Editar Detalhes
        </Button>
        <Button mode="outlined" onPress={() => handleExcluir(item.id)} style={styles.botaoExcluir}>
          Remover
        </Button>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meus Filmes Favoritos</Text>

      {filmesFavoritos.length === 0 ? (
        <Text style={styles.mensagemVazia}>Você ainda não adicionou nenhum filme aos favoritos. Vá para a tela "Home" para começar!</Text>
      ) : (
        <FlatList
          data={filmesFavoritos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={{ marginTop: 20 }}
        />
      )}

      {/* Formulário de Edição (aparece condicionalmente) */}
      {mostrarFormularioEdicao && (
        <View style={styles.overlay}>
          <ScrollView contentContainerStyle={styles.formularioEdicaoContainer}>
            <Text style={styles.modalTitle}>Editar Detalhes do Filme</Text>
            {filmeEditando && (
              <>
                <Text style={styles.modalFilmeTitle}>Filme: {filmeEditando.title}</Text>
                <TextInput
                  label="Minha Nota (0-10)"
                  mode="outlined" // Isso é do react-native-paper, pode ser substituído por TextInput normal
                  value={nota}
                  onChangeText={setNota}
                  keyboardType="numeric"
                  style={styles.inputModal}
                  placeholder="Minha Nota (0-10)"
                />
                <TextInput
                  label="Comentário"
                  mode="outlined"
                  value={comentario}
                  onChangeText={setComentario}
                  multiline
                  style={styles.inputModal}
                  placeholder="Comentário"
                />
                <TextInput
                  label="Data Assistido (DD/MM/AAAA)"
                  mode="outlined"
                  value={dataAssistido}
                  onChangeText={setDataAssistido}
                  placeholder="DD/MM/AAAA"
                  style={styles.inputModal}
                />
                <TextInput
                  label="Companhia (Ex: Sozinho, Amigos, Família)"
                  mode="outlined"
                  value={companhia}
                  onChangeText={setCompanhia}
                  style={styles.inputModal}
                  placeholder="Companhia"
                />
                <Button mode="contained" onPress={salvarDetalhesFilme} style={styles.modalButton}>
                  Salvar
                </Button>
                <Button mode="outlined" onPress={fecharFormularioEdicao} style={styles.modalButton}>
                  Cancelar
                </Button>
              </>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // fundo branco
    padding: 12,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#D32F2F', // vermelho escuro
    textAlign: 'center',
    marginBottom: 15,
  },
  mensagemVazia: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 50,
    color: '#555', // cinza escuro
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#F5F5F5', // cinza claro
    marginBottom: 15,
    borderRadius: 10,
    elevation: 5,
  },
  imagem: {
    height: 220,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0', // borda suave
  },
  botaoEditar: {
    backgroundColor: '#D32F2F', // vermelho
    width: '48%',
  },
  botaoExcluir: {
    borderColor: '#000000', // preto
    borderWidth: 1,
    width: '48%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formularioEdicaoContainer: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    margin: 20,
    borderRadius: 12,
    elevation: 10,
    width: '90%',
    maxHeight: '90%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#D32F2F', // vermelho escuro
  },
  modalFilmeTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#000000', // preto
  },
  inputModal: {
    marginBottom: 15,
    backgroundColor: '#FAFAFA',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    color: '#000000', // texto preto
  },
  modalButton: {
    marginTop: 10,
  },
});