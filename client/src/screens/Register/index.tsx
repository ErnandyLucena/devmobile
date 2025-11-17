import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { styles } from "./styles"; 

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState("seu nome");
  const [email, setEmail] = useState("seuemail@gmail.com");
  const [password, setPassword] = useState("••••••••");
  const [repeatPassword, setRepeatPassword] = useState("••••••••");

  function handleRegister() {
    console.log("Registrar:", name, email);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Conta</Text>

      <View style={styles.formContainer}>
        <Input 
          label="Nome Completo" 
          placeholder="Seu nome" 
          value={name} 
          onChangeText={setName} 
        />

        <Input 
          label="Email" 
          placeholder="seuemail@gmail.com" 
          value={email} 
          onChangeText={setEmail} 
        />

        <Input 
          label="Senha" 
          placeholder="••••••••" 
          value={password} 
          secureTextEntry 
          onChangeText={setPassword} 
        />

        <Input 
          label="Repita a senha" 
          placeholder="••••••••" 
          value={repeatPassword} 
          secureTextEntry 
          onChangeText={setRepeatPassword} 
        />

        <View style={styles.checkboxContainer}>
          <Text style={styles.checkboxLabel}>Solicitante</Text>
          <View style={styles.checkbox} />
        </View>

        <Button title="Registrar" onPress={handleRegister} />

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}