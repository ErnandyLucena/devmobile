import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
  Alert
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { styles } from "./styles";
import { getAllMedicos } from "../../../../services/medicos.service"; 

export default function MedicosListScreen({ navigation }) {
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadMedicos = async () => {
    try {
      const data = await getAllMedicos();
      
      const medicosComSituacao = data.map(medico => ({
        ...medico,
        situacao: medico.situacao,
      }));

      // Ordenar: ativos primeiro, depois inativos
      const medicosOrdenados = medicosComSituacao.sort((a, b) => {
        if (a.situacao === b.situacao) return 0;
        return a.situacao ? -1 : 1;
      });

      setMedicos(medicosOrdenados);
    } catch (error) {
      console.log("Erro ao carregar médicos:", error);
      Alert.alert("Erro", "Não foi possível carregar a lista de médicos");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadMedicos();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    loadMedicos();
  };

  const getStatusText = (situacao) => {
    return situacao ? "Ativo" : "Inativo";
  };

  const getStatusColor = (situacao) => {
    return situacao ? "#38A169" : "#E53E3E";
  };

  const getStatusBackground = (situacao) => {
    return situacao ? "#C6F6D5" : "#FED7D7";
  };

  const getCardStyle = (situacao) => {
    return situacao === false ? [styles.card, styles.cardInactive] : styles.card;
  };

  const renderMedicoCard = ({ item }) => (
    <TouchableOpacity
      style={getCardStyle(item.situacao)}
      onPress={() => navigation.navigate("MedicosDetalhes", { medico: item })}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.avatar, item.situacao === false && styles.avatarInactive]}>
          <Text style={[styles.avatarText, item.situacao === false && styles.avatarTextInactive]}>
            {item.nmPrestador
              ?.split(" ")
              .map(n => n[0])
              .join("")
              .substring(0, 2)
              .toUpperCase()}
          </Text>
        </View>

        <View style={styles.cardInfo}>
          <Text style={[styles.name, item.situacao === false && styles.textInactive]} numberOfLines={1}>
            {item.nmPrestador || "Nome não informado"}
          </Text>

          <Text style={[styles.especialidade, item.situacao === false && styles.textInactive]}>
            {item.especialidade || "Especialidade não informada"}
          </Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <View style={[styles.statusBadge, { backgroundColor: getStatusBackground(item.situacao) }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.situacao) }]}>
            {getStatusText(item.situacao)}
          </Text>
        </View>

        <Text style={[styles.idText, item.situacao === false && styles.textInactive]}>
          CRM: {item.dsCRM || "Não informado"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateTitle}>
        Nenhum médico cadastrado
      </Text>
      <Text style={styles.emptyStateText}>
        Clique no botão 'Novo Médico' para adicionar o primeiro médico ao sistema.
      </Text>
    </View>
  );

  const renderLoadingState = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#3182CE" />
      <Text style={styles.loadingText}>Carregando médicos...</Text>
    </View>
  );

  if (loading && medicos.length === 0) {
    return renderLoadingState();
  }

  const medicosAtivos = medicos.filter(m => m.situacao === true).length;
  const medicosInativos = medicos.filter(m => m.situacao === false).length;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7FAFC" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.subtitle}>
            {medicos.length} médico{medicos.length !== 1 ? 's' : ''} cadastrado{medicos.length !== 1 ? 's' : ''}
          </Text>
          <View style={styles.statusCount}>
            <Text style={styles.activeCount}>
              {medicosAtivos} ativo{medicosAtivos !== 1 ? 's' : ''}
            </Text>
            <Text style={styles.inactiveCount}>
              {medicosInativos} inativo{medicosInativos !== 1 ? 's' : ''}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.novoBtn}
          onPress={() => navigation.navigate("MedicosNovo")}
          activeOpacity={0.8}
        >
          <Text style={styles.novoTxt}> + Novo Médico</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={medicos}
        keyExtractor={(item) => item.id}
        renderItem={renderMedicoCard}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.listContent, medicos.length === 0 && styles.emptyListContent]}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#3182CE"]} tintColor="#3182CE" />}
      />
    </View>
  );
}