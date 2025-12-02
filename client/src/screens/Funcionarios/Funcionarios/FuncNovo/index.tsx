import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Modal,
  TouchableWithoutFeedback
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { cadastrarFuncionario } from "../../../../services/funcionario.service";
import MessageModal from "../../../../components/MessageContext/MessageContext";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';


export default function FuncNovoScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("info");
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    cargo: "",
    setor: "",
    email: "",
    telefone: "",
    dataAdmissao: "",
    situacao: "Ativo"
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

  const formatTelefone = (text) => {
    const numbers = text.replace(/\D/g, '');

    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 6) {
      return numbers.replace(/(\d{2})(\d{0,4})/, '($1) $2');
    } else if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
  };

  const handleTelefoneChange = (text) => {
    const formattedTelefone = formatTelefone(text);
    updateField("telefone", formattedTelefone);
  };

  // Nova formatação para data no formato brasileiro (DD/MM/AAAA)
  const formatDataBR = (text) => {
    const numbers = text.replace(/\D/g, '');

    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 4) {
      return numbers.replace(/(\d{2})(\d{0,2})/, '$1/$2');
    } else {
      return numbers.replace(/(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
    }
  };

  const handleDataChange = (text) => {
    const formattedData = formatDataBR(text);
    updateField("dataAdmissao", formattedData);
  };

  // Função para converter data BR para formato ISO (AAAA-MM-DD)
  const convertBRToISO = (dataBR) => {
    if (!dataBR || dataBR.length !== 10) return null;

    const [day, month, year] = dataBR.split('/');
    return `${year}-${month}-${day}`;
  };

  // Função para converter data ISO para formato BR (DD/MM/AAAA)
  const convertISOToBR = (dataISO) => {
    if (!dataISO) return '';

    const [year, month, day] = dataISO.split('-');
    return `${day}/${month}/${year}`;
  };

  // Função para abrir o calendário
  const handleOpenCalendar = () => {
    setShowDatePicker(true);
  };

  // Função para lidar com a seleção de data no calendário
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);

    if (selectedDate) {
      // Formata a data selecionada para o formato brasileiro
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const year = selectedDate.getFullYear();

      const formattedDate = `${day}/${month}/${year}`;
      updateField("dataAdmissao", formattedDate);
    }
  };

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

  const validateEmail = (email) => {
    if (!email) return true;
    return /\S+@\S+\.\S+/.test(email);
  };

  // Validação de data no formato brasileiro
  const validateDataBR = (data) => {
    if (!data) return true;

    if (data.length !== 10) return false;

    const [day, month, year] = data.split('/');
    const date = new Date(`${year}-${month}-${day}`);

    return !isNaN(date.getTime());
  };

  const handleSalvar = async () => {
    const newErrors = {};

    if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!formData.cargo.trim()) newErrors.cargo = "Cargo é obrigatório";
    if (!formData.setor.trim()) newErrors.setor = "Setor é obrigatório";

    if (formData.cpf.trim() && !validateCPF(formData.cpf)) {
      newErrors.cpf = "CPF inválido";
    }

    if (formData.email.trim() && !validateEmail(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (formData.dataAdmissao.trim() && !validateDataBR(formData.dataAdmissao)) {
      newErrors.dataAdmissao = "Data inválida";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showModal("Preencha os campos obrigatórios corretamente!", "warning");
      return;
    }

    setErrors({});
    setLoading(true);

    const parseDate = (value) => {
      if (!value || value.length !== 10) return null;
      const [day, month, year] = value.split("/");
      const date = new Date(`${year}-${month}-${day}T00:00:00`);
      return isNaN(date.getTime()) ? null : date;
    };

    try {
      const dataToSend = {
        nomeCompleto: formData.nome,
        cpf: formData.cpf,
        cargo: formData.cargo,
        setor: formData.setor,
        email: formData.email,
        tel: formData.telefone,
        situacao: formData.situacao,
        dataAdmissao: parseDate(formData.dataAdmissao),
      };

      const result = await cadastrarFuncionario(dataToSend);

      if (result.success) {
        showModal("Funcionário cadastrado com sucesso!", "success");
      } else {
        showModal("Falha ao cadastrar funcionário.", "error");
      }

    } catch (err) {
      console.log("Erro ao cadastrar funcionário:", err);
      showModal("Ocorreu um erro ao salvar.", "error");
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
    if (formData.nome.trim() || formData.cargo.trim() || formData.setor.trim()) {
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
    formData.nome.trim() &&
    formData.cargo.trim() &&
    formData.setor.trim() &&
    (!formData.cpf.trim() || validateCPF(formData.cpf)) &&
    (!formData.email.trim() || validateEmail(formData.email)) &&
    (!formData.dataAdmissao.trim() || validateDataBR(formData.dataAdmissao));

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
                  placeholder="Digite o nome completo"
                  placeholderTextColor="#A0AEC0"
                  value={formData.nome}
                  onChangeText={(text) => updateField("nome", text)}
                  style={[styles.textInput, errors.nome && styles.inputError]}
                  returnKeyType="next"
                />
                {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>CPF</Text>
                <TextInput
                  placeholder="000.000.000-00"
                  placeholderTextColor="#A0AEC0"
                  value={formData.cpf}
                  onChangeText={handleCPFChange}
                  style={[styles.textInput, errors.cpf && styles.inputError]}
                  keyboardType="numeric"
                  maxLength={14}
                  returnKeyType="next"
                />
                {errors.cpf && <Text style={styles.errorText}>{errors.cpf}</Text>}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Dados Profissionais</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Cargo *</Text>
                <TextInput
                  placeholder="Digite o cargo"
                  placeholderTextColor="#A0AEC0"
                  value={formData.cargo}
                  onChangeText={(text) => updateField("cargo", text)}
                  style={[styles.textInput, errors.cargo && styles.inputError]}
                  returnKeyType="next"
                />
                {errors.cargo && <Text style={styles.errorText}>{errors.cargo}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Setor *</Text>
                <TextInput
                  placeholder="Digite o setor"
                  placeholderTextColor="#A0AEC0"
                  value={formData.setor}
                  onChangeText={(text) => updateField("setor", text)}
                  style={[styles.textInput, errors.setor && styles.inputError]}
                  returnKeyType="next"
                />
                {errors.setor && <Text style={styles.errorText}>{errors.setor}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Data de Admissão</Text>
                <View style={styles.dateInputContainer}>
                  <TextInput
                    placeholder="DD/MM/AAAA"
                    placeholderTextColor="#A0AEC0"
                    value={formData.dataAdmissao}
                    onChangeText={handleDataChange}
                    style={[styles.textInput, styles.dateInput, errors.dataAdmissao && styles.inputError]}
                    keyboardType="numeric"
                    maxLength={10}
                    returnKeyType="done"
                  />
                  <TouchableOpacity
                    style={styles.calendarButton}
                    onPress={handleOpenCalendar}
                  >
                    <Ionicons name="calendar" size={24} color="#0051ffff" />
                  </TouchableOpacity>
                </View>
                {errors.dataAdmissao && <Text style={styles.errorText}>{errors.dataAdmissao}</Text>}
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

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Informações de Contato</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>E-mail</Text>
                <TextInput
                  placeholder="exemplo@email.com"
                  placeholderTextColor="#A0AEC0"
                  value={formData.email}
                  onChangeText={(text) => updateField("email", text)}
                  style={[styles.textInput, errors.email && styles.inputError]}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  returnKeyType="next"
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Telefone</Text>
                <TextInput
                  placeholder="(00) 00000-0000"
                  placeholderTextColor="#A0AEC0"
                  value={formData.telefone}
                  onChangeText={handleTelefoneChange}
                  style={styles.textInput}
                  keyboardType="phone-pad"
                  maxLength={15}
                  returnKeyType="done"
                />
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
                <Ionicons name="close-circle" size={22} color="#E53E3E" />
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
                  {loading ? "Salvando..." : (!isFormValid ? "Preencha os campos" : "Cadastrar Funcionário")}
                </Text>
                <Ionicons name="checkmark-circle" size={22} color="#FFFFFF" />
              </TouchableOpacity>

            </View>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>

      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          style={styles.datePicker}
        />
      )}

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