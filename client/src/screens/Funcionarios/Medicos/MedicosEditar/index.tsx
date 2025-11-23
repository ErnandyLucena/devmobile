// screens/Medicos/MedicosEditar.js
import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "./styles";
import { atualizarMedico } from "../../../../services/medicos.service";
import MessageModal from "../../../../components/MessageContext/MessageContext"; 

export default function MedicosEditarScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { medico } = route.params;

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("info");

  const [formData, setFormData] = useState({
    nmPrestador: medico.nmPrestador || "",
    especialidade: medico.especialidade || "",
    dsEmail: medico.dsEmail || "",
    nmMnemonico: medico.nmMnemonico || "",
    dsCodigoConselho: medico.dsCodigoConselho || "",
    dsCRM: medico.dsCRM || "",
    cpf: medico.cpf || "", // NOVO CAMPO CPF
    situacao: medico.situacao || "Ativo"
  });

  const [errors, setErrors] = useState({});

  const showModal = (message, type = "info") => {
    setModalMessage(message);
    setModalType(type);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  // Função para formatar CPF
  const formatCPF = (text) => {
    const numbers = text.replace(/\D/g, '');
    
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 6) {
      return numbers.replace(/(\d{3})(\d{0,3})/, '$1.$2');
    } else if (numbers.length <= 9) {
      return numbers.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
    } else {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
    }
  };

  const handleCPFChange = (text) => {
    const formattedCPF = formatCPF(text);
    updateField("cpf", formattedCPF);
  };

  // Função para validar CPF
  const validateCPF = (cpf) => {
    if (!cpf) return true;
    
    const cleanCPF = cpf.replace(/\D/g, '');
    
    if (cleanCPF.length !== 11) {
      return false;
    }
    
    if (/^(\d)\1+$/.test(cleanCPF)) {
      return false;
    }
    
    return true;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nmPrestador.trim()) {
      newErrors.nmPrestador = "Nome é obrigatório";
    }
    if (!formData.especialidade.trim()) {
      newErrors.especialidade = "Especialidade é obrigatória";
    }
    if (!formData.dsEmail.trim()) {
      newErrors.dsEmail = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.dsEmail)) {
      newErrors.dsEmail = "Email inválido";
    }

    // Validação de CPF (se preenchido)
    if (formData.cpf.trim() && !validateCPF(formData.cpf)) {
      newErrors.cpf = "CPF inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSalvar = async () => {
    if (!validateForm()) {
      showModal("Preencha os campos obrigatórios corretamente!", "warning");
      return;
    }

    setLoading(true);

    try {
      const result = await atualizarMedico(medico.id, formData);

      if (result.success) {
        showModal("Médico atualizado com sucesso!", "success");
      } else {
        showModal("Não foi possível atualizar o médico.", "error");
      }
    } catch (error) {
      console.log("Erro ao atualizar médico:", error);
      showModal("Ocorreu um erro ao atualizar o médico.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    hideModal();
   
    if (modalType === "success") {
      navigation.goBack();
    }
  };

  const handleCancelar = () => {
    const hasChanges = 
      formData.nmPrestador !== medico.nmPrestador ||
      formData.especialidade !== medico.especialidade ||
      formData.dsEmail !== medico.dsEmail ||
      formData.nmMnemonico !== medico.nmMnemonico ||
      formData.dsCodigoConselho !== medico.dsCodigoConselho ||
      formData.dsCRM !== medico.dsCRM ||
      formData.cpf !== medico.cpf || // ADICIONADO CPF
      formData.situacao !== medico.situacao;

    if (hasChanges) {
      showModal(
        "Tem certeza que deseja cancelar? As alterações não salvas serão perdidas.",
        "warning"
      );
    } else {
      navigation.goBack();
    }
  };

  const handleConfirmCancel = () => {
    hideModal();
    navigation.goBack();
  };

  const isFormValid = 
    formData.nmPrestador.trim() && 
    formData.especialidade.trim() && 
    formData.dsEmail.trim() &&
    /\S+@\S+\.\S+/.test(formData.dsEmail) &&
    (!formData.cpf.trim() || validateCPF(formData.cpf));

  return (
    <>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#F7FAFC" />
        
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.form}>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Informações Pessoais</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nome Completo *</Text>
                <TextInput
                  style={[
                    styles.textInput,
                    errors.nmPrestador && styles.inputError
                  ]}
                  placeholder="Digite o nome completo"
                  placeholderTextColor="#A0AEC0"
                  value={formData.nmPrestador}
                  onChangeText={(text) => updateField("nmPrestador", text)}
                  returnKeyType="next"
                />
                {errors.nmPrestador && (
                  <Text style={styles.errorText}>{errors.nmPrestador}</Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>CPF</Text>
                <TextInput
                  style={[
                    styles.textInput,
                    errors.cpf && styles.inputError
                  ]}
                  placeholder="000.000.000-00"
                  placeholderTextColor="#A0AEC0"
                  value={formData.cpf}
                  onChangeText={handleCPFChange}
                  keyboardType="numeric"
                  maxLength={14}
                  returnKeyType="next"
                />
                {errors.cpf && (
                  <Text style={styles.errorText}>{errors.cpf}</Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nome Abreviado</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Digite o nome abreviado"
                  placeholderTextColor="#A0AEC0"
                  value={formData.nmMnemonico}
                  onChangeText={(text) => updateField("nmMnemonico", text)}
                  returnKeyType="next"
                />
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Registro Profissional</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Especialidade *</Text>
                <TextInput
                  style={[
                    styles.textInput,
                    errors.especialidade && styles.inputError
                  ]}
                  placeholder="Digite a especialidade"
                  placeholderTextColor="#A0AEC0"
                  value={formData.especialidade}
                  onChangeText={(text) => updateField("especialidade", text)}
                  returnKeyType="next"
                />
                {errors.especialidade && (
                  <Text style={styles.errorText}>{errors.especialidade}</Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>CRM</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Digite o número do CRM"
                  placeholderTextColor="#A0AEC0"
                  value={formData.dsCRM}
                  onChangeText={(text) => updateField("dsCRM", text)}
                  keyboardType="numeric"
                  returnKeyType="next"
                />
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contato e Status</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email *</Text>
                <TextInput
                  style={[
                    styles.textInput,
                    errors.dsEmail && styles.inputError
                  ]}
                  placeholder="Digite o email"
                  placeholderTextColor="#A0AEC0"
                  value={formData.dsEmail}
                  onChangeText={(text) => updateField("dsEmail", text)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  returnKeyType="next"
                />
                {errors.dsEmail && (
                  <Text style={styles.errorText}>{errors.dsEmail}</Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Situação *</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={formData.situacao}
                    onValueChange={(value) => updateField("situacao", value)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Ativo" value="Ativo" />
                    <Picker.Item label="Inativo" value="Inativo" />
                  </Picker>
                </View>
              </View>
            </View>

            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={[styles.cancelButton, loading && styles.buttonDisabled]}
                onPress={handleCancelar}
                disabled={loading}
              >
                <Text style={styles.cancelButtonText}>
                  {loading ? "Cancelando..." : "Cancelar"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[
                  styles.saveButton,
                  (!isFormValid || loading) && styles.saveButtonDisabled
                ]} 
                onPress={handleSalvar}
                disabled={!isFormValid || loading}
              >
                <Text style={styles.saveButtonText}>
                  {loading ? "Salvando..." : "Salvar Alterações"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <MessageModal
        visible={modalVisible}
        message={modalMessage}
        type={modalType}
        onClose={handleModalClose}
      />

      {modalType === "warning" && modalMessage.includes("cancelar") && (
        <MessageModal
          visible={modalVisible}
          message={modalMessage}
          type={modalType}
          onClose={hideModal}
          showConfirmButton={true}
          onConfirm={handleConfirmCancel}
          confirmText="Sim, Cancelar"
          cancelText="Continuar Editando"
        />
      )}
    </>
  );
}