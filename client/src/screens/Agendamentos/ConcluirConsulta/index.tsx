import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { consultaService } from "../../../services/consulta.service";
import { styles } from "./styles";
import { atualizarAgendamento } from "../../../services/agendamentos.service";
import { useAuth } from "../../../context/auth/AuthContext";

export default function ConcluirConsultaScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useAuth();

  const { consulta } = route.params || {};

  const [loading, setLoading] = useState(false);

  const [diagnostico, setDiagnostico] = useState("");
  const [procedimento, setProcedimento] = useState("");
  const [medicacao, setMedicacao] = useState("");
  const [exames, setExames] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const pacienteId = consulta?.pacienteId || "";
  const nomePaciente = consulta?.nomePaciente || consulta?.paciente?.nome || "";
  const cpfPaciente = consulta?.cpfPaciente || consulta?.paciente?.cpf || "";

  const medicoId = consulta?.medicoId || "";
  const nomeMedico = consulta?.nomeMedico || "";

  useEffect(() => {
    console.log("CONSULTA RECEBIDA:", consulta);
  }, []);

  async function handleConcluir() {
    if (!diagnostico.trim()) {
      Alert.alert("Atenção", "Insira o diagnóstico antes de concluir.");
      return;
    }

    if (!cpfPaciente) {
      Alert.alert("Erro", "CPF do paciente não encontrado!");
      return;
    }

    setLoading(true);

    const data = {
      tipo: "Consulta",
      status: "Concluido",

      diagnostico,
      procedimentoRealizado: procedimento,
      medicacaoPrescrita: medicacao,
      examesSolicitados: exames,
      observacoesMedicas: observacoes,

      agendamentoId: consulta?.id,
      pacienteId,
      nomePaciente,
      cpfPaciente: cpfPaciente.replace(/\D/g, ""),

      medicoId: user.uid,
      nomeMedico: user.nomeCompleto,
      especialidadeMedico: user.especialidade || "Não informada",

      dataConsulta: consulta?.data || null,
      horaInicio: consulta?.horaInicio || null,
      horaFim: consulta?.horaFim || null,

      criadoEm: new Date().toISOString(),
      dataConclusao: new Date().toISOString(),
    };


    // 1️⃣ Salva consulta
    const result = await consultaService.concluirConsulta(data);

    if (!result.success) {
      setLoading(false);
      Alert.alert("Erro", "Não foi possível salvar a consulta.");
      return;
    }

    // 2️⃣ Atualiza agendamento
    await atualizarAgendamento(consulta.id, {
      status: "Concluido",
    });

    setLoading(false);

    Alert.alert("Sucesso", "Consulta concluída com sucesso!", [
      { text: "OK", onPress: () => navigation.goBack() }
    ]);
  }

  if (user?.tipo !== "medico") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 18, color: "#555", textAlign: "center" }}>
          Apenas médicos podem concluir consultas.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>

      {/* ---------- CARD DO PACIENTE ---------- */}
      <View style={styles.patientCard}>
        <Text style={styles.patientName}>{nomePaciente}</Text>

        <View style={{ marginTop: 6 }}>
          <Text style={styles.dateTimeLabel}>CPF</Text>
          <Text style={styles.dateTimeValue}>{cpfPaciente}</Text>
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={styles.dateTimeLabel}>Médico</Text>
          <Text style={styles.dateTimeValue}>{nomeMedico}</Text>
        </View>
      </View>

      {/* ---------- FORMULÁRIO ---------- */}
      <View style={styles.form}>

        {/* Diagnóstico */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Diagnóstico *</Text>
          <TextInput
            placeholder="Digite o diagnóstico"
            style={styles.textInput}
            value={diagnostico}
            onChangeText={setDiagnostico}
          />
        </View>

        {/* Procedimento */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Procedimento realizado</Text>
          <TextInput
            placeholder="Descreva o procedimento"
            style={styles.textInput}
            value={procedimento}
            onChangeText={setProcedimento}
          />
        </View>

        {/* Medicação */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Medicação prescrita</Text>
          <TextInput
            placeholder="Ex: Dipirona 1x ao dia"
            style={styles.textInput}
            value={medicacao}
            onChangeText={setMedicacao}
          />
        </View>

        {/* Exames */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Exames solicitados</Text>
          <TextInput
            placeholder="Ultrassom, hemograma..."
            style={styles.textInput}
            value={exames}
            onChangeText={setExames}
          />
        </View>

        {/* Observações */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Observações médicas</Text>
          <TextInput
            placeholder="Observações adicionais"
            style={[styles.textInput, styles.textArea]}
            multiline
            value={observacoes}
            onChangeText={setObservacoes}
          />
        </View>

      </View>

      {/* ---------- BOTÃO ---------- */}
      <TouchableOpacity
        style={[styles.saveButton, loading && styles.saveButtonDisabled]}
        onPress={handleConcluir}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.saveButtonText}>Concluir Consulta</Text>
        )}
      </TouchableOpacity>

    </ScrollView>
  );
}
