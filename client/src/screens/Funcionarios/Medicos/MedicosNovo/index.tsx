import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../../../../components/Header"; 
import { styles } from "./styles";

export function MedicoNovoScreen() {
  const navigation = useNavigation();

  const [form, setForm] = useState({
    nmPrestador: "",
    nmMnemonico: "",
    dsCodigoConselho: "",
    dsCRM: "",
    dsEmail: "",
    especialidade: "",
    situacao: "",
  });

  const [errors, setErrors] = useState({});

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Limpa o erro do campo quando o usuário começa a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSalvar = () => {
    const newErrors = {};
    if (!form.nmPrestador.trim()) newErrors.nmPrestador = "Nome é obrigatório";
    if (!form.dsCRM.trim()) newErrors.dsCRM = "CRM é obrigatório";
    if (!form.dsEmail.trim()) newErrors.dsEmail = "Email é obrigatório";
    if (!form.especialidade.trim()) newErrors.especialidade = "Especialidade é obrigatória";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Alert.alert("Atenção", "Preencha os campos obrigatórios!");
      return;
    }

    console.log("Novo médico:", form);
    Alert.alert("Sucesso", "Médico cadastrado com sucesso!");
    navigation.goBack();
  };

  const handleCancelar = () => {
    navigation.goBack();
  };

  const isFormValid = form.nmPrestador.trim() && form.dsCRM.trim() && 
                     form.dsEmail.trim() && form.especialidade.trim();

  return (
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


        {/* Formulário */}
        <View style={styles.form}>
          {/* Seção de Informações Pessoais */}
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

          {/* Seção de Registro Profissional */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Registro Profissional</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Código Conselho</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Digite o código do conselho"
                placeholderTextColor="#A0AEC0"
                value={form.dsCodigoConselho}
                onChangeText={(text) => updateField("dsCodigoConselho", text)}
                keyboardType="numeric"
                returnKeyType="next"
              />
            </View>

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

          {/* Seção de Contato e Status */}
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
                placeholder="Ex: Disponível, Ativo, etc."
                placeholderTextColor="#A0AEC0"
                value={form.situacao}
                onChangeText={(text) => updateField("situacao", text)}
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
                {!isFormValid ? "Preencha os campos" : "Cadastrar Médico"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}