import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";

// 🔥 Importa o service
import { cadastrarFuncionario } from "../../../../services/funcionario.service";

export default function FuncNovoScreen({ navigation }) {

  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    cargo: "",
    setor: "",
    email: "",
    telefone: "",
    dataAdmissao: ""
  });

  const [errors, setErrors] = useState({});

  // Atualiza campo
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  // ------------------------------
  // SALVAR NO FIRESTORE
  // ------------------------------
  const handleSalvar = async () => {

    const newErrors = {};
    if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!formData.cargo.trim()) newErrors.cargo = "Cargo é obrigatório";
    if (!formData.setor.trim()) newErrors.setor = "Setor é obrigatório";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    // Converte AAAA-MM-DD para Date sem quebrar
    const parseDate = (value) => {
      if (!value || value.length !== 10) return null;
      const [year, month, day] = value.split("-");
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
        situacao: ["Ativo"], // padrão igual ao Firestore
        dataAdmissao: parseDate(formData.dataAdmissao),

      };

      const result = await cadastrarFuncionario(dataToSend);

      if (result.success) {
        Alert.alert("Sucesso", "Funcionário cadastrado com sucesso!");
        navigation.goBack();
      } else {
        Alert.alert("Erro", "Falha ao cadastrar funcionário.");
      }

    } catch (err) {
      console.log("Erro ao cadastrar funcionário:", err);
      Alert.alert("Erro", "Ocorreu um erro ao salvar.");
    }
  };

  const handleCancelar = () => {
    navigation.goBack();
  };

  const isFormValid =
    formData.nome.trim() &&
    formData.cargo.trim() &&
    formData.setor.trim();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* Formulário */}
        <View style={styles.form}>

          {/* Seção Info Pessoais */}
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
                placeholder="Digite o CPF"
                placeholderTextColor="#A0AEC0"
                value={formData.cpf}
                onChangeText={(text) => updateField("cpf", text)}
                style={styles.textInput}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Seção Profissional */}
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
              <TextInput
                placeholder="AAAA-MM-DD"
                placeholderTextColor="#A0AEC0"
                value={formData.dataAdmissao}
                onChangeText={(text) => updateField("dataAdmissao", text)}
                style={styles.textInput}
              />
            </View>
          </View>

          {/* Contato */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informações de Contato</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>E-mail</Text>
              <TextInput
                placeholder="Digite o e-mail"
                placeholderTextColor="#A0AEC0"
                value={formData.email}
                onChangeText={(text) => updateField("email", text)}
                style={styles.textInput}
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Telefone</Text>
              <TextInput
                placeholder="Digite o telefone"
                placeholderTextColor="#A0AEC0"
                value={formData.telefone}
                onChangeText={(text) => updateField("telefone", text)}
                style={styles.textInput}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Botões */}
          <View style={styles.actionsContainer}>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancelar}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.saveButton,
                !isFormValid && styles.saveButtonDisabled
              ]}
              onPress={handleSalvar}
              disabled={!isFormValid}
            >
              <Text style={styles.saveButtonText}>
                {!isFormValid ? "Preencha os campos" : "Cadastrar Funcionário"}
              </Text>
            </TouchableOpacity>

          </View>

        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}
