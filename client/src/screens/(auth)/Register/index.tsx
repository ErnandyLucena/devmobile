import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput,
  TouchableHighlight,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import { styles } from "./styles"; 

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState("seu nome");
  const [email, setEmail] = useState("seuemail@gmail.com");
  const [cpf, setCpf] = useState("12312312312");
  const [password, setPassword] = useState("••••••••");
  const [repeatPassword, setRepeatPassword] = useState("••••••••");

  function handleRegister() {
    console.log("Registrar:", name, email);
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        <View style={styles.formContainer}>
          {/* Input Nome Completo */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nome Completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Seu nome"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          {/* Input Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="seuemail@gmail.com"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Input CPF */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>CPF</Text>
            <TextInput
              style={styles.input}
              placeholder="123.456.789-00"
              placeholderTextColor="#999"
              value={cpf}
              onChangeText={setCpf}
              keyboardType="numeric"
            />
          </View>

          {/* Input Senha */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          {/* Input Repetir Senha */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Repetir Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#999"
              value={repeatPassword}
              onChangeText={setRepeatPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          {/* Botão Registrar Personalizado */}
          <TouchableHighlight 
            style={styles.registerButton}
            underlayColor="#1a4ae0"
            onPress={handleRegister}
          >
            <Text style={styles.registerButtonText}>Registrar</Text>
          </TouchableHighlight>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Já tem uma conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}