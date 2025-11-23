import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "./styles";
import MessageModal from "../../../../components/MessageContext/MessageContext"; 
import ConfirmationModal from "../../../../components/ConfirmationModal";

export default function FuncDetalhesScreen() {
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

  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false); // Estado para modal de confirmação

  const getStatusColor = (status: string) => {
    return status === "Ativo" ? "#38A169" : "#E53E3E";
  };

  const getStatusBackground = (status: string) => {
    return status === "Ativo" ? "#C6F6D5" : "#FED7D7";
  };

  // Função para abrir o modal de confirmação
  const handleOpenConfirmation = () => {
    setConfirmationModalVisible(true);
  };

  // Função chamada quando o usuário confirma o arquivamento
  const handleConfirmArquivar = () => {
    // Fecha o modal de confirmação
    setConfirmationModalVisible(false);
    
    // Aqui você implementaria a lógica de arquivamento na API
    console.log("Arquivando funcionário:", funcionario.idFuncionario);
    
    // Mostra o modal de sucesso
    setModalVisible(true);
  };

  // Função chamada quando o usuário cancela o arquivamento
  const handleCancelArquivar = () => {
    setConfirmationModalVisible(false);
    // Opcional: você pode mostrar uma mensagem de cancelamento
    console.log("Arquivamento cancelado");
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    // Navega de volta após fechar o modal
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
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
                {funcionario.nome.split(' ').map(n => n[0]).join('').toUpperCase()}
              </Text>
            </View>
            <View style={styles.nameSection}>
              <Text style={styles.name}>{funcionario.nome}</Text>
              <View style={[
                styles.statusBadge,
                { backgroundColor: getStatusBackground(funcionario.status) }
              ]}>
                <Text style={[
                  styles.statusText,
                  { color: getStatusColor(funcionario.status) }
                ]}>
                  {funcionario.status}
                </Text>
              </View>
            </View>
          </View>

          {/* Informações Detalhadas */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Informações Pessoais</Text>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Cargo</Text>
              <Text style={styles.infoValue}>{funcionario.cargo}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Setor</Text>
              <Text style={styles.infoValue}>{funcionario.setor}</Text>
            </View>

            {funcionario.email && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{funcionario.email}</Text>
              </View>
            )}

            {funcionario.telefone && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Telefone</Text>
                <Text style={styles.infoValue}>{funcionario.telefone}</Text>
              </View>
            )}

            {funcionario.cpf && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>CPF</Text>
                <Text style={styles.infoValue}>{funcionario.cpf}</Text>
              </View>
            )}

          </View>
        </View>

        {/* Ações */}
        <View style={styles.actionsSection}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate("FuncEditar", { funcionario })}
          >
            <Text style={styles.editButtonText}>Editar Funcionário</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.archiveButton}
            onPress={handleOpenConfirmation} 
          >
            <Text style={styles.archiveButtonText}>Arquivar Funcionário</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal de Confirmação */}
      <ConfirmationModal
        visible={confirmationModalVisible}
        title="Arquivar Funcionário"
        message={`Tem certeza que deseja arquivar o funcionário ${funcionario.nome}?`}
        confirmText="Sim, Arquivar"
        cancelText="Cancelar"
        type="warning"
        onConfirm={handleConfirmArquivar}
        onCancel={handleCancelArquivar}
      />

      {/* Modal de Sucesso */}
      <MessageModal
        visible={modalVisible}
        message="Funcionário arquivado com sucesso!"
        type="success"
        onClose={handleCloseModal}
      />
    </View>
  );
}