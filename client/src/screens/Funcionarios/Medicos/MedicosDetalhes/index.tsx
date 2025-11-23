import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  StatusBar,
  ActivityIndicator
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";

import MessageModal from "../../../../components/MessageContext/MessageContext"; 
import ConfirmationModal from "../../../../components/ConfirmationModal";

import { getMedicoById, excluirMedico } from "../../../../services/medicos.service";
import { styles } from "./styles";

export default function MedicosDetalhesScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { medico } = route.params;   

  const [medicoData, setMedicoData] = useState(medico);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("info");

  const loadMedicoData = async () => {
    try {
      if (medico.id) {
        const data = await getMedicoById(medico.id);
        if (data) {
          setMedicoData(data);
        }
      }
    } catch (error) {
      console.log("Erro ao carregar médico:", error);
      showModal("Erro ao carregar dados do médico", "error");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadMedicoData();
    }, [medico.id])
  );

  useEffect(() => {
    loadMedicoData();
  }, [medico.id]);

  const showModal = (message, type = "info") => {
    setModalMessage(message);
    setModalType(type);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const getStatusColor = (situacao) => {
    switch (situacao) {
      case "Ativo":
        return "#38A169";
      case "Inativo":
        return "#E53E3E";
      default:
        return "#718096";
    }
  };

  const getStatusBackground = (situacao) => {
    switch (situacao) {
      case "Ativo":
        return "#C6F6D5";
      case "Inativo":
        return "#FED7D7";
      default:
        return "#EDF2F7";
    }
  };

  const handleExcluir = () => {
    setConfirmationModalVisible(true);
  };

  const handleConfirmExcluir = async () => {
    setConfirmationModalVisible(false);
    setDeleting(true);

    try {
      const result = await excluirMedico(medicoData.id);
      
      if (result.success) {
        showModal("Médico excluído com sucesso!", "success");
      } else {
        showModal("Erro ao excluir médico", "error");
      }
    } catch (error) {
      console.log("Erro ao excluir médico", error);
      showModal("Erro ao excluir médico", "error");
    } finally {
      setDeleting(false);
    }
  };

  const handleCloseModal = () => {
    hideModal();
    if (modalType === "success") {
      navigation.goBack();
    }
  };

  const handleEditar = () => {
    navigation.navigate("MedicosEditar", { 
      medico: medicoData,
      onMedicoUpdated: loadMedicoData
    });
  };

  const handleVoltar = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3182CE" />
        <Text style={styles.loadingText}>Carregando dados do médico...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7FAFC" />

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        <View style={styles.mainCard}>
          <View style={styles.avatarSection}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {medicoData.nmPrestador
                  ?.split(' ')
                  .map(n => n[0])
                  .join('')
                  .substring(0, 2)
                  .toUpperCase()}
              </Text>
            </View>

            <View style={styles.nameSection}>
              <Text style={styles.name} numberOfLines={2}>
                {medicoData.nmPrestador || "Nome não informado"}
              </Text>

              <View style={[
                styles.statusBadge,
                { backgroundColor: getStatusBackground(medicoData.situacao) }
              ]}>
                <Text style={[
                  styles.statusText,
                  { color: getStatusColor(medicoData.situacao) }
                ]}>
                  {medicoData.situacao || "Ativo"}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Informações Pessoais</Text>

            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Text style={styles.infoLabel}>Nome Completo</Text>
              </View>
              <Text style={styles.infoValue}>
                {medicoData.nmPrestador || "Não informado"}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Text style={styles.infoLabel}>CPF</Text>
              </View>
              <Text style={styles.infoValue}>
                {medicoData.cpf || "Não informado"}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Text style={styles.infoLabel}>Nome Mnemônico</Text>
              </View>
              <Text style={styles.infoValue}>
                {medicoData.nmMnemonico || "Não informado"}
              </Text>
            </View>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Registro Profissional</Text>

            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Text style={styles.infoLabel}>CRM</Text>
              </View>
              <Text style={styles.infoValue}>
                {medicoData.dsCRM || "Não informado"}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Text style={styles.infoLabel}>Especialidade</Text>
              </View>
              <Text style={styles.infoValue}>
                {medicoData.especialidade || "Não informada"}
              </Text>
            </View>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Contato</Text>

            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Text style={styles.infoLabel}>Email</Text>
              </View>
              <Text style={styles.infoValue}>
                {medicoData.dsEmail || "Não informado"}
              </Text>
            </View>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Informações do Sistema</Text>

            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Text style={styles.infoLabel}>ID</Text>
              </View>
              <Text style={[styles.infoValue, styles.idText]}>{medicoData.id}</Text>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Text style={styles.infoLabel}>Cadastrado em</Text>
              </View>
              <Text style={styles.infoValue}>
                {medicoData.criadoEm ? 
                  new Date(medicoData.criadoEm.seconds * 1000).toLocaleDateString('pt-BR') 
                  : "Data não disponível"
                }
              </Text>
            </View>

            {medicoData.atualizadoEm && (
              <View style={styles.infoRow}>
                <View style={styles.infoLabelContainer}>
                  <Text style={styles.infoLabel}>Atualizado em</Text>
                </View>
                <Text style={styles.infoValue}>
                  {new Date(medicoData.atualizadoEm.seconds * 1000).toLocaleDateString('pt-BR')}
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditar}
            disabled={deleting}
          >
            <Text style={styles.editButtonText}>
              {deleting ? "Processando..." : "Editar Médico"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.deleteButton, deleting && styles.buttonDisabled]}
            onPress={handleExcluir}
            disabled={deleting}
          >
            <Text style={styles.deleteButtonText}>
              {deleting ? "Excluindo..." : "Excluir Médico"}
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      <ConfirmationModal
        visible={confirmationModalVisible}
        title="Excluir Médico"
        message={`Tem certeza que deseja excluir o médico ${medicoData.nmPrestador}? Esta ação não pode ser desfeita.`}
        confirmText="Sim, Excluir"
        cancelText="Cancelar"
        type="error"
        onConfirm={handleConfirmExcluir}
        onCancel={() => setConfirmationModalVisible(false)}
      />

      <MessageModal
        visible={modalVisible}
        message={modalMessage}
        type={modalType}
        onClose={handleCloseModal}
      />

    </View>
  );
}