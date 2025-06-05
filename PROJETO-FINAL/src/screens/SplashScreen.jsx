import React from 'react';
import { ImageBackground, StyleSheet, TouchableWithoutFeedback } from 'react-native';

export default function SplashScreen({ navigation }) {
  const handlePress = () => {
    navigation.replace('Principal');
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <ImageBackground
        source={{ uri: 'https://i.pinimg.com/736x/ed/79/ef/ed79ef797eb4219b1653cc3eff17861f.jpg' }}
        style={styles.background}
        resizeMode="contain" // ou "cover" se quiser que preencha tudo mesmo cortando
      />
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // caso use "contain", fica um fundo bonito
  },
});
