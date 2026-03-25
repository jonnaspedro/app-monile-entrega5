import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import axios from 'axios';

export default function EditarContatoScreen({ route, navigation }) {

  const { contato } = route.params;

  const [nome, setNome] = useState(contato.nome);
  const [email, setEmail] = useState(contato.email);
  const [telefone, setTelefone] = useState(contato.telefone);

  function atualizarContato() {

    if (!nome || !email || !telefone) {
      alert("Preencha todos os campos");
      return;
    }

    axios.put(`http://192.168.56.1:3000/contatos/${contato.id}`, {
      ...contato,
      nome,
      email,
      telefone
    })
    .then(() => {
      alert("Contato atualizado!");
      navigation.navigate('ListaContatos');
    })
    .catch(error => console.log(error));
  }

  function excluirContato() {
    axios.delete(`http://192.168.56.1:3000/contatos/${contato.id}`)
      .then(() => {
        alert("Contato excluído!");
        navigation.navigate('ListaContatos');
      })
      .catch(error => console.log(error));
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        <Text style={styles.title}>Editar Contato</Text>

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

        <TouchableOpacity style={styles.button} onPress={atualizarContato}>
          <Text style={styles.buttonText}>Salvar Alterações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.delete]} onPress={excluirContato}>
          <Text style={styles.buttonText}>Excluir Contato</Text>
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
  delete: {
    backgroundColor: '#f44336',
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