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
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { cadastrarMedico } from "../../../../services/medicos.service";
import MessageModal from "../../../../components/MessageContext/MessageContext";
import DateTimePicker from "@react-native-community/datetimepicker";

export function MedicoNovoScreen() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("info");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [form, setForm] = useState({
    nmPrestador: "",
    nmMnemonico: "",
    dsCRM: "",
    dsEmail: "",
    cpf: "",
    especialidade: "",
    tel: "",
    dataAdmissao: "",
    situacao: "Ativo"
  });

  const [errors, setErrors] = useState({});

  // ========================
  // MODAL
  // ========================

  const showModal = (message, type = "info") => {
    setModalMessage(message);
    setModalType(type);
    setModalVisible(true);
  };

  const hideModal = () => setModalVisible(false);

  const handleModalClose = () => {
    hideModal();
    if (modalType === "success") navigation.goBack();
  };

  // ========================
  // CAMPOS
  // ========================

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    if (errors[field])
      setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // ========================
  // FORMATADORES
  // ========================

  const formatCPF = (text) => {
    const numbers = text.replace(/\D/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6)
      return numbers.replace(/(\d{3})(\d{0,3})/, "$1.$2");
    if (numbers.length <= 9)
      return numbers.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
    return numbers.replace(
      /(\d{3})(\d{3})(\d{3})(\d{0,2})/,
      "$1.$2.$3-$4"
    );
  };

  const handleCPFChange = (t) => updateField("cpf", formatCPF(t));

  // ---- CRM FINAL ----
  const formatCRM = (value) => {
    const cleaned = value.replace(/[^\dA-Za-z]/g, "").toUpperCase();

    const part1 = cleaned.substring(0, 3); // CRM
    const part2 = cleaned.substring(3, 5); // UF
    const number = cleaned.substring(5);  // Número

    let formatted = part1;
    if (part2) formatted += `/${part2}`;
    if (number) formatted += ` ${number}`;

    return formatted;
  };

  const handleCRMChange = (t) => updateField("dsCRM", formatCRM(t));

  const formatTelefone = (text) => {
    const numbers = text.replace(/\D/g, "");
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 6)
      return numbers.replace(/(\d{2})(\d{0,4})/, "($1) $2");
    if (numbers.length <= 10)
      return numbers.replace(
        /(\d{2})(\d{4})(\d{0,4})/,
        "($1) $2-$3"
      );
    return numbers.replace(
      /(\d{2})(\d{5})(\d{0,4})/,
      "($1) $2-$3"
    );
  };

  const handleTelefoneChange = (t) =>
    updateField("tel", formatTelefone(t));

  const formatDataBR = (text) => {
    const numbers = text.replace(/\D/g, "");
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 4)
      return numbers.replace(/(\d{2})(\d{0,2})/, "$1/$2");
    return numbers.replace(
      /(\d{2})(\d{2})(\d{0,4})/,
      "$1/$2/$3"
    );
  };

  const handleDataChange = (t) =>
    updateField("dataAdmissao", formatDataBR(t));

  const handleOpenCalendar = () => setShowDatePicker(true);

  const handleDateChange = (_, selectedDate) => {
    setShowDatePicker(false);
    if (!selectedDate) return;

    const d = String(selectedDate.getDate()).padStart(2, "0");
    const m = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const y = selectedDate.getFullYear();

    updateField("dataAdmissao", `${d}/${m}/${y}`);
  };

  // ========================
  // VALIDAÇÕES
  // ========================

  const validateCPF = (cpf) => {
    if (!cpf) return true;
    const clean = cpf.replace(/\D/g, "");
    if (clean.length !== 11) return false;
    if (/^(\d)\1+$/.test(clean)) return false;
    return true;
  };

  const validateDataBR = (data) => {
    if (!data) return true;
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(data)) return false;
    const [d, m, y] = data.split("/").map(Number);
    const date = new Date(y, m - 1, d);
    return (
      date.getFullYear() === y &&
      date.getMonth() === m - 1 &&
      date.getDate() === d
    );
  };

  const validateCRM = (crm) =>
    /^[A-Za-z]{3}\/[A-Za-z]{2} \d{1,6}$/.test(crm);

  const validateForm = () => {
    const e = {};

    if (!form.nmPrestador.trim())
      e.nmPrestador = "Nome é obrigatório";

    if (!form.dsCRM.trim())
      e.dsCRM = "CRM é obrigatório";

    if (form.dsCRM && !validateCRM(form.dsCRM))
      e.dsCRM = "CRM inválido (use CRM/UF 123456)";

    if (!form.dsEmail.trim())
      e.dsEmail = "Email é obrigatório";

    if (form.dsEmail && !/\S+@\S+\.\S+/.test(form.dsEmail))
      e.dsEmail = "Email inválido";

    if (form.cpf && !validateCPF(form.cpf))
      e.cpf = "CPF inválido";

    if (!form.especialidade.trim())
      e.especialidade = "Especialidade obrigatória";

    if (form.dataAdmissao && !validateDataBR(form.dataAdmissao))
      e.dataAdmissao = "Data inválida (DD/MM/AAAA)";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ========================
  // SALVAR
  // ========================

  const handleSalvar = async () => {
    if (!validateForm()) {
      showModal("Preencha os campos obrigatórios!", "warning");
      return;
    }

    setLoading(true);

    try {
      const result = await cadastrarMedico(form);
      if (result.success) {
        showModal("Médico cadastrado com sucesso!", "success");
      } else {
        showModal("Erro ao salvar médico.", "error");
      }
    } catch (err) {
      showModal("Erro: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    if (form.nmPrestador || form.dsCRM || form.dsEmail || form.cpf) {
      showModal("Tem certeza que deseja cancelar?", "warning");
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
    form.especialidade.trim();

  // ========================
  // RENDER
  // ========================

  return (
    <>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#F7FAFC" />

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.form}>
            {/* Informações Pessoais */}
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
                  value={form.nmPrestador}
                  onChangeText={(t) => updateField("nmPrestador", t)}
                />
                {errors.nmPrestador && (
                  <Text style={styles.errorText}>{errors.nmPrestador}</Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>CPF</Text>
                <TextInput
                  style={[styles.textInput, errors.cpf && styles.inputError]}
                  placeholder="000.000.000-00"
                  value={form.cpf}
                  onChangeText={handleCPFChange}
                  keyboardType="numeric"
                />
                {errors.cpf && (
                  <Text style={styles.errorText}>{errors.cpf}</Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nome Abreviado</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Nome abreviado"
                  value={form.nmMnemonico}
                  onChangeText={(t) => updateField("nmMnemonico", t)}
                />
              </View>
            </View>

            {/* Registro Profissional */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Registro Profissional</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>CRM *</Text>
                <TextInput
                  style={[
                    styles.textInput,
                    errors.dsCRM && styles.inputError
                  ]}
                  placeholder="CRM/UF 123456"
                  value={form.dsCRM}
                  onChangeText={handleCRMChange}
                  autoCapitalize="characters"
                  maxLength={15}
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
                  value={form.especialidade}
                  onChangeText={(t) =>
                    updateField("especialidade", t)
                  }
                />
                {errors.especialidade && (
                  <Text style={styles.errorText}>
                    {errors.especialidade}
                  </Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Data de Admissão</Text>

                <View style={styles.dateInputContainer}>
                  <TextInput
                    style={[
                      styles.textInput,
                      styles.dateInput,
                      errors.dataAdmissao && styles.inputError
                    ]}
                    placeholder="DD/MM/AAAA"
                    value={form.dataAdmissao}
                    onChangeText={handleDataChange}
                    keyboardType="numeric"
                    maxLength={10}
                  />

                  <TouchableOpacity
                    style={styles.calendarButton}
                    onPress={handleOpenCalendar}
                  >
                    <Ionicons name="calendar" size={22} color="#FFF" />
                  </TouchableOpacity>
                </View>

                {errors.dataAdmissao && (
                  <Text style={styles.errorText}>
                    {errors.dataAdmissao}
                  </Text>
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
                  value={form.dsEmail}
                  onChangeText={(t) => updateField("dsEmail", t)}
                  keyboardType="email-address"
                />
                {errors.dsEmail && (
                  <Text style={styles.errorText}>{errors.dsEmail}</Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Telefone</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="(00) 00000-0000"
                  value={form.tel}
                  onChangeText={handleTelefoneChange}
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Situação *</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={form.situacao}
                    onValueChange={(v) =>
                      updateField("situacao", v)
                    }
                    style={styles.picker}
                  >
                    <Picker.Item label="Ativo" value="Ativo" />
                    <Picker.Item label="Inativo" value="Inativo" />
                  </Picker>
                </View>
              </View>
            </View>

            {/* Botões */}
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
                  Cadastrar Médico
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
        showConfirmButton={modalType === "warning"}
        onConfirm={handleConfirmCancel}
        confirmText="Sim, cancelar"
        cancelText="Continuar editando"
      />
    </>
  );
}
