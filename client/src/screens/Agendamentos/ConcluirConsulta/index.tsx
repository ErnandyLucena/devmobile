import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  KeyboardAvoidingView,
  Platform 
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "./styles";

export function ConcluirConsultaScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  
  const { consulta } = route.params as {
    consulta: {
      id: number;
      paciente: string;
      data: string;
      horaInicio: string;
      horaFim: string;
      status: string;
      tipo: string;
      observacoes: string;
    };
  };

  const [formData, setFormData] = useState({
    diagnostico: "",
    examesSolicitados: "",
    medicacao: "",
    observacoesMedicas: "",
    procedimentos: "",
    dataConclusao: new Date().toISOString().split('T')[0],
    medicoResponsavel: "Dr. Gabriela Borba"
  });

  const handleSave = () => {
    console.log("Dados da consulta salvos:", formData);
    
    navigation.navigate("DetalhesConsulta", { 
      consulta: {
        ...consulta,
        status: "Concluída",
        informacoesConsulta: formData
      }
    });
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
        {/* Informações do Paciente */}
        <View style={styles.patientCard}>
          <Text style={styles.patientName}>{consulta.paciente}</Text>
          <Text style={styles.consultInfo}>
            {consulta.data} • {consulta.horaInicio} - {consulta.horaFim}
          </Text>
          <Text style={styles.consultType}>{consulta.tipo}</Text>
        </View>

        {/* Formulário de Conclusão */}
        <View style={styles.form}>
          {/* Diagnóstico */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Diagnóstico *</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Descreva o diagnóstico principal..."
              placeholderTextColor="#A0AEC0"
              value={formData.diagnostico}
              onChangeText={(text) => setFormData({...formData, diagnostico: text})}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              returnKeyType="next"
            />
          </View>

          {/* Exames Solicitados */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Exames Solicitados</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Liste os exames solicitados (separados por vírgula)..."
              placeholderTextColor="#A0AEC0"
              value={formData.examesSolicitados}
              onChangeText={(text) => setFormData({...formData, examesSolicitados: text})}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              returnKeyType="next"
            />
          </View>

          {/* Medicação */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Medicação Prescrita</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Descreva a medicação prescrita (nome, dosagem, frequência)..."
              placeholderTextColor="#A0AEC0"
              value={formData.medicacao}
              onChangeText={(text) => setFormData({...formData, medicacao: text})}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              returnKeyType="next"
            />
          </View>

          {/* Procedimentos */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Procedimentos Realizados</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Descreva os procedimentos realizados durante a consulta..."
              placeholderTextColor="#A0AEC0"
              value={formData.procedimentos}
              onChangeText={(text) => setFormData({...formData, procedimentos: text})}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              returnKeyType="next"
            />
          </View>

          {/* Observações Médicas */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Observações Médicas</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Observações adicionais, recomendações, orientações ao paciente..."
              placeholderTextColor="#A0AEC0"
              value={formData.observacoesMedicas}
              onChangeText={(text) => setFormData({...formData, observacoesMedicas: text})}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              returnKeyType="done"
            />
          </View>

          {/* Informações Automáticas */}
          <View style={styles.autoInfoSection}>
            <Text style={styles.autoInfoTitle}>Informações Automáticas</Text>
            <View style={styles.autoInfoRow}>
              <Text style={styles.autoInfoLabel}>Data de Conclusão:</Text>
              <Text style={styles.autoInfoValue}>{formData.dataConclusao}</Text>
            </View>
            <View style={styles.autoInfoRow}>
              <Text style={styles.autoInfoLabel}>Médico Responsável:</Text>
              <Text style={styles.autoInfoValue}>{formData.medicoResponsavel}</Text>
            </View>
          </View>
        </View>

        {/* Botão Salvar */}
        <TouchableOpacity 
          style={[
            styles.saveButton,
            !formData.diagnostico && styles.saveButtonDisabled
          ]} 
          onPress={handleSave}
          disabled={!formData.diagnostico}
        >
          <Text style={styles.saveButtonText}>
            {formData.diagnostico ? "Salvar Conclusão" : "Preencha o diagnóstico"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}