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
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "./styles";
import { updateFuncionario } from "../../../../services/funcionario.service";

export default function FuncEditarScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const { funcionario } = route.params as {
    funcionario: {
      idFuncionario: number;
      nome: string;
      cargo: string;
      setor: string;
      status: string;
      email?: string;
      telefone?: string;
      cpf?: string;
    };
  };

  const [formData, setFormData] = useState({
    nome: funcionario.nome,
    cargo: funcionario.cargo,
    setor: funcionario.setor,
    status: funcionario.status,
    email: funcionario.email || "",
    telefone: funcionario.telefone || "",
    cpf: funcionario.cpf || ""
  });

  const handleSalvar = async () => {
    const result = await updateFuncionario(funcionario.idFuncionario, formData);

    if (!result.success) {
      alert("Erro ao salvar");
      return;
    }

    alert("Atualizado com sucesso!");

    // Dispara atualização para a tela anterior (FuncDetalhes ou FuncList)
    navigation.navigate("FuncList", { updated: true });
  };

  const handleCancelar = () => {
    // Simplesmente volta para a tela anterior sem salvar
    navigation.goBack();
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
        keyboardShouldPersistTaps="handled"
      >
        {/* Formulário */}
        <View style={styles.form}>
          {/* Informações Básicas */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informações Básicas</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nome Completo *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Digite o nome completo"
                placeholderTextColor="#A0AEC0"
                value={formData.nome}
                onChangeText={(text) => updateField("nome", text)}
                returnKeyType="next"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Cargo *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Digite o cargo"
                placeholderTextColor="#A0AEC0"
                value={formData.cargo}
                onChangeText={(text) => updateField("cargo", text)}
                returnKeyType="next"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Setor *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Digite o setor"
                placeholderTextColor="#A0AEC0"
                value={formData.setor}
                onChangeText={(text) => updateField("setor", text)}
                returnKeyType="next"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Status *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Ativo ou Inativo"
                placeholderTextColor="#A0AEC0"
                value={formData.status}
                onChangeText={(text) => updateField("status", text)}
                returnKeyType="next"
              />
            </View>
          </View>

          {/* Informações de Contato */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informações de Contato</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Digite o email"
                placeholderTextColor="#A0AEC0"
                value={formData.email}
                onChangeText={(text) => updateField("email", text)}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Telefone</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Digite o telefone"
                placeholderTextColor="#A0AEC0"
                value={formData.telefone}
                onChangeText={(text) => updateField("telefone", text)}
                keyboardType="phone-pad"
                returnKeyType="next"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>CPF</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Digite o CPF"
                placeholderTextColor="#A0AEC0"
                value={formData.cpf}
                onChangeText={(text) => updateField("cpf", text)}
                keyboardType="numeric"
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
              style={[styles.saveButton, !formData.nome || !formData.cargo || !formData.setor || !formData.status && styles.saveButtonDisabled]}
              onPress={handleSalvar}
              disabled={!formData.nome || !formData.cargo || !formData.setor || !formData.status}
            >
              <Text style={styles.saveButtonText}>
                {(!formData.nome || !formData.cargo || !formData.setor || !formData.status) ? "Preencha os campos obrigatórios" : "Salvar Alterações"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
