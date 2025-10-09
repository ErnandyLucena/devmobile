import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen({ navigation }: any) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nova Conta</Text>

      {/* Nome */}
      <Text style={styles.label}>Nome Completo</Text>
      <TextInput
        style={styles.input}
        placeholder="seu nome"
        placeholderTextColor="#A0A0A0"
        value={nome}
        onChangeText={setNome}
      />

      {/* Email */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="seuemail@gmail.com"
        placeholderTextColor="#A0A0A0"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Senha */}
      <Text style={styles.label}>Senha</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="************"
          placeholderTextColor="#A0A0A0"
          secureTextEntry={!mostrarSenha}
          value={senha}
          onChangeText={setSenha}
        />
        <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
          <Ionicons
            name={mostrarSenha ? 'eye-off-outline' : 'eye-outline'}
            size={22}
            color="#808080"
          />
        </TouchableOpacity>
      </View>

      {/* Confirmar Senha */}
      <Text style={styles.label}>Repita a senha</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="************"
          placeholderTextColor="#A0A0A0"
          secureTextEntry={!mostrarConfirmar}
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />
        <TouchableOpacity onPress={() => setMostrarConfirmar(!mostrarConfirmar)}>
          <Ionicons
            name={mostrarConfirmar ? 'eye-off-outline' : 'eye-outline'}
            size={22}
            color="#808080"
          />
        </TouchableOpacity>
      </View>

      {/* Termos */}
      <Text style={styles.terms}>
        Para continuar, concorde com os{' '}
        <Text style={styles.link}>Termos de uso</Text> e{' '}
        <Text style={styles.link}>Privacidade</Text>
      </Text>

      {/* Botão Registrar */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      {/* Login Social */}
      <Text style={styles.or}>Ou entre com</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-google" size={24} color="#4169E1" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="finger-print-outline" size={24} color="#4169E1" />
        </TouchableOpacity>
      </View>

      {/* Login link */}
      <Text style={styles.footerText}>
        Já tem uma conta?{' '}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('Login')}
        >
          Login
        </Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E63EE',
    marginBottom: 30,
    marginTop: 20,
  },
  label: {
    alignSelf: 'flex-start',
    fontWeight: '600',
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
  },
  input: {
    width: '100%',
    backgroundColor: '#F2F5FF',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 15,
    color: '#000',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F5FF',
    width: '100%',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  inputPassword: {
    flex: 1,
    paddingVertical: 12,
    color: '#000',
  },
  terms: {
    textAlign: 'center',
    fontSize: 12,
    color: '#555',
    marginVertical: 10,
  },
  link: {
    color: '#1E63EE',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#1E63EE',
    width: '100%',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  or: {
    marginTop: 20,
    fontSize: 13,
    color: '#555',
  },
  socialContainer: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 15,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    marginTop: 25,
    fontSize: 13,
    color: '#555',
  },
});
