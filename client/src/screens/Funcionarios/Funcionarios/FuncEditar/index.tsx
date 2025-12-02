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
import { Ionicons } from '@expo/vector-icons';
import { styles } from "./styles";
import { atualizarFuncionario } from "../../../../services/funcionario.service";
import MessageModal from "../../../../components/MessageContext/MessageContext";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function FuncEditarScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const funcionarioRaw = route.params.funcionario;
  const convertISOToBR = (dataISO) => {
    if (!dataISO) return '';
    
    if (typeof dataISO === 'string') {
      if (dataISO.includes('/')) {
        return dataISO; 
      } else if (dataISO.includes('-')) {
        const [year, month, day] = dataISO.split('-');
        return `${day}/${month}/${year}`;
      }
    } else if (dataISO && dataISO.toDate) {
      try {
        const date = dataISO.toDate();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      } catch (error) {
        console.log("Erro ao converter timestamp:", error);
        return '';
      }
    }
    
    return '';
  };

  const funcionario = {
    id: funcionarioRaw.id ?? funcionarioRaw.idFuncionario,
    nomeCompleto: funcionarioRaw.nomeCompleto ?? funcionarioRaw.nome ?? "",
    cargo: funcionarioRaw.cargo ?? "",
    setor: funcionarioRaw.setor ?? "",
    situacao: Array.isArray(funcionarioRaw.situacao)
      ? funcionarioRaw.situacao[0]
      : (funcionarioRaw.situacao ?? "Ativo"),
    email: funcionarioRaw.email ?? "",
    tel: funcionarioRaw.tel ?? funcionarioRaw.telefone ?? "",
    cpf: funcionarioRaw.cpf ?? "",
    dataAdmissao: convertISOToBR(funcionarioRaw.dataAdmissao)
  };

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("info");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [formData, setFormData] = useState({
    nome: funcionario.nomeCompleto,
    cargo: funcionario.cargo,
    setor: funcionario.setor,
    situacao: funcionario.situacao,
    email: funcionario.email,
    telefone: funcionario.tel,
    cpf: funcionario.cpf,
    dataAdmissao: funcionario.dataAdmissao
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
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return numbers.replace(/(\d{3})(\d{0,3})/, '$1.$2');
    if (numbers.length <= 9) return numbers.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
  };

  const handleCPFChange = (text) => {
    updateField("cpf", formatCPF(text));
  };

  const formatTelefone = (text) => {
    const numbers = text.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 6) return numbers.replace(/(\d{2})(\d{0,4})/, '($1) $2');
    if (numbers.length <= 10) return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  };

  const handleTelefoneChange = (text) => {
    updateField("telefone", formatTelefone(text));
  };

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
    updateField("dataAdmissao", formatDataBR(text));
  };

  const handleOpenCalendar = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    
    if (selectedDate) {
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
    if (cleanCPF.length !== 11) return false;
    if (/^(\d)\1+$/.test(cleanCPF)) return false;
    return true;
  };

  const validateEmail = (email) => {
    if (!email) return true;
    return /\S+@\S+\.\S+/.test(email);
  };


  const validateDataBR = (data) => {
    if (!data) return true;
    
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(data)) {
      return false;
    }
    
    const [day, month, year] = data.split('/').map(Number);

    const date = new Date(year, month - 1, day);
    
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day &&
      !isNaN(date.getTime())
    );
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!formData.cargo.trim()) newErrors.cargo = "Cargo é obrigatório";
    if (!formData.setor.trim()) newErrors.setor = "Setor é obrigatório";

    if (formData.cpf.trim() && !validateCPF(formData.cpf))
      newErrors.cpf = "CPF inválido";

    if (formData.email.trim() && !validateEmail(formData.email))
      newErrors.email = "Email inválido";

    if (formData.dataAdmissao.trim() && !validateDataBR(formData.dataAdmissao))
      newErrors.dataAdmissao = "Data inválida (use DD/MM/AAAA)";

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
      const dataToSend = {
        nomeCompleto: formData.nome.trim(),
        cargo: formData.cargo.trim(),
        setor: formData.setor.trim(),
        situacao: formData.situacao, 
        email: formData.email.trim(),
        tel: formData.telefone,
        cpf: formData.cpf,
        dataAdmissao: formData.dataAdmissao 
      };

      console.log("📤 Enviando dados para atualização:", dataToSend);

      const funcionarioId = funcionario.id;

      const result = await atualizarFuncionario(funcionarioId, dataToSend);

      if (result.success) {
        showModal("Funcionário atualizado com sucesso!", "success");
      } else {
        showModal("Não foi possível atualizar o funcionário: " + (result.error || ""), "error");
      }
    } catch (error) {
      console.log("Erro ao atualizar funcionário:", error);
      showModal("Ocorreu um erro ao atualizar o funcionário: " + error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    const hasChanges =
      formData.nome !== funcionario.nomeCompleto ||
      formData.cargo !== funcionario.cargo ||
      formData.setor !== funcionario.setor ||
      formData.situacao !== funcionario.situacao ||
      formData.email !== funcionario.email ||
      formData.telefone !== funcionario.tel ||
      formData.cpf !== funcionario.cpf ||
      formData.dataAdmissao !== funcionario.dataAdmissao;

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

  const handleModalClose = () => {
    hideModal();
    if (modalType === "success") {
      navigation.goBack();
    }
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
                  />
                  <TouchableOpacity 
                    style={styles.calendarButton}
                    onPress={handleOpenCalendar}
                  >
                    <Ionicons name="calendar" size={24} color="#FFFFFF" />
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
        showConfirmButton={
          modalType === "warning" &&
          modalMessage.includes("cancelar")
        }
        onConfirm={
          modalType === "warning" &&
          modalMessage.includes("cancelar")
            ? handleConfirmCancel
            : null
        }
        confirmText="Sim, Cancelar"
        cancelText="Continuar Editando"
      />
    </>
  );
}