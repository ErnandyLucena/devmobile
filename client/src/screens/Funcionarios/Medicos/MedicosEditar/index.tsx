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
  Alert
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "./styles";

export default function MedicosEditarScreen() {
  const navigation = useNavigation();
  const  route  = useRoute();
  const { medico } = route.params;

  const [formData, setFormData] = useState({
    nmPrestador: medico.nmPrestador || "",
    especialidade: medico.especialidade || "",
    dsEmail: medico.dsEmail || "",
    nmMnemonico: medico.nmMnemonico || "",
    dsCodigoConselho: medico.dsCodigoConselho || "",
    dsCRM: medico.dsCRM || "",
    situacao: medico.situacao || "Ativo"
  });

  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpa o erro do campo quando o usuário começa a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSalvar = () => {
    const newErrors = {};
    if (!formData.nmPrestador.trim()) newErrors.nmPrestador = "Nome é obrigatório";
    if (!formData.especialidade.trim()) newErrors.especialidade = "Especialidade é obrigatória";
    if (!formData.dsEmail.trim()) newErrors.dsEmail = "Email é obrigatório";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Alert.alert("Atenção", "Preencha os campos obrigatórios!");
      return;
    }

    // Aqui você implementaria a lógica de atualização na API
    console.log("Dados atualizados:", formData);
    Alert.alert("Sucesso", "Médico atualizado com sucesso!");
    navigation.goBack();
  };

  const handleCancelar = () => {
    navigation.goBack();
  };

  const isFormValid = formData.nmPrestador.trim() && 
                     formData.especialidade.trim() && 
                     formData.dsEmail.trim();

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
                value={formData.nmPrestador}
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
                value={formData.nmMnemonico}
                onChangeText={(text) => updateField("nmMnemonico", text)}
                returnKeyType="next"
              />
            </View>
          </View>

          {/* Seção de Registro Profissional */}
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

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Código Conselho</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Digite o código do conselho"
                placeholderTextColor="#A0AEC0"
                value={formData.dsCodigoConselho}
                onChangeText={(text) => updateField("dsCodigoConselho", text)}
                keyboardType="numeric"
                returnKeyType="next"
              />
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
                value={formData.dsEmail}
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
                placeholder="Ex: Ativo, Disponível, etc."
                placeholderTextColor="#A0AEC0"
                value={formData.situacao}
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
                {!isFormValid ? "Preencha os campos" : "Salvar Alterações"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

