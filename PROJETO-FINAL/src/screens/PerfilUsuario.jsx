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
      // Editar
      novaLista = usuarios.map(u =>
        u.id === editandoId
          ? { id: editandoId, nome, email, telefone, nascimento, senha }
          : u
      );
      setEditandoId(null);
    } else {
      // Inserir novo
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

      <TextInput label="Nome" mode="outlined" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput label="Email" mode="outlined" value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.input} />
      <TextInput label="Telefone" mode="outlined" value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" style={styles.input} />
      <TextInput label="Data de Nascimento" mode="outlined" value={nascimento} onChangeText={setNascimento} placeholder="DD/MM/AAAA" style={styles.input} />
      <TextInput label="Senha" mode="outlined" value={senha} onChangeText={setSenha} secureTextEntry style={styles.input} />

      <Button mode="contained" onPress={salvar} style={styles.botao}>
        {editandoId ? 'Atualizar' : 'Cadastrar'}
      </Button>

      <FlatList
        data={usuarios}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title title={item.nome} subtitle={item.email} />
            <Card.Content>
              <Text>Telefone: {item.telefone}</Text>
              <Text>Nascimento: {item.nascimento}</Text>
              <Text>Senha: {item.senha}</Text>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => editar(item)}>Editar</Button>
              <Button onPress={() => excluir(item.id)}>Excluir</Button>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#E8F5E9',
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#388E3C',
  },
  input: {
    marginBottom: 10,
  },
  botao: {
    marginBottom: 20,
  },
  card: {
    marginBottom: 10,
  },
});
