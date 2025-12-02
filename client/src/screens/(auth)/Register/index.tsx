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
import { useAuth } from "../../../context/auth/AuthContext";
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

  const formatCPF = (text: string) => {
    const numbers = text.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    return text;
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidCPF = (cpf: string) => {
    const cleanedCPF = cpf.replace(/\D/g, '');
    return cleanedCPF.length === 11;
  };

  async function handleRegister() {
    if (!name || !email || !cpf || !password || !repeatPassword || !tipo) {
      setModalType("error");
      setModalMessage("Preencha todos os campos e selecione o tipo.");
      setModalVisible(true);
      return;
    }

    if (!isValidEmail(email)) {
      setModalType("error");
      setModalMessage("Por favor, insira um email válido.");
      setModalVisible(true);
      return;
    }

    if (!isValidCPF(cpf)) {
      setModalType("error");
      setModalMessage("Por favor, insira um CPF válido (11 dígitos).");
      setModalVisible(true);
      return;
    }

    if (password.length < 6) {
      setModalType("error");
      setModalMessage("A senha deve ter pelo menos 6 caracteres.");
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
        email: email.toLowerCase(),
        senha: password,
        cpf: cpf.replace(/\D/g, ''),
        tipo: tipo
      });

      setModalType("success");
      setModalMessage("Conta criada com sucesso! Fazendo login automaticamente...");
      setModalVisible(true);

      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      }, 2000);

    } catch (error: any) {
      setModalType("error");

      if (error.message.includes("CPF não cadastrado")) {
        setModalMessage("CPF não encontrado no sistema. Contate um funcionário para realizar seu cadastro prévio.");
      } else if (error.message.includes("Email já cadastrado")) {
        setModalMessage("Este email já está cadastrado no sistema. Tente fazer login ou use outro email.");
      } else if (error.message.includes("cadastrado como")) {
        setModalMessage(error.message);
      } else if (error.message.includes("auth/email-already-in-use")) {
        setModalMessage("Este email já está em uso. Tente fazer login ou use outro email.");
      } else if (error.message.includes("auth/weak-password")) {
        setModalMessage("A senha é muito fraca. Use pelo menos 6 caracteres.");
      } else {
        setModalMessage(error.message || "Erro ao criar conta. Verifique os dados e tente novamente.");
      }

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
              <Text style={styles.inputLabel}>Nome Completo *</Text>
              <TextInput
                style={styles.input}
                placeholder="Seu nome completo"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email *</Text>
              <TextInput
                style={styles.input}
                placeholder="seuemail@gmail.com"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>CPF *</Text>
              <TextInput
                style={styles.input}
                placeholder="123.456.789-00"
                placeholderTextColor="#999"
                value={formatCPF(cpf)}
                onChangeText={(text) => setCpf(text.replace(/\D/g, ''))}
                keyboardType="numeric"
                maxLength={14}
              />
              <Text style={styles.helperText}>
                Seu CPF deve estar pré-cadastrado no sistema
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Tipo de Conta *</Text>
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
              <Text style={styles.helperText}>
                Selecione de acordo com seu cadastro prévio
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Senha *</Text>
              <View style={styles.passwordWrapper}>
                <TextInput
                  style={[styles.input, { paddingRight: 45 }]}
                  placeholder="Mínimo 6 caracteres"
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

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Repetir Senha *</Text>
              <View style={styles.passwordWrapper}>
                <TextInput
                  style={[styles.input, { paddingRight: 45 }]}
                  placeholder="Digite a senha novamente"
                  placeholderTextColor="#999"
                  secureTextEntry={!showRepeatPassword}
                  value={repeatPassword}
                  onChangeText={setRepeatPassword}
                  autoCapitalize="none"
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
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                  <Text style={styles.registerButtonText}>Criar Conta</Text>
                  <Ionicons name="person-add-outline" size={20} color="#fff" />
                </View>
              )}
            </TouchableHighlight>


            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Já tem uma conta? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
              >
                <Text style={styles.loginLink}>Fazer Login</Text>
                <Ionicons name="log-in-outline" size={18} color="#2B5BFF" />
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}