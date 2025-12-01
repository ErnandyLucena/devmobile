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
          
          {/* Avatar + Nome + Situação */}
          <View style={styles.avatarSection}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {medicoData?.nmPrestador
                  ?.split(" ")
                  .map(n => n[0])
                  .join("")
                  .substring(0,2)
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

          {/* Informações Pessoais */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Informações Pessoais</Text>

            <Info label="Nome Completo" value={medicoData.nmPrestador} />
            <Info label="CPF" value={medicoData.cpf} />
            <Info label="Nome Mnemônico" value={medicoData.nmMnemonico} />

            {/* Data de Admissão */}
            <Info 
              label="Data de Admissão" 
              value={
                medicoData.dataAdmissao
                  ? new Date(medicoData.dataAdmissao).toLocaleDateString('pt-BR')
                  : "Não informado"
              }
            />
          </View>

          {/* Registro Profissional */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Registro Profissional</Text>

            <Info label="CRM" value={medicoData.dsCRM} />
            <Info label="Especialidade" value={medicoData.especialidade} />
          </View>

          {/* Contato */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Contato</Text>
            <Info label="Email" value={medicoData.dsEmail} />
            
            {/* 🔥 NOVO CAMPO – Telefone */}
            <Info label="Telefone" value={medicoData.tel} />
          </View>

          {/* Sistema */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Informações do Sistema</Text>

            <Info label="ID" value={medicoData.id} />

            <Info
              label="Cadastrado em"
              value={
                medicoData.criadoEm 
                  ? new Date(medicoData.criadoEm.seconds * 1000).toLocaleDateString("pt-BR")
                  : "Não disponível"
              }
            />

            {medicoData.atualizadoEm && (
              <Info
                label="Atualizado em"
                value={
                  new Date(medicoData.atualizadoEm.seconds * 1000).toLocaleDateString("pt-BR")
                }
              />
            )}
          </View>

        </View>

        {/* Ações */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditar}
          >
            <Text style={styles.editButtonText}>Editar Médico</Text>
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
        message={`Tem certeza que deseja excluir o médico ${medicoData.nmPrestador}?`}
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

/* COMPONENTE DE INFO REUTILIZÁVEL */
function Info({ label, value }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoLabelContainer}>
        <Text style={styles.infoLabel}>{label}</Text>
      </View>
      <Text style={styles.infoValue}>{value || "Não informado"}</Text>
    </View>
  );
}