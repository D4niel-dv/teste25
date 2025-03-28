import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Filme from './componentes/Filme';
import Serie from './componentes/Serie';

export default function App() {

const listaFilmes = [
  {
  "nome": "A Doce Vida",
  "ano": 1960,
  "diretor": "Federico Fellini",
  "tipo": "Drama",
  "capa": "https://i.pinimg.com/736x/a7/9e/84/a79e840c1e1887ce91eea8b57c699778.jpg"
  },
  {
  "nome": "Psicose",
  "ano": 1960,
  "diretor": "Alfred Hitchcock",
  "tipo": "Terror",
  "capa": "https://i.pinimg.com/736x/6c/a5/75/6ca575790dba525cb5ac57e137ca6568.jpg"
  },
  {
  "nome": "O Beijo da Mulher Aranha",
  "ano": 1985,
  "diretor": "Hector Babenco",
  "tipo": "Drama",
  "capa": "https://upload.wikimedia.org/wikipedia/pt/thumb/8/8b/Kiss_Of_The_Spiderwoman.jpg/250px-Kiss_Of_The_Spiderwoman.jpg"
  },
  {
  "nome": "Poltergeist - O Fenômeno",
  "ano": 1982,
  "diretor": "Tobe Hooper",
  "tipo": "Terror",
  "capa": "https://upload.wikimedia.org/wikipedia/pt/thumb/1/14/Poltergeist_%281982%29_-_poster.png/200px-Poltergeist_%281982%29_-_poster.p"
  }
]

const listaSeries = [
  {
  "nome": "Buffy, a Caça-Vampiros",
  "ano": 1997,
  "diretor": "Joss Whedon",
  "temporadas": 7,
  "capa": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Buffy_the_vampire_slayer.svg/250px-Buffy_the_vampire_slayer.svg.png"
  },
  {
  "nome": "Desperate Housewives",
  "ano": 2004,
  "diretor": "Marc Cherry",
  "temporadas": 8,
  "capa": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Desperate_Housewives_Logo.svg/250px-Desperate_Housewives_Logo.svg.png"
  },
  {
  "nome": "Sons of Anarchy",
  "ano": 2008,
  "diretor": "Kurt Sutter",
  "temporadas": 7,
  "capa": "https://upload.wikimedia.org/wikipedia/pt/7/7b/SOATitlecard.jpg"
  }
  ];





return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar style="auto" />

        {
          listaFilmes.map(
            filme => {
              return (
                <Filme
                  nome={filme.nome}
                  ano={filme.ano}
                  diretor={filme.diretor}
                  tipo={filme.tipo}
                  capa={filme.capa}
                />
              )
            }
          )
        }

        {
          listaSeries.map(
            serie => {
              return (
                <Serie 
                  nome={serie.nome}
                  ano={serie.ano}
                  diretor={serie.diretor}
                  tipo={serie.tipo}
                  capa={serie.capa}
                />
              )
            }
          )
        }



      </View>
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
