import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles"; 

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

  const handleSalvar = () => {
    // Validação básica
    const newErrors = {};
    if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!formData.cargo.trim()) newErrors.cargo = "Cargo é obrigatório";
    if (!formData.setor.trim()) newErrors.setor = "Setor é obrigatório";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    alert("Funcionário cadastrado com sucesso!");
    navigation.goBack();
  };

  const handleCancelar = () => {
    navigation.goBack();
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpa o erro do campo quando o usuário começa a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const isFormValid = formData.nome.trim() && formData.cargo.trim() && formData.setor.trim();

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
          {/* Seção de Informações Pessoais */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informações Pessoais</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nome Completo *</Text>
              <TextInput
                placeholder="Digite o nome completo"
                placeholderTextColor="#A0AEC0"
                value={formData.nome}
                onChangeText={(text) => updateField("nome", text)}
                style={[
                  styles.textInput,
                  errors.nome && styles.inputError
                ]}
                returnKeyType="next"
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
                returnKeyType="next"
              />
            </View>
          </View>

          {/* Seção de Dados Profissionais */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dados Profissionais</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Cargo *</Text>
              <TextInput
                placeholder="Digite o cargo"
                placeholderTextColor="#A0AEC0"
                value={formData.cargo}
                onChangeText={(text) => updateField("cargo", text)}
                style={[
                  styles.textInput,
                  errors.cargo && styles.inputError
                ]}
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
                style={[
                  styles.textInput,
                  errors.setor && styles.inputError
                ]}
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
                onChangeText={(text) => updateField("dataAdmissao", text)}
                style={styles.textInput}
                keyboardType="numbers-and-punctuation"
                returnKeyType="next"
              />
            </View>
          </View>

          {/* Seção de Contato */}
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
                autoCapitalize="none"
                returnKeyType="next"
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
                returnKeyType="done"
              />
            </View>
          </View>

          {/* Botões de Ação */}
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

