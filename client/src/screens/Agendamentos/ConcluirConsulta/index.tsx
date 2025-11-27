import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "./styles";

import { consultaService } from "../../../services/consulta.service";
import { concluirAgendamento } from "../../../services/agendamentos.service"; 

export function ConcluirConsultaScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { consulta } = route.params;

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    diagnostico: "",
    examesSolicitados: "",
    medicacaoPrescrita: "",
    observacoesMedicas: "",
    procedimentoRealizado: "",
    dataConclusao: new Date().toISOString(),
    medicoResponsavel: "Dra. Gabriela Borba"
  });

  useEffect(() => {
    if (consulta?.informacoesConsulta) {
      const info = consulta.informacoesConsulta;
      setFormData({
        diagnostico: info.diagnostico || "",
        examesSolicitados: info.examesSolicitados || "",
        medicacaoPrescrita: info.medicacaoPrescrita || "",
        observacoesMedicas: info.observacoesMedicas || "",
        procedimentoRealizado: info.procedimentoRealizado || "",
        dataConclusao: info.dataConclusao || new Date().toISOString(),
        medicoResponsavel: info.medicoResponsavel || "Dra. Gabriela Borba"
      });
    }
  }, [consulta]);

  const handleSave = async () => {
    if (!formData.diagnostico) {
      Alert.alert("Atenção", "Por favor, preencha o diagnóstico.");
      return;
    }

    setLoading(true);

    try {
      const consultaData = {
        cpfPaciente: consulta.cpf || "",
        nomePaciente: consulta.paciente || "",
        agendamentoId: consulta.id || "",
        tipo: consulta.tipo || "Consulta",
        dataConsulta: consulta.data || "",
        horaInicio: consulta.horaInicio || "",
        horaFim: consulta.horaFim || "",
        medicoId: consulta.medicoId || "3xNYnVrFLiSeicunqkH",
        nomeMedico: formData.medicoResponsavel || "",
        diagnostico: formData.diagnostico,
        examesSolicitados: formData.examesSolicitados || "",
        medicacaoPrescrita: formData.medicacaoPrescrita || "",
        observacoesMedicas: formData.observacoesMedicas || "",
        procedimentoRealizado: formData.procedimentoRealizado || "",
        status: "Concluido",
        criadoEm: new Date().toISOString(),
        dataConclusao: formData.dataConclusao,
        pacienteId: consulta.pacienteId || "", // 
      };

      // 🔹 Salva a consulta concluída
      await consultaService.concluirConsulta(consultaData);

      // 🔹 Atualiza o agendamento para concluído
      if (consulta.id) {
        await concluirAgendamento(consulta.id);
      }

      Alert.alert(
        "Sucesso",
        "Consulta concluída e agendamento atualizado!",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("Tabs", {
                screen: "Agendamentos"
              });
            }
          }
        ]
      );

    } catch (error) {
      console.error("Erro ao salvar consulta:", error);
      Alert.alert("Erro", "Não foi possível salvar a consulta.");
    } finally {
      setLoading(false);
    }
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
        <View style={styles.patientCard}>
          <Text style={styles.patientName}>{consulta.paciente}</Text>
          <Text style={styles.consultInfo}>
            {consulta.data} • {consulta.horaInicio} - {consulta.horaFim}
          </Text>
          <Text style={styles.consultType}>{consulta.tipo}</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Diagnóstico *</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Descreva o diagnóstico principal..."
              placeholderTextColor="#A0AEC0"
              value={formData.diagnostico}
              onChangeText={(t) => setFormData({ ...formData, diagnostico: t })}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Exames Solicitados</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Liste os exames solicitados..."
              placeholderTextColor="#A0AEC0"
              value={formData.examesSolicitados}
              onChangeText={(t) => setFormData({ ...formData, examesSolicitados: t })}
              multiline
              textAlignVertical="top"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Medicação Prescrita</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Nome, dosagem e frequência..."
              placeholderTextColor="#A0AEC0"
              value={formData.medicacaoPrescrita}
              onChangeText={(t) => setFormData({ ...formData, medicacaoPrescrita: t })}
              multiline
              textAlignVertical="top"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Procedimentos Realizados</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Descreva os procedimentos..."
              placeholderTextColor="#A0AEC0"
              value={formData.procedimentoRealizado}
              onChangeText={(t) => setFormData({ ...formData, procedimentoRealizado: t })}
              multiline
              textAlignVertical="top"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Observações Médicas</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Observações e recomendações..."
              placeholderTextColor="#a0aec04f"
              value={formData.observacoesMedicas}
              onChangeText={(t) => setFormData({ ...formData, observacoesMedicas: t })}
              multiline
              textAlignVertical="top"
            />
          </View>

          <View style={styles.autoInfoSection}>
            <Text style={styles.autoInfoTitle}>Informações Automáticas</Text>

            <View style={styles.autoInfoRow}>
              <Text style={styles.autoInfoLabel}>Data de Conclusão:</Text>
              <Text style={styles.autoInfoValue}>
                {new Date(formData.dataConclusao).toLocaleDateString("pt-BR")}
              </Text>
            </View>

            <View style={styles.autoInfoRow}>
              <Text style={styles.autoInfoLabel}>Médico Responsável:</Text>
              <Text style={styles.autoInfoValue}>{formData.medicoResponsavel}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.saveButton,
            (!formData.diagnostico || loading) && styles.saveButtonDisabled
          ]}
          onPress={handleSave}
          disabled={!formData.diagnostico || loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Salvar Conclusão</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
