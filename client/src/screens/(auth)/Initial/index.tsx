import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { styles } from "./styles";
import image from "../../../../assets/doctors.png";

export default function InitialScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Image
        source={image}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.subtitle}>
        Agende consultas, acompanhe históricos e faça atendimento
        personalizado pelo nosso sistema.
      </Text>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.loginText}>Login</Text>
        <Ionicons name="log-in-outline" size={20} color="#fff" style={{ marginRight: 10 }} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.registerText}>Registre-se</Text>
        <Ionicons name="person-add-outline" size={20} color="#2260FF" style={{ marginRight: 10 }} />
      </TouchableOpacity>
    </View>
  );
}
