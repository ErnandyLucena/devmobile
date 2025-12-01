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
  StatusBar,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { styles } from "./styles";
import { atualizarMedico } from "../../../../services/medicos.service";
import MessageModal from "../../../../components/MessageContext/MessageContext";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function MedicosEditarScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { medico } = route.params;

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("info");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [formData, setFormData] = useState({
    nmPrestador: medico.nmPrestador || "",
    nmMnemonico: medico.nmMnemonico || "",
    especialidade: medico.especialidade || "",
    dsEmail: medico.dsEmail || "",
    tel: medico.tel || "",
    cpf: medico.cpf || "",
    dsCRM: medico.dsCRM || "",
    dsCodigoConselho: medico.dsCodigoConselho || "",
    dataAdmissao: medico.dataAdmissao || "",
    situacao: medico.situacao || "Ativo",
  });

  const [errors, setErrors] = useState({});

  // ========================
  // FUNÇÕES DE MODAL
  // ========================

  const showModal = (msg, type = "info") => {
    setModalMessage(msg);
    setModalType(type);
    setModalVisible(true);
  };

  const hideModal = () => setModalVisible(false);

  const handleModalClose = () => {
    hideModal();
    if (modalType === "success") {
      if (route.params?.onMedicoUpdated) {
        route.params.onMedicoUpdated();
      }
      navigation.goBack();
    }
  };

  // ========================
  // ATUALIZAÇÃO DE CAMPOS
  // ========================

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // ========================
  // FORMATAÇÕES
  // ========================

  const formatCPF = (value) => {
    const v = value.replace(/\D/g, "");
    if (v.length <= 3) return v;
    if (v.length <= 6) return v.replace(/(\d{3})(\d{0,3})/, "$1.$2");
    if (v.length <= 9) return v.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
    return v.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
  };

  const handleCPF = (text) => updateField("cpf", formatCPF(text));

  const formatTel = (value) => {
    const v = value.replace(/\D/g, "");
    if (v.length <= 2) return v;
    if (v.length <= 6) return v.replace(/(\d{2})(\d{0,4})/, "($1) $2");
    if (v.length <= 10) return v.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    return v.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  };

  const handleTel = (text) => updateField("tel", formatTel(text));

  // ------ CRM CORRIGIDO ------
  const formatCRM = (value) => {
    const cleaned = value.replace(/[^\dA-Za-z]/g, "").toUpperCase();

    const part1 = cleaned.substring(0, 3); // CRM
    const part2 = cleaned.substring(3, 5); // UF
    const number = cleaned.substring(5);   // números

    let formatted = part1;
    if (part2) formatted += `/${part2}`;
    if (number) formatted += ` ${number}`;

    return formatted;
  };

  const handleCRM = (text) => updateField("dsCRM", formatCRM(text));

  const formatDataBR = (value) => {
    const v = value.replace(/\D/g, "");
    if (v.length <= 2) return v;
    if (v.length <= 4) return v.replace(/(\d{2})(\d{0,2})/, "$1/$2");
    return v.replace(/(\d{2})(\d{2})(\d{0,4})/, "$1/$2/$3");
  };

  const handleDataChange = (text) => updateField("dataAdmissao", formatDataBR(text));

  const handleOpenCalendar = () => setShowDatePicker(true);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const day = String(selectedDate.getDate()).padStart(2, "0");
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const year = selectedDate.getFullYear();
      updateField("dataAdmissao", `${day}/${month}/${year}`);
    }
  };

  // ========================
  // VALIDAÇÕES
  // ========================

  const validateCPF = (cpf) => {
    if (!cpf) return true;
    const clean = cpf.replace(/\D/g, '');
    return clean.length === 11;
  };

  const validateDataBR = (data) => {
    if (!data) return true;
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(data)) return false;
    const [d, m, y] = data.split("/").map(Number);
    const date = new Date(y, m - 1, d);
    return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
  };

  // CRM VALIDADO CORRETAMENTE
  const validateCRM = (crm) => {
    if (!crm) return true;
    return /^[A-Za-z]{3}\/[A-Za-z]{2} \d{1,6}$/.test(crm);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nmPrestador.trim()) {
      newErrors.nmPrestador = "Nome é obrigatório";
    }

    if (!formData.especialidade.trim()) {
      newErrors.especialidade = "Especialidade é obrigatória";
    }

    if (!formData.dsEmail.trim() || !/\S+@\S+\.\S+/.test(formData.dsEmail)) {
      newErrors.dsEmail = "Email inválido";
    }

    if (formData.cpf && !validateCPF(formData.cpf)) {
      newErrors.cpf = "CPF inválido";
    }

    if (formData.tel && formData.tel.replace(/\D/g, "").length < 10) {
      newErrors.tel = "Telefone inválido";
    }

    if (formData.dsCRM && !validateCRM(formData.dsCRM)) {
      newErrors.dsCRM = "CRM inválido (formato: CRM/UF 123456)";
    }

    if (formData.dataAdmissao && !validateDataBR(formData.dataAdmissao)) {
      newErrors.dataAdmissao = "Data inválida (DD/MM/AAAA)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ========================
  // SALVAR
  // ========================

  const handleSalvar = async () => {
    if (!validateForm()) {
      showModal("Corrija os campos obrigatórios!", "warning");
      return;
    }

    setLoading(true);

    try {
      const result = await atualizarMedico(medico.id, formData);

      if (result.success) {
        showModal("Médico atualizado com sucesso!", "success");
      } else {
        showModal("Erro ao atualizar o médico: " + (result.error || ""), "error");
      }
    } catch (err) {
      console.log("Erro ao atualizar médico:", err);
      showModal("Ocorreu um erro ao salvar: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    navigation.goBack();
  };

  const isFormValid =
    formData.nmPrestador.trim() &&
    formData.especialidade.trim() &&
    formData.dsEmail.trim() &&
    /\S+@\S+\.\S+/.test(formData.dsEmail);

  // ========================
  // RENDER
  // ========================

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

            {/* --- INFORMAÇÕES PESSOAIS --- */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Informações Pessoais</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nome Completo *</Text>
                <TextInput
                  style={[styles.textInput, errors.nmPrestador && styles.inputError]}
                  placeholder="Digite o nome completo"
                  value={formData.nmPrestador}
                  onChangeText={(t) => updateField("nmPrestador", t)}
                  returnKeyType="next"
                />
                {errors.nmPrestador && <Text style={styles.errorText}>{errors.nmPrestador}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>CPF</Text>
                <TextInput
                  style={[styles.textInput, errors.cpf && styles.inputError]}
                  placeholder="000.000.000-00"
                  value={formData.cpf}
                  maxLength={14}
                  keyboardType="numeric"
                  onChangeText={handleCPF}
                  returnKeyType="next"
                />
                {errors.cpf && <Text style={styles.errorText}>{errors.cpf}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Telefone</Text>
                <TextInput
                  style={[styles.textInput, errors.tel && styles.inputError]}
                  placeholder="(00) 00000-0000"
                  value={formData.tel}
                  maxLength={15}
                  keyboardType="phone-pad"
                  onChangeText={handleTel}
                  returnKeyType="next"
                />
                {errors.tel && <Text style={styles.errorText}>{errors.tel}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Data de Admissão</Text>
                <View style={styles.dateInputContainer}>
                  <TextInput
                    style={[styles.textInput, styles.dateInput, errors.dataAdmissao && styles.inputError]}
                    placeholder="DD/MM/AAAA"
                    value={formData.dataAdmissao}
                    maxLength={10}
                    keyboardType="numeric"
                    onChangeText={handleDataChange}
                    returnKeyType="done"
                  />
                  <TouchableOpacity
                    style={styles.calendarButton}
                    onPress={handleOpenCalendar}
                  >
                    <Ionicons name="calendar" size={22} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
                {errors.dataAdmissao && (
                  <Text style={styles.errorText}>{errors.dataAdmissao}</Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nome Abreviado</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Nome abreviado"
                  value={formData.nmMnemonico}
                  onChangeText={(t) => updateField("nmMnemonico", t)}
                  returnKeyType="next"
                />
              </View>
            </View>

            {/* --- REGISTRO PROFISSIONAL --- */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Registro Profissional</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Especialidade *</Text>
                <TextInput
                  style={[styles.textInput, errors.especialidade && styles.inputError]}
                  placeholder="Digite a especialidade"
                  value={formData.especialidade}
                  onChangeText={(t) => updateField("especialidade", t)}
                  returnKeyType="next"
                />
                {errors.especialidade && (
                  <Text style={styles.errorText}>{errors.especialidade}</Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>CRM</Text>
                <TextInput
                  style={[styles.textInput, errors.dsCRM && styles.inputError]}
                  placeholder="CRM/UF 123456"
                  value={formData.dsCRM}
                  maxLength={15}
                  onChangeText={handleCRM}
                  autoCapitalize="characters"
                  returnKeyType="next"
                />
                {errors.dsCRM && <Text style={styles.errorText}>{errors.dsCRM}</Text>}
              </View>
            </View>

            {/* --- CONTATO E STATUS --- */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contato e Status</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email *</Text>
                <TextInput
                  style={[styles.textInput, errors.dsEmail && styles.inputError]}
                  placeholder="exemplo@email.com"
                  value={formData.dsEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={(t) => updateField("dsEmail", t)}
                  returnKeyType="next"
                />
                {errors.dsEmail && <Text style={styles.errorText}>{errors.dsEmail}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Situação</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={formData.situacao}
                    onValueChange={(val) => updateField("situacao", val)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Ativo" value="Ativo" />
                    <Picker.Item label="Inativo" value="Inativo" />
                  </Picker>
                </View>
              </View>
            </View>

            {/* --- BOTÕES --- */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={[styles.cancelButton, loading && styles.buttonDisabled]}
                onPress={handleCancelar}
                disabled={loading}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
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
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
        />
      )}

      <MessageModal
        visible={modalVisible}
        message={modalMessage}
        type={modalType}
        onClose={handleModalClose}
      />
    </>
  );
}
