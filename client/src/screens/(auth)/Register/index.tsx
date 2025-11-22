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
import { styles } from "./styles";
import { useAuth } from "../../../context/AuthContext";
import MessageModal from "../../../components/MessageContext/MessageContext";
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen({ navigation }: any) {

  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [tipo, setTipo] = useState<"funcionario" | "medico" | "">("");

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"error" | "success">("error");

  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!name || !email || !cpf || !password || !repeatPassword || !tipo) {
      setModalType("error");
      setModalMessage("Preencha todos os campos e selecione o tipo.");
      setModalVisible(true);
      return;
    }

    if (password !== repeatPassword) {
      setModalType("error");
      setModalMessage("As senhas não coincidem.");
      setModalVisible(true);
      return;
    }

    try {
      setLoading(true);

      await register({
        nome: name,
        email,
        senha: password,
        cpf,
        tipo: tipo
      });

      setModalType("success");
      setModalMessage("Usuário registrado com sucesso!");
      setModalVisible(true);

      setTimeout(() => {
        navigation.navigate("Login");
      }, 1500);

    } catch (error) {
      setModalType("error");
      setModalMessage("Erro ao registrar. Verifique os dados.");
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
        type={modalType}
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
              <Text style={styles.inputLabel}>Nome Completo</Text>
              <TextInput
                style={styles.input}
                placeholder="Seu nome"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
              />
            </View>

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

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Tipo de Cadastro</Text>

              <View style={{ flexDirection: "row", gap: 10 }}>
                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    tipo === "funcionario" && styles.typeButtonSelected
                  ]}
                  onPress={() => setTipo("funcionario")}
                >
                  <Text
                    style={[
                      styles.typeButtonText,
                      tipo === "funcionario" && styles.typeButtonTextSelected
                    ]}
                  >
                    Funcionário
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    tipo === "medico" && styles.typeButtonSelected
                  ]}
                  onPress={() => setTipo("medico")}
                >
                  <Text
                    style={[
                      styles.typeButtonText,
                      tipo === "medico" && styles.typeButtonTextSelected
                    ]}
                  >
                    Médico
                  </Text>
                </TouchableOpacity>
              </View>
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

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Repetir Senha</Text>

              <View style={styles.passwordWrapper}>
                <TextInput
                  style={[styles.input, { paddingRight: 45 }]}
                  placeholder="••••••••"
                  placeholderTextColor="#999"
                  secureTextEntry={!showRepeatPassword}
                  value={repeatPassword}
                  onChangeText={setRepeatPassword}
                />

                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowRepeatPassword(!showRepeatPassword)}
                >
                  <Ionicons
                    name={showRepeatPassword ? "eye-off" : "eye"}
                    size={22}
                    color="#555"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableHighlight
              style={[styles.registerButton, loading && { opacity: 0.7 }]}
              underlayColor="#1a4ae0"
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.registerButtonText}>Registrar</Text>
              )}
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
    </>
  );
}
