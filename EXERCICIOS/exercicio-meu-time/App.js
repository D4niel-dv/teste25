// Imports
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, ScrollView } from 'react-native';

// Função que representa o componente
export default function App() {
  // Lógica do componente
  const nome = "LIONEL MESSI"

  function alerta() {
    alert("GOL DO MELHOR DO MUNDO,LIONEL MESSI")
  }

  // retorno dessa função com o template do que vai ser
  // renderizado na tela (JSX)
  return (
    // ScrollView permite que o conteudo vá até depois da barra de rolagem
    // não pode ser usado sozinho, tem que ter uma View dentro
    // // ele só envolve o conteudo
    <ScrollView>
      <View style={styles.container}>
       
        <Text style={{ fontSize: 50, fontStyle: 'monospace' }} >LIONEL MESSI</Text>
        <Text style={{ fontSize: 30, fontStyle: 'monospace' }} >Nasceu em 24 de junho de 1987 em Rosário, Argentina</Text>
        <Text style={{ fontSize: 30, fontStyle: 'monospace' }} >Tem 1,70 m de altura</Text>
        <Text style={{ fontSize: 30, fontStyle: 'monospace' }} >É esquerdino</Text>
       

        {/* css com StyleSheet */}
        <Text style={{ fontSize: styles.textGrande.fontSize, color: 'red' }}>BARCELONA</Text>

        <Text>{nome}</Text>
        <Button title='GOL' onPress={alerta}></Button>
        {/* Imagem de fora com link */}
        <Image
          source={{
            uri: 'httpshttps://www.google.com/imgres?q=messi%20no%20barcelona&imgurl=https%3A%2F%2Fassets.goal.com%2Fimages%2Fv3%2Fblt7ddb8b8deacf5994%2FGOAL%2520-%2520Blank%2520WEB%2520-%2520Facebook%2520-%25202024-06-18T180750.849.jpg%3Fauto%3Dwebp%26format%3Dpjpg%26width%3D3840%26quality%3D60&imgrefurl=https%3A%2F%2Fwww.goal.com%2Fbr%2Flistas%2Fmeu-lugar-lionel-messi-teria-avisado-familiares-pretende-voltar-barcelona-fim-contrato-inter-miami%2Fblte596d9e07387d79d&docid=KhK65V4ntKB7cM&tbnid=p38qIlbBUNSKSM&vet=12ahUKEwjJm5Cs65SMAxU6rJUCHewGNKQQM3oECGAQAA..i&w=1920&h=1080&hcb=2&ved=2ahUKEwjJm5Cs65SMAxU6rJUCHewGNKQQM3oECGAQAA://i.pinimg.com/https://assets.goal.com/images/v3/blt7ddb8b8deacf5994/GOAL%20-%20Blank%20WEB%20-%20Facebook%20-%202024-06-18T180750.849.jpg?auto=webp&format=pjpg&width=3840&quality=60/47/e7/fd/47e7fd39f8e5a44877234f1d3c7bf1dc.jpg'
          }}
          style={{
            height: 300,
            width: 300
          }}
        />
        {/* Imagem de dentro do projeto */}
        <Image
          source={require('./imagens/messi.png')}
          style={{
            height: 300,
            width: 300
          }}
        />
        
        <Image
          source={require('./imagens/comemorando.png')}
          style={{
            height: 300,
            width: 300
          }}
        />
        <Image
          source={require('./imagens/camisa10.png')}
          style={{
            height: 300,
            width: 300
          }}
        />
        <Image
          source={require('./imagens/messimaos.png')}
          style={{
            height: 300,
            width: 300
          }}
        />
       
        <Image
          source={require('./imagens/messironaldinho.png')}
          style={{
            height: 300,
            width: 300
          }}
        />
       
        
       
        
      </View>
    </ScrollView>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textGrande: {
    fontSize: 40,
    fontWeight: 900
  }
});