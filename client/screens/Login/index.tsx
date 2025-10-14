import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // para ícones (olho, etc.)
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#2D6CDF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Log In</Text>
      </View>

      {/* Campos de entrada */}
      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="seuemail@gmail.com"
          placeholderTextColor="#A0A0A0"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={[styles.label, { marginTop: 20 }]}>Senha</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="***********"
            placeholderTextColor="#A0A0A0"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? 'eye' : 'eye-off'}
              size={20}
              color="#555"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.forgotButton}>
          <Text style={styles.forgotText}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>

      {/* Botão principal */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>Log In</Text>
      </TouchableOpacity>

      {/* Login social */}
      <Text style={styles.orText}>Ou entre com</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require('../../assets/images/google.png')}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="finger-print" size={28} color="#2D6CDF" />
        </TouchableOpacity>
      </View>

      {/* Registro */}
      <Text style={styles.registerText}>
        Não tem uma conta?{' '}
        <Text
          style={styles.registerLink}
           onPress={() => navigation.navigate('Register')}
        >
          Registre-se
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#2D6CDF',
    fontSize: 18,
    fontWeight: '700',
    marginRight: 24, // compensa o espaço do ícone de voltar
  },
  form: {
    marginBottom: 20,
  },
  label: {
    color: '#000',
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F3F6FF',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: '#000',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: 6,
  },
  forgotText: {
    color: '#2D6CDF',
    fontSize: 13,
  },
  loginButton: {
    backgroundColor: '#2D6CDF',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 20,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  orText: {
    textAlign: 'center',
    color: '#888',
    marginBottom: 15,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  socialButton: {
    backgroundColor: '#E5EEFF',
    padding: 12,
    borderRadius: 50,
    marginHorizontal: 8,
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  registerText: {
    textAlign: 'center',
    color: '#555',
  },
  registerLink: {
    color: '#2D6CDF',
    fontWeight: '600',
  },
});
