import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { consultaService } from "../../../services/consulta.service";
import { styles } from "./styles";
import { atualizarAgendamento } from "../../../services/agendamentos.service";
import { useAuth } from "../../../context/auth/AuthContext";
import MessageModal from "../../../components/MessageContext/MessageContext"; 
import ConfirmationModal from "../../../components/ConfirmationModal"; 

export default function ConcluirConsultaScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useAuth();

  const { consulta } = route.params || {};

  const [loading, setLoading] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"success" | "error" | "warning" | "info">("info");

  const [diagnostico, setDiagnostico] = useState("");
  const [procedimento, setProcedimento] = useState("");
  const [medicacao, setMedicacao] = useState("");
  const [exames, setExames] = useState("");
  const [observacoes, setObservacoes] = useState("");

  // 🔥 Dados do paciente vindos do agendamento
  const pacienteId = consulta?.pacienteId || "";
  const nomePaciente =
    consulta?.nomePaciente ||
    consulta?.paciente?.nome ||
    "Paciente não informado";

  const cpfPaciente =
    consulta?.cpfPaciente ||
    consulta?.paciente?.cpf ||
    "";

  useEffect(() => {
    console.log("CONSULTA RECEBIDA:", consulta);
    console.log("USUÁRIO LOGADO:", user);
  }, []);

  const showMessage = (message: string, type: "success" | "error" | "warning" | "info") => {
    setModalMessage(message);
    setModalType(type);
    setShowMessageModal(true);
  };

  const showConfirmation = () => {
    setShowConfirmationModal(true);
  };

  const handleConfirmConcluir = async () => {
    setShowConfirmationModal(false);
    
    if (!diagnostico.trim()) {
      showMessage("Insira o diagnóstico antes de concluir.", "warning");
      return;
    }

    if (!cpfPaciente) {
      showMessage("CPF do paciente não encontrado!", "error");
      return;
    }

    setLoading(true);

    // 🔥 Nome REAL do médico vindo do Firestore
    const nomeMedicoFinal =
      user?.nmPrestador ||
      user?.nmMnemonico ||
      "Médico não informado";

    const data = {
      tipo: "Consulta",
      status: "Concluido",

      diagnostico,
      procedimentoRealizado: procedimento,
      medicacaoPrescrita: medicacao,
      examesSolicitados: exames,
      observacoesMedicas: observacoes,

      agendamentoId: consulta?.id || null,
      pacienteId,
      nomePaciente,
      cpfPaciente: cpfPaciente.replace(/\D/g, ""),

      medicoId: user.uid,
      nomeMedico: nomeMedicoFinal,
      especialidadeMedico: user.especialidade || "Não informada",

      dataConsulta: consulta?.data || null,
      horaInicio: consulta?.horaInicio || null,
      horaFim: consulta?.horaFim || null,

      criadoEm: new Date().toISOString(),
      dataConclusao: new Date().toISOString(),
    };

    Object.keys(data).forEach((k) => {
      if (data[k] === undefined) delete data[k];
    });

    console.log("🔍 ENVIANDO PARA FIRESTORE:", data);

    try {
      // 1️⃣ Salvar consulta
      const result = await consultaService.concluirConsulta(data);

      if (!result.success) {
        setLoading(false);
        showMessage("Não foi possível salvar a consulta. Verifique os dados.", "error");
        return;
      }

      // 2️⃣ Atualizar agendamento
      await atualizarAgendamento(consulta.id, { status: "Concluido" });

      setLoading(false);
      
      showMessage("Consulta concluída com sucesso!", "success");
      
      // Navegar de volta após sucesso
      setTimeout(() => {
        navigation.goBack();
      }, 1500);

    } catch (error) {
      setLoading(false);
      showMessage("Ocorreu um erro ao concluir a consulta.", "error");
      console.error("Erro ao concluir consulta:", error);
    }
  };

  const handleConcluir = () => {
    showConfirmation();
  };

  const handleCloseMessageModal = () => {
    setShowMessageModal(false);
  };

  const handleCancelConcluir = () => {
    setShowConfirmationModal(false);
  };

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
    <>
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
            <Text style={styles.dateTimeValue}>
              {user?.nmPrestador || user?.nmMnemonico}
            </Text>
          </View>
        </View>

        {/* ---------- FORMULÁRIO ---------- */}
        <View style={styles.form}>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Diagnóstico *</Text>
            <TextInput
              placeholder="Digite o diagnóstico"
              style={styles.textInput}
              value={diagnostico}
              onChangeText={setDiagnostico}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Procedimento realizado</Text>
            <TextInput
              placeholder="Descreva o procedimento"
              style={styles.textInput}
              value={procedimento}
              onChangeText={setProcedimento}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Medicação prescrita</Text>
            <TextInput
              placeholder="Ex: Dipirona 1x ao dia"
              style={styles.textInput}
              value={medicacao}
              onChangeText={setMedicacao}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Exames solicitados</Text>
            <TextInput
              placeholder="Ultrassom, hemograma..."
              style={styles.textInput}
              value={exames}
              onChangeText={setExames}
            />
          </View>

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

      {/* Modal de Mensagem */}
      <MessageModal
        visible={showMessageModal}
        message={modalMessage}
        type={modalType}
        onClose={handleCloseMessageModal}
      />

      {/* Modal de Confirmação */}
      <ConfirmationModal
        visible={showConfirmationModal}
        title="Confirmar Conclusão"
        message="Deseja realmente concluir esta consulta? Esta ação não pode ser desfeita."
        confirmText="Sim, Concluir"
        cancelText="Cancelar"
        type="warning"
        onConfirm={handleConfirmConcluir}
        onCancel={handleCancelConcluir}
      />
    </>
  );
}