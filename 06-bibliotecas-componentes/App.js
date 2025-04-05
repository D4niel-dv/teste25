import { StatusBar } from 'expo-status-bar';
import { StyleSheet,  View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Text } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
    <View style={styles.container}>
      
    <Text variant="headlineMedium">Texto de Exemplo</Text>;

  <Card>
    <Card.Content>
  <Title>Título</Title>
  <Paragraph>Descrição do card.</Paragraph>
    </Card.Content>
  </Card>;
      <StatusBar style="auto" />
      
    </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
