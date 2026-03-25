import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import axios from 'axios';

export default function CadastroContatoScreen({ navigation }) {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  function salvarContato() {

    if (!nome || !email || !telefone) {
      alert("Preencha todos os campos");
      return;
    }

    axios.post('http://192.168.56.1:3000/contatos', {
      nome,
      email,
      telefone,
      usuarioId: 1
    })
    .then(() => {
      alert("Contato cadastrado!");
      navigation.navigate('ListaContatos');
    })
    .catch(error => console.log(error));
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        <Text style={styles.title}>Cadastro de Contato</Text>

        <TextInput
          placeholder="Nome"
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Telefone"
          style={styles.input}
          keyboardType="phone-pad"
          value={telefone}
          onChangeText={setTelefone}
        />

        <TouchableOpacity style={styles.button} onPress={salvarContato}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ListaContatos')}>
          <Text style={styles.link}>Voltar</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#4CAF50',
    fontSize: 26,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#e0e0e0',
    width: '80%',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    width: '80%',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  link: {
    color: '#4CAF50',
    marginTop: 10,
  },
});