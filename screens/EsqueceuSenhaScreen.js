import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import axios from 'axios';

export default function EsqueceuSenhaScreen({ navigation }) {

  const [email, setEmail] = useState('');

  function recuperarSenha() {
    axios.get(`http://192.168.56.1:3000/usuarios?email=${email}`)
      .then(response => {
        if (response.data.length > 0) {
          alert("Email encontrado! (simulação)");
        } else {
          alert("Email não cadastrado");
        }
      })
      .catch(error => console.log(error));
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        <Text style={styles.title}>Esqueceu a senha</Text>

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity style={styles.button} onPress={recuperarSenha}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Voltar para Login</Text>
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
    backgroundColor: '#868686',
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
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  link: {
    color: '#4CAF50',
    marginTop: 15,
  },
});