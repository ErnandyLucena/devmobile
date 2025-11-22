import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { useAuth } from "../../../context/auth/AuthContext";
import { styles } from "./styles";
import { Ionicons } from '@expo/vector-icons';
import MessageModal from "../../../components/MessageContext/MessageContext"; 

export default function LoginScreen({ navigation }: any) {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false); // 🔵 CARREGANDO

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  async function handleLogin() {
    setLoading(true);
    try {
      await login(email, password);
    } catch (e) {
      setModalMessage("Senha ou email inválidos");
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <MessageModal
        visible={modalVisible}
        message={modalMessage}
        type="error"
        onClose={() => setModalVisible(false)}
      />

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

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="seuemail@gmail.com"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Senha</Text>

              <View style={styles.passwordWrapper}>
                <TextInput
                  style={[styles.input, { paddingRight: 45 }]}
                  placeholder="••••••••"
                  placeholderTextColor="#999"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  autoCapitalize="none"
                />

                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={22}
                    color="#555"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableHighlight
              style={[styles.loginButton, loading && { opacity: 0.7 }]}
              underlayColor="#1a4ae0"
              onPress={handleLogin}
              disabled={loading}
            >
              <View style={{ flexDirection: "row", gap: 10, alignItems: "center", justifyContent: "center" }}>
                {loading && (
                  <ActivityIndicator size="small" color="#fff" />
                )}
                <Text style={styles.loginButtonText}>
                  {loading ? "Entrando..." : "Entrar"}
                </Text>
              </View>
            </TouchableHighlight>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Não tem uma conta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.registerLink}>Registre-se</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
