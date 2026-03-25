import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function LoginScreen({ navigation, usuarios }) {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function logar() {
  axios.get('http://192.168.56.1:3000/usuarios')
    .then(response => {

      const usuarios = response.data;

      const usuarioEncontrado = usuarios.find(
        u => u.email === email && u.senha === senha
      );

      if (usuarioEncontrado) {
        alert("Login realizado!");
        navigation.navigate('ListaContatos');
      } else {
        alert("Usuário ou senha inválidos");
      }

    })
    .catch(error => {
      console.log(error);
      alert("Erro ao conectar com servidor");
    });
}

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        <Ionicons name="person-circle-outline" size={120} color="#4CAF50" />

        <Text style={styles.title}>Login</Text>

        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Senha"
          style={styles.input}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.button} onPress={logar}>
          <Text style={styles.buttonText}>Logar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('CadastroUsuario')}>
          <Text style={styles.link}>Cadastre-se</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('EsqueceuSenha')}>
          <Text style={styles.link}>Esqueceu a senha?</Text>
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
    fontSize: 28,
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