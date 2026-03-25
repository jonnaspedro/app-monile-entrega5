import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  TouchableOpacity,
  Text
} from 'react-native';

import LoginScreen from './screens/LoginScreen';
import ListaContatosScreen from './screens/ListaContatosScreen';
import CadastroUsuarioScreen from './screens/CadastroUsuarioScreen';
import CadastroContatoScreen from './screens/CadastroContatoScreen';
import EditarContatoScreen from './screens/EditarContatoScreen';
import EsqueceuSenhaScreen from './screens/EsqueceuSenhaScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  const [usuarios, setUsuarios] = useState([]);
  const [contatos, setContatos] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">

        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />

        <Stack.Screen 
          name="CadastroUsuario"
          component={CadastroUsuarioScreen}
          options={{
            title: 'Cadastro',
            headerTitleAlign: 'center'
          }}
        />

        <Stack.Screen
          name="ListaContatos"
          component={ListaContatosScreen}
          options={({ navigation }) => ({
            title: 'Contatos',
            headerTitleAlign: 'center',
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('CadastroContato')}>
                <Text style={{ fontSize: 30, marginRight: 15 }}>+</Text>
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen 
          name="CadastroContato" 
          component={CadastroContatoScreen} 
        />

        <Stack.Screen 
          name="EditarContato" 
          component={EditarContatoScreen} 
        />

        <Stack.Screen 
          name="EsqueceuSenha" 
          component={EsqueceuSenhaScreen} 
        />

      </Stack.Navigator>

      <StatusBar style="auto" />
    </NavigationContainer>
  );
}