import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

export default function ListaContatosScreen({ navigation }) {

  const [contatos, setContatos] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.56.1:3000/contatos')
      .then(response => {
        setContatos(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Contatos</Text>

      {contatos.length === 0 ? (
        <Text>Nenhum contato cadastrado</Text>
      ) : (
        <FlatList
          data={contatos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate('EditarContato', { contato: item })}
            >
              <Text>Nome: {item.nome}</Text>
              <Text>Email: {item.email}</Text>
              <Text>Telefone: {item.telefone}</Text>
            </TouchableOpacity>
          )}
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20 },
  title: { fontSize:24, marginBottom:20 },
  item: { padding:10, borderBottomWidth:1 },
  button: { backgroundColor:'green', padding:12, marginTop:20 },
  buttonText: { color:'#fff', textAlign:'center' }
});