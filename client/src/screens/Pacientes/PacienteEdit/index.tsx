import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ActivityIndicator
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { styles } from "./styles";
import { atualizarPaciente, getPacienteById } from "../../../services/pacientes.service";
import MessageModal from "../../../components/MessageContext/MessageContext";

export default function EditarPacienteScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { paciente, onPacienteAtualizado } = route.params;

  const [loading, setLoading] = useState(false);
  const [carregandoDados, setCarregandoDados] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("info");

  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: ""
  });

  useEffect(() => {
    if (paciente) {
      carregarDadosPaciente();
    }
  }, [paciente]);

  const carregarDadosPaciente = async () => {
    try {
      setCarregandoDados(true);

      if (paciente.nome && paciente.cpf) {
        setFormData({
          nome: paciente.nome || "",
          cpf: formatarCPF(paciente.cpf) || "",
          email: paciente.email || "",
          telefone: formatarTelefone(paciente.telefone) || ""
        });
      } else {
        const pacienteCompleto = await getPacienteById(paciente.id);
        if (pacienteCompleto) {
          setFormData({
            nome: pacienteCompleto.nome || "",
            cpf: formatarCPF(pacienteCompleto.cpf) || "",
            email: pacienteCompleto.email || "",
            telefone: formatarTelefone(pacienteCompleto.telefone) || ""
          });
        }
      }
    } catch (error) {
      console.log("Erro ao carregar dados do paciente:", error);
      showModal("Erro ao carregar dados do paciente", "error");
    } finally {
      setCarregandoDados(false);
    }
  };

  const showModal = (message, type = "info") => {
    setModalMessage(message);
    setModalType(type);
    setModalVisible(true);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatarCPF = (cpf) => {
    if (!cpf) return "";
    const numbers = cpf.replace(/\D/g, '');

    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return numbers.replace(/(\d{3})(\d+)/, '$1.$2');
    if (numbers.length <= 9) return numbers.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatarTelefone = (telefone) => {
    if (!telefone) return "";
    const numbers = telefone.replace(/\D/g, '');

    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 6) return numbers.replace(/(\d{2})(\d+)/, '($1) $2');
    if (numbers.length <= 10) return numbers.replace(/(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const handleCPFChange = (value) => {
    const formattedCPF = formatarCPF(value);
    handleInputChange('cpf', formattedCPF);
  };

  const handleTelefoneChange = (value) => {
    const formattedTelefone = formatarTelefone(value);
    handleInputChange('telefone', formattedTelefone);
  };

  const validarFormulario = () => {
    if (!formData.nome.trim()) {
      showModal("Por favor, informe o nome do paciente", "error");
      return false;
    }

    if (!formData.cpf.trim()) {
      showModal("Por favor, informe o CPF do paciente", "error");
      return false;
    }

    const cpfLimpo = formData.cpf.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) {
      showModal("CPF deve ter 11 dígitos", "error");
      return false;
    }

    if (formData.email && !formData.email.includes('@')) {
      showModal("Por favor, informe um email válido", "error");
      return false;
    }

    if (formData.telefone) {
      const telefoneLimpo = formData.telefone.replace(/\D/g, '');
      if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
        showModal("Telefone deve ter 10 ou 11 dígitos", "error");
        return false;
      }
    }

    return true;
  };

  const handleSalvar = async () => {
    if (!validarFormulario()) return;

    setLoading(true);
    try {
      const dadosParaSalvar = {
        nome: formData.nome.trim(),
        cpf: formData.cpf.replace(/\D/g, ''),
        email: formData.email.trim(),
        telefone: formData.telefone.replace(/\D/g, '')
      };

      const resultado = await atualizarPaciente(paciente.id, dadosParaSalvar);

      if (resultado.success) {
        showModal("Paciente atualizado com sucesso!", "success");
        if (onPacienteAtualizado) {
          onPacienteAtualizado();
        }
      } else {
        throw new Error(resultado.error);
      }
    } catch (error) {
      console.log("Erro ao atualizar paciente:", error);
      showModal("Não foi possível atualizar o paciente. Tente novamente.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    if (modalType === "success") {
      navigation.goBack();
    }
  };

  const handleVoltar = () => {
    navigation.goBack();
  };

  if (carregandoDados) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2B5BFF" />
        <Text style={styles.loadingText}>Carregando dados do paciente...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Dados Pessoais</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nome Completo *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Digite o nome completo"
              placeholderTextColor="#A0AEC0"
              value={formData.nome}
              onChangeText={(value) => handleInputChange('nome', value)}
              autoCapitalize="words"
              autoComplete="name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>CPF *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="000.000.000-00"
              placeholderTextColor="#A0AEC0"
              value={formData.cpf}
              onChangeText={handleCPFChange}
              keyboardType="numeric"
              maxLength={14}
              editable={false} 
            />
            <Text style={styles.helperText}>CPF não pode ser alterado</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.textInput}
              placeholder="paciente@email.com"
              placeholderTextColor="#A0AEC0"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Telefone</Text>
            <TextInput
              style={styles.textInput}
              placeholder="(00) 00000-0000"
              placeholderTextColor="#A0AEC0"
              value={formData.telefone}
              onChangeText={handleTelefoneChange}
              keyboardType="phone-pad"
              maxLength={15}
            />
          </View>
        </View>

        <View style={styles.actionsSection}>
          <TouchableOpacity
            style={[styles.actionButton, styles.cancelButton]}
            onPress={handleVoltar}
            disabled={loading}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Text style={[styles.actionButtonText, styles.cancelButtonText]}>
              <Ionicons name="close-circle-outline" size={20} color="#E53E3E" />
                Cancelar
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.saveButton,
              loading && styles.saveButtonDisabled
            ]}
            onPress={handleSalvar}
            disabled={loading}
          >
            {loading ? (
              <Text style={styles.actionButtonText}>Salvando...</Text>
            ) : (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <Text style={styles.actionButtonText}>Salvar Alterações</Text>
                <Ionicons name="save-outline" size={20} color="#FFFFFF" />
              </View>
            )}
          </TouchableOpacity>
        </View>

      </ScrollView>

      <MessageModal
        visible={modalVisible}
        message={modalMessage}
        type={modalType}
        onClose={handleModalClose}
      />
    </KeyboardAvoidingView>
  );
}