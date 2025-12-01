import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { styles } from "./styles";
import { atualizarAgendamento, getAgendamentoById, excluirAgendamento } from "../../../services/agendamentos.service";
import { getPacienteByCpf } from "../../../services/pacientes.service";
import MessageModal from "../../../components/MessageContext/MessageContext";
import ConfirmationModal from "../../../components/ConfirmationModal";

export function ReagendarConsultaScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  // Dados recebidos da tela de detalhes
  const { consulta } = route.params;

  const [formData, setFormData] = useState({
    data: "",
    horaInicio: "",
    horaFim: "",
    tipoAgendamento: "",
    observacoes: "",
  });

  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [excluindo, setExcluindo] = useState(false);
  const [consultaCompleta, setConsultaCompleta] = useState(null);

  // Estados para o MessageModal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"success" | "error" | "warning" | "info">("info");

  // Estados para o ConfirmationModal
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [confirmationTitle, setConfirmationTitle] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [confirmationType, setConfirmationType] = useState<"warning" | "danger" | "info">("warning");

  useEffect(() => {
    carregarDadosConsulta();
  }, [consulta]);

  const carregarDadosConsulta = async () => {
    try {
      setLoading(true);

      if (consulta.id) {
        const consultaData = await getAgendamentoById(consulta.id);
        if (consultaData) {
          setConsultaCompleta(consultaData);

          setFormData({
            data: formatarDataParaInput(consultaData.data),
            horaInicio: formatarHoraParaInput(consultaData.horaInicio),
            horaFim: formatarHoraParaInput(consultaData.horaFim),
            tipoAgendamento: consultaData.tipoAgendamento || "Consulta",
            observacoes: consultaData.observacoes || "",
          });

          if (consultaData.cpfPaciente) {
            const pacienteData = await getPacienteByCpf(consultaData.cpfPaciente);
            setPaciente(pacienteData);
          }
        }
      } else {
        setConsultaCompleta(consulta);
        setFormData({
          data: consulta.data,
          horaInicio: consulta.horaInicio,
          horaFim: consulta.horaFim,
          tipoAgendamento: consulta.tipo || "Consulta",
          observacoes: consulta.observacoes || "",
        });
        setPaciente({ nome: consulta.paciente });
      }
    } catch (error) {
      console.log("Erro ao carregar dados da consulta:", error);
      showModal("Não foi possível carregar os dados da consulta", "error");
    } finally {
      setLoading(false);
    }
  };

  const showModal = (message: string, type: "success" | "error" | "warning" | "info" = "info") => {
    setModalMessage(message);
    setModalType(type);
    setModalVisible(true);
  };

  const showConfirmationModal = (
    title: string,
    message: string,
    type: "warning" | "danger" | "info" = "warning"
  ) => {
    setConfirmationTitle(title);
    setConfirmationMessage(message);
    setConfirmationType(type);
    setConfirmationVisible(true);
  };

  const closeModal = () => setModalVisible(false);
  const closeConfirmationModal = () => setConfirmationVisible(false);

  const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const formatarDataParaInput = (dataString) => {
    if (!dataString) return "";
    try {
      const data = new Date(dataString);
      return data.toISOString().split('T')[0];
    } catch {
      return dataString;
    }
  };

  const formatarHoraParaInput = (horaString) => {
    if (!horaString) return "";
    try {
      const data = new Date(horaString);
      return data.toTimeString().slice(0, 5);
    } catch {
      return horaString;
    }
  };

  const formatarDataExibicao = (dataString) => {
    if (!dataString) return "Data não informada";
    try {
      const data = new Date(dataString);
      return data.toLocaleDateString('pt-BR');
    } catch {
      return dataString;
    }
  };

  const formatarHoraExibicao = (horaString) => {
    if (!horaString) return "";
    try {
      const data = new Date(horaString);
      return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    } catch {
      return horaString;
    }
  };

  const validarFormulario = () => {
    if (!formData.data) { showModal("Preencha a nova data do agendamento", "warning"); return false; }
    if (!formData.horaInicio) { showModal("Preencha a nova hora de início", "warning"); return false; }
    if (!formData.horaFim) { showModal("Preencha a nova hora de fim", "warning"); return false; }

    const novaData = new Date(formData.data);
    const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
    if (novaData < hoje) { showModal("Não é possível reagendar para datas passadas", "warning"); return false; }

    if (formData.horaInicio >= formData.horaFim) { showModal("A hora de fim deve ser após a hora de início", "warning"); return false; }

    return true;
  };

  const handleExcluirConsulta = async () => {
    setExcluindo(true);
    try {
      const resultado = await excluirAgendamento(consulta.id);
      if (resultado.success) {
        showModal("Consulta excluída com sucesso!", "success");
        setTimeout(() => navigation.goBack(), 1500);
      } else {
        throw new Error(resultado.error);
      }
    } catch (error) {
      console.log("Erro ao excluir consulta:", error);
      showModal("Não foi possível excluir a consulta. Tente novamente.", "error");
    } finally {
      setExcluindo(false);
      closeConfirmationModal();
    }
  };

  const solicitarExclusaoConsulta = () => {
    showConfirmationModal(
      "Excluir Consulta",
      `Tem certeza que deseja excluir a consulta do paciente ${paciente?.nome || consulta.paciente}?\n\nEsta ação não pode ser desfeita.`,
      "danger"
    );
  };

  const handleReagendar = async () => {
    if (!validarFormulario()) return;

    setSalvando(true);
    try {
      const dadosAtualizados = {
        data: new Date(formData.data).toISOString(),
        horaInicio: new Date(`2000-01-01T${formData.horaInicio}`).toISOString(),
        horaFim: new Date(`2000-01-01T${formData.horaFim}`).toISOString(),
        tipoAgendamento: formData.tipoAgendamento,
        observacoes: formData.observacoes,
        status: "Confirmado",
        reagendadoEm: new Date().toISOString(),
      };

      const resultado = await atualizarAgendamento(consulta.id, dadosAtualizados);

      if (resultado.success) {
        showModal("Consulta reagendada com sucesso!", "success");
      } else {
        throw new Error(resultado.error);
      }
    } catch (error) {
      console.log("Erro ao reagendar consulta:", error);
      showModal("Não foi possível reagendar a consulta. Tente novamente.", "error");
    } finally {
      setSalvando(false);
    }
  };

  const handleModalClose = () => {
    closeModal();
    if (modalType === "success") navigation.goBack();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2B5BFF" />
        <Text style={styles.loadingText}>Carregando dados da consulta...</Text>
      </View>
    );
  }

  return (
    <>
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
          <View style={styles.form}>
            {/* Informações do Paciente */}
            <View style={styles.patientCard}>
              <Text style={styles.patientName}>
                {paciente?.nome || consulta.paciente || "Paciente não encontrado"}
              </Text>
              <Text style={styles.consultInfo}>
                <Ionicons name="calendar-outline" size={14} color="#718096" />
                {" "}Consulta atual: {formatarDataExibicao(consultaCompleta?.data)} • {formatarHoraExibicao(consultaCompleta?.horaInicio)} - {formatarHoraExibicao(consultaCompleta?.horaFim)}
              </Text>
              <Text style={styles.consultType}>
                <Ionicons name="medical-outline" size={14} color="#718096" />
                {" "}Tipo: {consultaCompleta?.tipoAgendamento || consulta.tipo}
              </Text>
            </View>

            {/* Campos de formulário */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nova Data *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#A0AEC0"
                value={formData.data}
                onChangeText={(text) => updateField("data", text)}
                returnKeyType="next"
              />
              <Text style={styles.helperText}>Formato: AAAA-MM-DD (ex: 2024-12-25)</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nova Hora Início *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="HH:MM"
                placeholderTextColor="#A0AEC0"
                value={formData.horaInicio}
                onChangeText={(text) => updateField("horaInicio", text)}
                returnKeyType="next"
              />
              <Text style={styles.helperText}>Formato: 24 horas (ex: 14:30)</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nova Hora Fim *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="HH:MM"
                placeholderTextColor="#A0AEC0"
                value={formData.horaFim}
                onChangeText={(text) => updateField("horaFim", text)}
                returnKeyType="next"
              />
              <Text style={styles.helperText}>Formato: 24 horas (ex: 15:30)</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Tipo de Consulta</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Tipo da consulta"
                placeholderTextColor="#A0AEC0"
                value={formData.tipoAgendamento}
                onChangeText={(text) => updateField("tipoAgendamento", text)}
                returnKeyType="next"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Observações do Reagendamento</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Observações sobre o reagendamento..."
                placeholderTextColor="#A0AEC0"
                multiline
                numberOfLines={4}
                value={formData.observacoes}
                onChangeText={(text) => updateField("observacoes", text)}
                textAlignVertical="top"
                returnKeyType="done"
              />
              <Text style={styles.helperText}>
                Observação original: {consultaCompleta?.observacoes || "Nenhuma"}
              </Text>
            </View>

            {/* Botões */}
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[styles.dangerButton, excluindo && styles.buttonDisabled]}
                onPress={solicitarExclusaoConsulta}
                disabled={excluindo}
              >
                {excluindo ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <>
                    <Ionicons name="trash-outline" size={16} color="#FFFFFF" />
                    <Text style={styles.dangerButtonText}> Excluir</Text>
                  </>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.saveButton,
                  (!formData.data || !formData.horaInicio || !formData.horaFim) &&
                  styles.saveButtonDisabled
                ]}
                onPress={handleReagendar}
                disabled={!formData.data || !formData.horaInicio || !formData.horaFim || salvando}
              >
                {salvando ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={styles.saveButtonText}>Salvar Reagendamento</Text>
                )}
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

      <ConfirmationModal
        visible={confirmationVisible}
        title={confirmationTitle}
        message={confirmationMessage}
        type={confirmationType}
        confirmText={excluindo ? "Excluindo..." : "Excluir"}
        cancelText="Cancelar"
        onConfirm={handleExcluirConsulta}
        onCancel={closeConfirmationModal}
      />
    </>
  );
}
