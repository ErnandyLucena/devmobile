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
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { cadastrarMedico } from "../../../../services/medicos.service"; 
import MessageModal from "../../../../components/MessageContext/MessageContext"; 

export function MedicoNovoScreen() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("info");

  const [form, setForm] = useState({
    nmPrestador: "",
    nmMnemonico: "",
    dsCRM: "",
    dsEmail: "",
    especialidade: "",
    situacao: "Ativo", 
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
    setForm((prev) => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.nmPrestador.trim()) newErrors.nmPrestador = "Nome é obrigatório";
    if (!form.dsCRM.trim()) newErrors.dsCRM = "CRM é obrigatório";
    if (!form.dsEmail.trim()) newErrors.dsEmail = "Email é obrigatório";
    if (!form.especialidade.trim()) newErrors.especialidade = "Especialidade é obrigatória";

    // Validação de email
    if (form.dsEmail.trim() && !/\S+@\S+\.\S+/.test(form.dsEmail)) {
      newErrors.dsEmail = "Email inválido";
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
      const result = await cadastrarMedico(form);

      if (result.success) {
        showModal("Médico cadastrado com sucesso!", "success");
      } else {
        showModal("Não foi possível cadastrar o médico.", "error");
      }
    } catch (error) {
      console.log("Erro ao cadastrar:", error);
      showModal("Ocorreu um erro ao cadastrar o médico.", "error");
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
    if (form.nmPrestador.trim() || form.dsCRM.trim() || form.dsEmail.trim()) {
      showModal(
        "Tem certeza que deseja cancelar? As informações não salvas serão perdidas.",
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
    form.nmPrestador.trim() &&
    form.dsCRM.trim() &&
    form.dsEmail.trim() &&
    form.especialidade.trim() &&
    /\S+@\S+\.\S+/.test(form.dsEmail);

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
                  value={form.nmPrestador}
                  onChangeText={(text) => updateField("nmPrestador", text)}
                  returnKeyType="next"
                />
                {errors.nmPrestador && (
                  <Text style={styles.errorText}>{errors.nmPrestador}</Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nome Abreviado</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Digite o nome abreviado"
                  placeholderTextColor="#A0AEC0"
                  value={form.nmMnemonico}
                  onChangeText={(text) => updateField("nmMnemonico", text)}
                  returnKeyType="next"
                />
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Registro Profissional</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>CRM *</Text>
                <TextInput
                  style={[
                    styles.textInput,
                    errors.dsCRM && styles.inputError
                  ]}
                  placeholder="Digite o número do CRM"
                  placeholderTextColor="#A0AEC0"
                  value={form.dsCRM}
                  onChangeText={(text) => updateField("dsCRM", text)}
                  keyboardType="numeric"
                  returnKeyType="next"
                />
                {errors.dsCRM && (
                  <Text style={styles.errorText}>{errors.dsCRM}</Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Especialidade *</Text>
                <TextInput
                  style={[
                    styles.textInput,
                    errors.especialidade && styles.inputError
                  ]}
                  placeholder="Digite a especialidade"
                  placeholderTextColor="#A0AEC0"
                  value={form.especialidade}
                  onChangeText={(text) => updateField("especialidade", text)}
                  returnKeyType="next"
                />
                {errors.especialidade && (
                  <Text style={styles.errorText}>{errors.especialidade}</Text>
                )}
              </View>
            </View>

            {/* Contato e Status */}
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
                  value={form.dsEmail}
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
                <Text style={styles.inputLabel}>Situação</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Ex: Ativo, Disponível, Ausente"
                  placeholderTextColor="#A0AEC0"
                  value={form.situacao}
                  onChangeText={(text) => updateField("situacao", text)}
                  returnKeyType="done"
                />
              </View>
            </View>

            {/* Botões */}
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
                  {loading ? "Salvando..." : "Cadastrar Médico"}
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal para mensagens de sucesso/erro */}
      <MessageModal
        visible={modalVisible}
        message={modalMessage}
        type={modalType}
        onClose={handleModalClose}
      />

      {/* Modal de confirmação para cancelamento (se necessário) */}
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