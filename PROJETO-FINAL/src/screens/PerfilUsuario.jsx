// src/screens/PerfilUsuario.jsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Text, TextInput, Button, Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PerfilUsuario() {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [senha, setSenha] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    const dados = await AsyncStorage.getItem('usuarios');
    if (dados) setUsuarios(JSON.parse(dados));
  };

  const salvar = async () => {
    if (!nome || !email || !telefone || !nascimento || !senha) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }

    let novaLista;
    if (editandoId !== null) {
      novaLista = usuarios.map(u =>
        u.id === editandoId
          ? { id: editandoId, nome, email, telefone, nascimento, senha }
          : u
      );
      setEditandoId(null);
    } else {
      const novoUsuario = {
        id: Date.now(),
        nome,
        email,
        telefone,
        nascimento,
        senha,
      };
      novaLista = [...usuarios, novoUsuario];
    }

    setUsuarios(novaLista);
    await AsyncStorage.setItem('usuarios', JSON.stringify(novaLista));
    limparCampos();
  };

  const limparCampos = () => {
    setNome('');
    setEmail('');
    setTelefone('');
    setNascimento('');
    setSenha('');
    setEditandoId(null);
  };

  const editar = (usuario) => {
    setNome(usuario.nome);
    setEmail(usuario.email);
    setTelefone(usuario.telefone);
    setNascimento(usuario.nascimento);
    setSenha(usuario.senha);
    setEditandoId(usuario.id);
  };

  const excluir = async (id) => {
    const novaLista = usuarios.filter(u => u.id !== id);
    setUsuarios(novaLista);
    await AsyncStorage.setItem('usuarios', JSON.stringify(novaLista));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Usuários</Text>

      <TextInput
        label="Nome"
        mode="outlined"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
        theme={inputTheme}
      />
      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
        theme={inputTheme}
      />
      <TextInput
        label="Telefone"
        mode="outlined"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
        style={styles.input}
        theme={inputTheme}
      />
      <TextInput
        label="Data de Nascimento"
        mode="outlined"
        value={nascimento}
        onChangeText={setNascimento}
        placeholder="DD/MM/AAAA"
        style={styles.input}
        theme={inputTheme}
      />
      <TextInput
        label="Senha"
        mode="outlined"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
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
        {editandoId ? 'Atualizar' : 'Cadastrar'}
      </Button>

      <FlatList
        data={usuarios}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title
              title={item.nome}
              titleStyle={{ color: '#000' }}
              subtitle={item.email}
              subtitleStyle={{ color: '#B00020' }}
            />
            <Card.Content>
              <Text style={styles.textoCard}>Telefone: {item.telefone}</Text>
              <Text style={styles.textoCard}>Nascimento: {item.nascimento}</Text>
              <Text style={styles.textoCard}>Senha: {item.senha}</Text>
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
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
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
