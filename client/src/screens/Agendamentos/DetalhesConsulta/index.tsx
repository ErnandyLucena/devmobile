import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "./styles";
import React, { useState, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons';
import MessageModal from "../../../components/MessageContext/MessageContext";
import ConfirmationModal from "../../../components/ConfirmationModal";
import { getAgendamentoById, excluirAgendamento, atualizarAgendamento } from "../../../services/agendamentos.service";
import { getPacienteByCpf } from "../../../services/pacientes.service";

export function DetalhesConsultaScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [excluindo, setExcluindo] = useState(false);
  const [consulta, setConsulta] = useState(null);
  const [paciente, setPaciente] = useState(null);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"success" | "error" | "warning" | "info">("info");
  const [modalAction, setModalAction] = useState<"cancelar" | "excluir" | null>(null);

  const { consultaId } = route.params;

  const showMessage = (message: string, type: "success" | "error" | "warning" | "info") => {
    setModalMessage(message);
    setModalType(type);
    setMessageModalVisible(true);
  };

  const handleCloseMessageModal = () => {
    setMessageModalVisible(false);
  };

  const showConfirmation = (action: "cancelar" | "excluir") => {
    setModalAction(action);
    setConfirmationModalVisible(true);
  };

  const handleCancelConfirmation = () => {
    setConfirmationModalVisible(false);
    setModalAction(null);
  };

  useEffect(() => {
    carregarConsulta();
  }, [consultaId]);

  const carregarConsulta = async () => {
    try {
      setLoading(true);
      const consultaData = await getAgendamentoById(consultaId);

      if (consultaData) {
        setConsulta(consultaData);

        if (consultaData.cpfPaciente) {
          const pacienteData = await getPacienteByCpf(consultaData.cpfPaciente);
          setPaciente(pacienteData);
        }
      } else {
        showMessage("Consulta não encontrada", "error");
        setTimeout(() => {
          navigation.goBack();
        }, 1500);
      }
    } catch (error) {
      console.log("Erro ao carregar consulta:", error);
      showMessage("Não foi possível carregar os dados da consulta", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmAction = async () => {
    setConfirmationModalVisible(false);

    if (modalAction === "cancelar") {
      await handleCancelarConsulta();
    } else if (modalAction === "excluir") {
      await handleExcluirConsulta();
    }

    setModalAction(null);
  };

  const handleCancelarConsulta = async () => {
    try {
      setExcluindo(true);
      const resultado = await atualizarAgendamento(consultaId, {
        status: "Cancelado"
      });

      if (resultado.success) {
        showMessage("Consulta cancelada com sucesso!", "success");
        setTimeout(() => {
          carregarConsulta();
        }, 1000);
      } else {
        throw new Error(resultado.error);
      }
    } catch (error) {
      console.log("Erro ao cancelar consulta:", error);
      showMessage("Não foi possível cancelar a consulta", "error");
    } finally {
      setExcluindo(false);
    }
  };

  const handleExcluirConsulta = async () => {
    try {
      setExcluindo(true);
      const resultado = await excluirAgendamento(consultaId);

      if (resultado.success) {
        showMessage("Consulta excluída com sucesso!", "success");
        setTimeout(() => {
          navigation.goBack();
        }, 1500);
      } else {
        throw new Error(resultado.error);
      }
    } catch (error) {
      console.log("Erro ao excluir consulta:", error);
      showMessage("Não foi possível excluir a consulta", "error");
    } finally {
      setExcluindo(false);
    }
  };

  const formatarData = (dataString) => {
    if (!dataString) return "Data não informada";
    try {
      const data = new Date(dataString);
      return data.toLocaleDateString('pt-BR');
    } catch {
      return dataString;
    }
  };

  const formatarHora = (horaString) => {
    if (!horaString) return "";
    try {
      const data = new Date(horaString);
      return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    } catch {
      return horaString;
    }
  };

  const formatarCPF = (cpf) => {
    if (!cpf) return "";
    const numbers = cpf.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return numbers.replace(/(\d{3})(\d+)/, '$1.$2');
    if (numbers.length <= 9) return numbers.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmado':
        return styles.statusConfirmed;
      case 'Pendente':
        return styles.statusPending;
      case 'Cancelado':
        return styles.statusCanceled;
      case 'Concluído':
        return styles.statusCompleted;
      default:
        return styles.statusPending;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'Confirmado':
        return 'Confirmado';
      case 'Pendente':
        return 'Pendente';
      case 'Cancelado':
        return 'Cancelado';
      case 'Concluído':
        return 'Concluído';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2B5BFF" />
        <Text style={styles.loadingText}>Carregando dados da consulta...</Text>
      </View>
    );
  }

  if (!consulta) {
    return (
      <View style={styles.loadingContainer}>
        <Ionicons name="alert-circle-outline" size={48} color="#E53E3E" />
        <Text style={styles.errorText}>Consulta não encontrada</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.patientName}>
                {paciente?.nome || consulta.nomePaciente || "Paciente não encontrado"}
              </Text>
              <View style={[
                styles.statusBadge,
                getStatusColor(consulta.status)
              ]}>
                <Text style={styles.statusText}>{getStatusText(consulta.status)}</Text>
              </View>
            </View>

            <View style={styles.infoSection}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Data</Text>
                <Text style={styles.infoValue}>{formatarData(consulta.data)}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Horário</Text>
                <Text style={styles.infoValue}>
                  {formatarHora(consulta.horaInicio)} - {formatarHora(consulta.horaFim)}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Tipo</Text>
                <Text style={styles.infoValue}>{consulta.tipoAgendamento}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>CPF do Paciente</Text>
                <Text style={styles.infoValue}>{formatarCPF(consulta.cpfPaciente)}</Text>
              </View>

              {paciente && (
                <>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Telefone</Text>
                    <Text style={styles.infoValue}>{paciente.telefone || "Não informado"}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Email</Text>
                    <Text style={styles.infoValue}>{paciente.email || "Não informado"}</Text>
                  </View>
                </>
              )}
            </View>

            <View style={styles.observationsSection}>
              <Text style={styles.observationsLabel}>Observações</Text>
              <Text style={styles.observationsText}>
                {consulta.observacoes || "Nenhuma observação registrada."}
              </Text>
            </View>
          </View>

          {consulta.status !== 'Cancelado' && consulta.status !== 'Concluído' && (
            <View style={styles.actionsSection}>
              <TouchableOpacity
                style={[styles.cancelButton, excluindo && styles.buttonDisabled]}
                onPress={() => showConfirmation("cancelar")}
                disabled={excluindo}
              >
                {excluindo ? (
                  <ActivityIndicator size="small" color="#E53E3E" />
                ) : (
                  <>
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                    <Ionicons name="close-circle-outline" size={18} color="#E53E3E" />
                  </>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.rescheduleButton}
                onPress={() => navigation.navigate("ReagendarConsulta", { consulta })}
                disabled={excluindo}
              >
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                  <Text style={styles.rescheduleButtonText}>Reagendar Consulta</Text>
                  <Ionicons name="calendar-outline" size={18} color="#fff" />
                </View>
              </TouchableOpacity>
            </View>
          )}

          {consulta.status === 'Confirmado' && (
            <View style={styles.concludeSection}>
              <TouchableOpacity
                style={styles.concludeButton}
                onPress={() =>
                  navigation.navigate("ConcluirConsulta", {
                    consulta,
                    pacienteId: paciente?.id
                  })
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                  <Text style={styles.concludeButtonText}>Concluir Consulta</Text>
                  <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
                </View>
              </TouchableOpacity>

            </View>
          )}

          <View style={styles.dangerSection}>
            <TouchableOpacity
              style={[styles.deleteButton, excluindo && styles.buttonDisabled]}
              onPress={() => showConfirmation("excluir")}
              disabled={excluindo}
            >
              {excluindo ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <>
                  <Text style={styles.deleteButtonText}>Excluir Consulta</Text>
                  <Ionicons name="trash-outline" size={16} color="#FFFFFF" />
                </>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* Modal de Mensagem */}
      <MessageModal
        visible={messageModalVisible}
        message={modalMessage}
        type={modalType}
        onClose={handleCloseMessageModal}
      />

      {/* Modal de Confirmação */}
      <ConfirmationModal
        visible={confirmationModalVisible}
        title={modalAction === "excluir" ? "Confirmar Exclusão" : "Confirmar Cancelamento"}
        message={
          modalAction === "excluir"
            ? "Tem certeza que deseja excluir esta consulta? Esta ação não pode ser desfeita."
            : "Tem certeza que deseja cancelar esta consulta?"
        }
        confirmText={modalAction === "excluir" ? "Sim, Excluir" : "Sim, Cancelar"}
        cancelText="Não, Cancelar"
        type={modalAction === "excluir" ? "danger" : "warning"}
        onConfirm={handleConfirmAction}
        onCancel={handleCancelConfirmation}
      />
    </>
  );
}