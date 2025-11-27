import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Modal
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { getFuncionarioById, excluirFuncionario  } from "../../../../services/funcionario.service";
import { styles } from "./styles";

export default function FuncDetalhesScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const funcionarioId = route?.params?.funcionarioId ?? null;

  const [funcionario, setFuncionario] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal de confirmação de exclusão
  const [modalVisible, setModalVisible] = useState(false);

useFocusEffect(
  useCallback(() => {
    let ativo = true;

    async function loadFuncionario() {
      setLoading(true);

      try {
        const data = await getFuncionarioById(funcionarioId);

        if (ativo) {
          setFuncionario(data);
        }
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar os dados.");
      } finally {
        if (ativo) setLoading(false);
      }
    }

    loadFuncionario();

    return () => {
      ativo = false; // para evitar chamada após desmontar
    };
  }, [funcionarioId])
);


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Carregando funcionário...</Text>
      </View>
    );
  }

  const inicial = funcionario.nomeCompleto
    ? funcionario.nomeCompleto[0].toUpperCase()
    : "?";

  const handleExcluir = async () => {
    try {
      await excluirFuncionario(funcionarioId);
      setModalVisible(false);
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível excluir o funcionário.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* CARD PRINCIPAL */}
        <View style={styles.mainCard}>
          <View style={styles.avatarSection}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{inicial}</Text>
            </View>

            <View style={styles.nameSection}>
              <Text style={styles.name}>{funcionario.nomeCompleto}</Text>

              <View style={[styles.statusBadge]}>
                <Text style={styles.statusText}>
                  {funcionario.situacao || "Ativo"}
                </Text>
              </View>
            </View>
          </View>

          {/* SEÇÃO DE INFORMAÇÕES */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Informações Gerais</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>CPF:</Text>
              <Text style={styles.infoValue}>{funcionario.cpf}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Cargo:</Text>
              <Text style={styles.infoValue}>{funcionario.cargo}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Setor:</Text>
              <Text style={styles.infoValue}>{funcionario.setor}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>E-mail:</Text>
              <Text style={styles.infoValue}>{funcionario.email}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Telefone:</Text>
              <Text style={styles.infoValue}>{funcionario.tel}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Admissão:</Text>
              <Text style={styles.infoValue}>
                {funcionario.dataAdmissao?.toDate
                  ? funcionario.dataAdmissao.toDate().toLocaleDateString()
                  : funcionario.dataAdmissao}
              </Text>
            </View>
          </View>
        </View>

        {/* BOTÕES DE AÇÃO */}
        <View style={styles.actionsSection}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              navigation.navigate("FuncEditar", { funcionario: funcionario })
            }
          >
            <Text style={styles.editButtonText}>Editar Funcionário</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.archiveButton}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="trash" size={20} color="#E53E3E" />
            <Text style={styles.archiveButtonText}>Excluir Funcionário</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>


      {/* MODAL DE CONFIRMAÇÃO */}
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Excluir Funcionário</Text>
            <Text style={styles.modalMessage}>
              Tem certeza que deseja excluir este funcionário?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalDeleteButton}
                onPress={handleExcluir}
              >
                <Text style={styles.modalDeleteText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}
