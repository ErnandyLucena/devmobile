import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useAuth } from "../../context/AuthContext";
import { styles } from "./styles";

export default function LoginScreen({ navigation }: any) {
  const { login } = useAuth();
  const [email, setEmail] = useState("seuemail@gmail.com");
  const [password, setPassword] = useState("••••••••");

  function handleLogin() {
    login(email, password);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>

      <View style={styles.formContainer}>
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

        <View style={styles.checkboxContainer}>
          <Text style={styles.checkboxLabel}>Lembrar dados de acesso</Text>
          <View style={styles.checkbox} />
        </View>

        <Button title="Log In" onPress={handleLogin} />

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.link}>Registre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}