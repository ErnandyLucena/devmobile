// client/screens/WelcomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/doctors.png')} 
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Text>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.registerText}>Registre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 30,
  },
  description: {
    textAlign: 'center',
    color: '#555',
    fontSize: 14,
    marginBottom: 40,
  },
  loginButton: {
    backgroundColor: '#2D6CDF',
    width: '80%',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  registerButton: {
    backgroundColor: '#E5EEFF',
    width: '80%',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
  },
  registerText: {
    color: '#2D6CDF',
    fontSize: 16,
    fontWeight: '600',
  },
});
