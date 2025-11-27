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

  // Carrega os dados do paciente quando a tela abre
  useEffect(() => {
    if (paciente) {
      carregarDadosPaciente();
    }
  }, [paciente]);

  const carregarDadosPaciente = async () => {
    try {
      setCarregandoDados(true);
      
      // Se já temos os dados completos do paciente, usa diretamente
      if (paciente.nome && paciente.cpf) {
        setFormData({
          nome: paciente.nome || "",
          cpf: formatarCPF(paciente.cpf) || "",
          email: paciente.email || "",
          telefone: formatarTelefone(paciente.telefone) || ""
        });
      } else {
        // Se não, busca os dados completos pelo ID
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
    // Remove tudo que não é número
    const numbers = cpf.replace(/\D/g, '');

    // Aplica a formatação
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return numbers.replace(/(\d{3})(\d+)/, '$1.$2');
    if (numbers.length <= 9) return numbers.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatarTelefone = (telefone) => {
    if (!telefone) return "";
    // Remove tudo que não é número
    const numbers = telefone.replace(/\D/g, '');

    // Aplica a formatação
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

    // Validação básica de CPF (apenas formato)
    const cpfLimpo = formData.cpf.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) {
      showModal("CPF deve ter 11 dígitos", "error");
      return false;
    }

    // Validação básica de email
    if (formData.email && !formData.email.includes('@')) {
      showModal("Por favor, informe um email válido", "error");
      return false;
    }

    // Validação básica de telefone
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
      // Remove formatação do CPF e telefone antes de salvar
      const dadosParaSalvar = {
        nome: formData.nome.trim(),
        cpf: formData.cpf.replace(/\D/g, ''),
        email: formData.email.trim(),
        telefone: formData.telefone.replace(/\D/g, '')
      };

      const resultado = await atualizarPaciente(paciente.id, dadosParaSalvar);

      if (resultado.success) {
        showModal("Paciente atualizado com sucesso!", "success");
        // Chama o callback para atualizar a lista/detalhes
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
    // Se foi um sucesso, navega de volta
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
        {/* Formulário */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Dados Pessoais</Text>

          {/* Campo Nome */}
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

          {/* Campo CPF */}
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
              editable={false} // CPF geralmente não é editável
            />
            <Text style={styles.helperText}>CPF não pode ser alterado</Text>
          </View>

          {/* Campo Email */}
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

          {/* Campo Telefone */}
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

        {/* Botões de Ação */}
        <View style={styles.actionsSection}>
          <TouchableOpacity
            style={[styles.actionButton, styles.cancelButton]}
            onPress={handleVoltar}
            disabled={loading}
          >
            <Text style={[styles.actionButtonText, styles.cancelButtonText]}>
              Cancelar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.saveButton, loading && styles.saveButtonDisabled]}
            onPress={handleSalvar}
            disabled={loading}
          >
            {loading ? (
              <Text style={styles.actionButtonText}>Salvando...</Text>
            ) : (
              <Text style={styles.actionButtonText}>Salvar Alterações</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal Personalizado */}
      <MessageModal
        visible={modalVisible}
        message={modalMessage}
        type={modalType}
        onClose={handleModalClose}
      />
    </KeyboardAvoidingView>
  );
}