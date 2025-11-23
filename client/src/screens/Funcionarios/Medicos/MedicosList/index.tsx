import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  Alert
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { styles } from "./styles";
import { getAllMedicos } from "../../../../services/medicos.service";

export default function MedicosListScreen({ navigation }) {
  const [medicos, setMedicos] = useState([]);
  const [medicosFiltrados, setMedicosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");

  const loadMedicos = async () => {
    try {
      const data = await getAllMedicos();

      // Garantir que a situação seja convertida corretamente
      const medicosComSituacao = data.map(medico => ({
        ...medico,
        situacao: medico.situacao;
      }));

      // Ordenar: ativos primeiro, depois inativos
      const medicosOrdenados = medicosComSituacao.sort((a, b) => {
        if (a.situacao === b.situacao) return 0;
        return a.situacao ? -1 : 1;
      });

      setMedicos(medicosOrdenados);
      setMedicosFiltrados(medicosOrdenados);
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

  const handleSearch = (text) => {
    setSearchText(text);

    if (text.trim() === "") {
      setMedicosFiltrados(medicos);
    } else {
      const filtered = medicos.filter(medico =>
        (medico.nmPrestador?.toLowerCase().includes(text.toLowerCase()) ||
          medico.especialidade?.toLowerCase().includes(text.toLowerCase()) ||
          medico.dsCRM?.toLowerCase().includes(text.toLowerCase()) ||
          medico.dsEmail?.toLowerCase().includes(text.toLowerCase()) ||
          // Adiciona filtro para a situação também
          getStatusText(medico.situacao).toLowerCase().includes(text.toLowerCase())
        )
      );

      // Ordenar a lista filtrada: ativos primeiro, depois inativos
      const medicosOrdenados = filtered.sort((a, b) => {
        if (a.situacao === b.situacao) return 0;
        return a.situacao ? -1 : 1;
      });

      setMedicosFiltrados(medicosOrdenados);
    }
  };

  const clearSearch = () => {
    setSearchText("");
    setMedicosFiltrados(medicos);
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
        {searchText ? "Nenhum médico encontrado" : "Nenhum médico cadastrado"}
      </Text>
      <Text style={styles.emptyStateText}>
        {searchText 
          ? "Tente ajustar os termos da busca."
          : "Clique no botão 'Novo Médico' para adicionar o primeiro médico ao sistema."
        }
      </Text>
      {searchText && (
        <TouchableOpacity style={styles.clearSearchButton} onPress={clearSearch}>
          <Text style={styles.clearSearchText}>Limpar busca</Text>
        </TouchableOpacity>
      )}
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

      {/* Barra de busca */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nome, especialidade, CRM..."
            placeholderTextColor="#A0AEC0"
            value={searchText}
            onChangeText={handleSearch}
            returnKeyType="search"
          />
          {searchText ? (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.searchIcon}>🔍</Text>
          )}
        </View>
      </View>

      <FlatList
        data={medicosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderMedicoCard}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.listContent, medicosFiltrados.length === 0 && styles.emptyListContent]}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#3182CE"]} tintColor="#3182CE" />}
      />
    </View>
  );
}
