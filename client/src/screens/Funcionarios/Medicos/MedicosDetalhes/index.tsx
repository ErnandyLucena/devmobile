// screens/Medicos/MedicosDetalhes.js
import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  StatusBar
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import MessageModal from "../../../../components/MessageContext/MessageContext";
import ConfirmationModal from "../../../../components/ConfirmationModal"; 
import { styles } from "./styles";

export default function MedicosDetalhesScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { medico } = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);

  const getStatusColor = (situacao) => {
    switch (situacao) {
      case "Disponível":
      case "Ativo":
        return "#38A169";
      case "Ausente":
        return "#D69E2E";
      case "Inativo":
        return "#E53E3E";
      default:
        return "#718096";
    }
  };

  const getStatusBackground = (situacao) => {
    switch (situacao) {
      case "Disponível":
      case "Ativo":
        return "#C6F6D5";
      case "Ausente":
        return "#FEFCBF";
      case "Inativo":
        return "#FED7D7";
      default:
        return "#EDF2F7";
    }
  };

  const handleArquivar = () => {
    setConfirmationModalVisible(true);
  };

  const handleConfirmArquivar = () => {
    setConfirmationModalVisible(false);
    // Aqui você implementaria a lógica de arquivamento na API
    console.log("Arquivando médico:", medico.cdPrestador);
    setModalVisible(true);
  };

  const handleCancelArquivar = () => {
    setConfirmationModalVisible(false);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  const handleEditar = () => {
    navigation.navigate("MedicosEditar", { medico });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7FAFC" />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Card Principal */}
        <View style={styles.mainCard}>
          <View style={styles.avatarSection}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {medico.nmPrestador
                  .split(' ')
                  .map(n => n[0])
                  .join('')
                  .toUpperCase()
                  .substring(0, 2)}
              </Text>
            </View>
            <View style={styles.nameSection}>
              <Text style={styles.name}>{medico.nmPrestador}</Text>
              <View style={[
                styles.statusBadge,
                { backgroundColor: getStatusBackground(medico.situacao) }
              ]}>
                <Text style={[
                  styles.statusText,
                  { color: getStatusColor(medico.situacao) }
                ]}>
                  {medico.situacao || "Não informado"}
                </Text>
              </View>
            </View>
          </View>

          {/* Informações Profissionais */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Informações Profissionais</Text>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Especialidade</Text>
              <Text style={styles.infoValue}>{medico.especialidade || "Não informada"}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>CRM</Text>
              <Text style={styles.infoValue}>{medico.dsCRM || "Não informado"}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Código Conselho</Text>
              <Text style={styles.infoValue}>{medico.dsCodigoConselho || "Não informado"}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>ID do Prestador</Text>
              <Text style={styles.infoValue}>{medico.cdPrestador || "Não informado"}</Text>
            </View>
          </View>

          {/* Informações de Contato */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Informações de Contato</Text>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{medico.dsEmail || "Não informado"}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Nome Abreviado</Text>
              <Text style={styles.infoValue}>{medico.nmMnemonico || "Não informado"}</Text>
            </View>
          </View>

          {/* Informações Adicionais */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Informações Adicionais</Text>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Nome Completo</Text>
              <Text style={styles.infoValue}>{medico.nmPrestador || "Não informado"}</Text>
            </View>
          </View>
        </View>

        {/* Botões de Ação - Agora soltos, sem card */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditar}
          >
            <Text style={styles.editButtonText}>Editar Médico</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.archiveButton}
            onPress={handleArquivar}
          >
            <Text style={styles.archiveButtonText}>Arquivar Médico</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal de Confirmação */}
      <ConfirmationModal
        visible={confirmationModalVisible}
        title="Arquivar Médico"
        message={`Tem certeza que deseja arquivar o médico ${medico.nmPrestador}?`}
        confirmText="Sim, Arquivar"
        cancelText="Cancelar"
        type="warning"
        onConfirm={handleConfirmArquivar}
        onCancel={handleCancelArquivar}
      />

      {/* Modal de Sucesso */}
      <MessageModal
        visible={modalVisible}
        message="Médico arquivado com sucesso!"
        type="success"
        onClose={handleCloseModal}
      />
    </View>
  );
}

