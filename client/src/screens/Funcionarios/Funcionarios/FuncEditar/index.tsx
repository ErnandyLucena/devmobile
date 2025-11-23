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
import { updateFuncionario } from "../../../../services/funcionario.service";
import MessageModal from "../../../../components/MessageContext/MessageContext";

export default function FuncEditarScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { funcionario } = route.params;

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("info");

  const [formData, setFormData] = useState({
    nome: funcionario.nomeCompleto || "", 
    cargo: funcionario.cargo || "",
    setor: funcionario.setor || "",
    situacao: Array.isArray(funcionario.situacao) ? funcionario.situacao[0] : (funcionario.situacao || "Ativo"), 
    email: funcionario.email || "",
    telefone: funcionario.tel || "", 
    cpf: funcionario.cpf || "",
    dataAdmissao: funcionario.dataAdmissao || ""
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

  const formatData = (text) => {
    const numbers = text.replace(/\D/g, '');
    
    if (numbers.length <= 4) {
      return numbers;
    } else if (numbers.length <= 6) {
      return numbers.replace(/(\d{4})(\d{0,2})/, '$1-$2');
    } else {
      return numbers.replace(/(\d{4})(\d{2})(\d{0,2})/, '$1-$2-$3');
    }
  };

  const handleDataChange = (text) => {
    const formattedData = formatData(text);
    updateField("dataAdmissao", formattedData);
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

  const validateForm = () => {
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
      console.log("📌 Dados recebidos do funcionário:", funcionario);
      console.log("📌 FormData atual:", formData);

 
      const parseDate = (value) => {
        if (!value || value.length !== 10) return null;
        
  
        if (value && typeof value.toDate === 'function') {
          return value;
        }
      
        const [year, month, day] = value.split("-");
        if (year && month && day) {
          const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
          return isNaN(date.getTime()) ? null : date;
        }
        
        return null;
      };

      const dataToSend = {
        nomeCompleto: formData.nome.trim(),
        cargo: formData.cargo.trim(),
        setor: formData.setor.trim(),
        situacao: [formData.situacao], 
        email: formData.email.trim(),
        tel: formData.telefone, 
        cpf: formData.cpf,
        dataAdmissao: formData.dataAdmissao ? parseDate(formData.dataAdmissao) : null,
      };

      console.log("📌 Dados enviados para atualização:", dataToSend);

      const funcionarioId = funcionario.id || funcionario.idFuncionario;
      console.log("📌 ID do funcionário:", funcionarioId);

      if (!funcionarioId) {
        showModal("ID do funcionário não encontrado!", "error");
        setLoading(false);
        return;
      }

      const result = await updateFuncionario(funcionarioId, dataToSend);

      if (result.success) {
        showModal("Funcionário atualizado com sucesso!", "success");
      } else {
        console.log("❌ Erro do serviço:", result.error);
        showModal("Não foi possível atualizar o funcionário.", "error");
      }
    } catch (error) {
      console.log("❌ Erro ao atualizar funcionário:", error);
      showModal("Ocorreu um erro ao atualizar o funcionário.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    hideModal();
    if (modalType === "success") {
      navigation.navigate("FuncList", { updated: true });
    }
  };

  const handleCancelar = () => {
    const hasChanges = 
      formData.nome !== (funcionario.nomeCompleto || "") ||
      formData.cargo !== (funcionario.cargo || "") ||
      formData.setor !== (funcionario.setor || "") ||
      formData.situacao !== (Array.isArray(funcionario.situacao) ? funcionario.situacao[0] : (funcionario.situacao || "Ativo")) ||
      formData.email !== (funcionario.email || "") ||
      formData.telefone !== (funcionario.tel || "") || 
      formData.cpf !== (funcionario.cpf || "") ||
      formData.dataAdmissao !== (funcionario.dataAdmissao || "");

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
    formData.nome.trim() && 
    formData.cargo.trim() && 
    formData.setor.trim() &&
    (!formData.cpf.trim() || validateCPF(formData.cpf)) &&
    (!formData.email.trim() || validateEmail(formData.email));

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
                <TextInput
                  placeholder="AAAA-MM-DD"
                  placeholderTextColor="#A0AEC0"
                  value={formData.dataAdmissao}
                  onChangeText={handleDataChange}
                  style={styles.textInput}
                  keyboardType="numeric"
                  maxLength={10}
                  returnKeyType="next"
                />
              </View>

              {/* CAMPO - SITUAÇÃO */}
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