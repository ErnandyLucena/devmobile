import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Alert
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { styles } from "./styles";
import { getAllAgendamentos } from "../../../services/agendamentos.service";
import { getAllPacientes } from "../../../services/pacientes.service";

export function AgendamentosScreen() {
  const navigation = useNavigation();
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Função para carregar agendamentos
  const loadAgendamentos = async () => {
    try {
      setLoading(true);
      
      // Busca agendamentos e pacientes em paralelo
      const [agendamentosData, pacientesData] = await Promise.all([
        getAllAgendamentos(),
        getAllPacientes()
      ]);

      // Enriquecer agendamentos com dados do paciente
      const agendamentosEnriquecidos = agendamentosData.map(agendamento => {
        const paciente = pacientesData.find(p => p.cpf === agendamento.cpfPaciente);
        return {
          ...agendamento,
          pacienteNome: paciente?.nome || "Paciente não encontrado",
          pacienteTelefone: paciente?.telefone || "",
          pacienteEmail: paciente?.email || ""
        };
      });

      setAgendamentos(agendamentosEnriquecidos);
    } catch (error) {
      console.log("Erro ao carregar agendamentos:", error);
      Alert.alert("Erro", "Não foi possível carregar a lista de agendamentos");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Carrega os dados quando a tela ganha foco
  useFocusEffect(
    React.useCallback(() => {
      loadAgendamentos();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    loadAgendamentos();
  };

  // Funções de formatação
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

  if (loading && agendamentos.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2B5BFF" />
        <Text style={styles.loadingText}>Carregando agendamentos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={["#2B5BFF"]}
            tintColor="#2B5BFF"
          />
        }
      >
        <View style={styles.content}>
          {/* Cabeçalho com título e botão lado a lado */}
          <View style={styles.headerRow}>
            <Text style={styles.sectionTitle}>Todos os Agendamentos</Text>
            <TouchableOpacity
              style={styles.smallNewButton}
              onPress={() => navigation.navigate("NovoAgendamento")}
            >
              <Ionicons name="add" size={16} color="#FFFFFF" />
              <Text style={styles.smallNewButtonText}> Novo</Text>
            </TouchableOpacity>
          </View>
          
          {/* Lista de Agendamentos */}
          {agendamentos.length > 0 ? (
            agendamentos.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() =>
                  navigation.navigate("DetalhesConsulta", {
                    consultaId: item.id,
                  })
                }
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{item.pacienteNome}</Text>
                  <View style={[
                    styles.statusBadge,
                    getStatusColor(item.status)
                  ]}>
                    <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
                  </View>
                </View>
                
                <View style={styles.cardInfo}>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Data:</Text>
                    <Text style={styles.infoValue}>{formatarData(item.data)}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Horário:</Text>
                    <Text style={styles.infoValue}>
                      {formatarHora(item.horaInicio)} - {formatarHora(item.horaFim)}
                    </Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Tipo:</Text>
                    <Text style={styles.infoValue}>{item.tipoAgendamento}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>CPF:</Text>
                    <Text style={styles.infoValue}>{item.cpfPaciente}</Text>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <Text style={styles.observations}>
                    {item.observacoes || "Sem observações"}
                  </Text>
                  <Ionicons name="chevron-forward" size={16} color="#718096" />
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="calendar-outline" size={48} color="#A0AEC0" />
              <Text style={styles.emptyStateText}>Nenhum agendamento encontrado</Text>
              <Text style={styles.emptyStateSubtext}>
                Comece criando o primeiro agendamento do sistema
              </Text>
              <TouchableOpacity
                style={styles.emptyStateButton}
                onPress={() => navigation.navigate("NovoAgendamento")}
              >
                <Text style={styles.emptyStateButtonText}>Criar primeiro agendamento</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}