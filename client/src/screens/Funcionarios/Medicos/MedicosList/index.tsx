import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
  Alert,
  TextInput
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { styles } from "./styles";
import { getAllMedicos } from "../../../../services/medicos.service"; 

export default function MedicosListScreen({ navigation }) {
  const [medicos, setMedicos] = useState([]);
  const [medicosFiltrados, setMedicosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");

  // Funções de carregamento e busca
  const loadMedicos = async () => {
    try {
      const data = await getAllMedicos();
      
      const medicosComSituacao = data.map(medico => ({
        ...medico,
        situacao: medico.situacao || "Ativo",
      }));

      const medicosOrdenados = medicosComSituacao.sort((a, b) => {
        const ordem = { "Ativo": 1, "Inativo": 2 };
        return ordem[a.situacao] - ordem[b.situacao];
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

  const filtrarMedicos = (texto) => {
    setSearchText(texto);
    
    if (texto === "") {
      setMedicosFiltrados(medicos);
    } else {
      const textoLower = texto.toLowerCase();
      const filtrados = medicos.filter(medico => 
        medico.nmPrestador?.toLowerCase().includes(textoLower) ||
        medico.especialidade?.toLowerCase().includes(textoLower) ||
        medico.dsCRM?.toLowerCase().includes(textoLower) ||
        medico.dsEmail?.toLowerCase().includes(textoLower)
      );
      setMedicosFiltrados(filtrados);
    }
  };

  const limparBusca = () => {
    setSearchText("");
    setMedicosFiltrados(medicos);
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
    switch(situacao) {
      case "Ativo": return "Ativo";
      case "Inativo": return "Inativo";
      default: return "Ativo";
    }
  };

  const getStatusColor = (situacao) => {
    switch(situacao) {
      case "Ativo": return "#38A169";
      case "Inativo": return "#D69E2E";
      default: return "#38A169";
    }
  };

  const getStatusBackground = (situacao) => {
    switch(situacao) {
      case "Ativo": return "#C6F6D5";
      case "Inativo": return "#FEFCBF";
      case "Arquivado": return "#EDF2F7";
      default: return "#C6F6D5";
    }
  };

  const getCardStyle = (situacao) => {
    if (situacao === "Arquivado") {
      return [styles.card, styles.cardArquivado];
    }
    return situacao === "Inativo" ? [styles.card, styles.cardInactive] : styles.card;
  };

  // Componentes de renderização
  const renderMedicoCard = ({ item }) => (
    <TouchableOpacity
      style={getCardStyle(item.situacao)}
      onPress={() => navigation.navigate("MedicosDetalhes", { medico: item })}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <View style={[
          styles.avatar, 
          item.situacao === "Inativo" && styles.avatarInactive,
        ]}>
          <Text style={[
            styles.avatarText, 
            item.situacao === "Inativo" && styles.avatarTextInactive,
          ]}>
            {item.nmPrestador
              ?.split(" ")
              .map(n => n[0])
              .join("")
              .substring(0, 2)
              .toUpperCase()}
          </Text>
        </View>

        <View style={styles.cardInfo}>
          <Text style={[
            styles.name, 
            item.situacao === "Inativo" && styles.textInactive,
          ]} numberOfLines={1}>
            {item.nmPrestador || "Nome não informado"}
          </Text>

          <Text style={[
            styles.especialidade, 
            item.situacao === "Inativo" && styles.textInactive,
          ]}>
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

        <Text style={[
          styles.idText, 
          item.situacao === "Inativo" && styles.textInactive,
        ]}>
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
        <TouchableOpacity style={styles.clearSearchButton} onPress={limparBusca}>
          <Text style={styles.clearSearchText}>Limpar Busca</Text>
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

  const medicosAtivos = medicosFiltrados.filter(m => m.situacao === "Ativo").length;
  const medicosInativos = medicosFiltrados.filter(m => m.situacao === "Inativo").length;

  if (loading && medicos.length === 0) {
    return renderLoadingState();
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7FAFC" />

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nome, especialidade, CRM ou email..."
            value={searchText}
            onChangeText={filtrarMedicos}
            placeholderTextColor="#A0AEC0"
          />
          {searchText ? (
            <TouchableOpacity style={styles.clearButton} onPress={limparBusca}>
              <Ionicons name="close-circle" size={20} color="#A0AEC0" />
            </TouchableOpacity>
          ) : (
            <Ionicons name="search" size={20} color="#A0AEC0" />
          )}
        </View>
      </View>

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.subtitle}>
            {medicosFiltrados.length} médico{medicosFiltrados.length !== 1 ? 's' : ''} {searchText ? 'encontrado' : 'cadastrado'}{medicosFiltrados.length !== 1 ? 's' : ''}
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
        data={medicosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderMedicoCard}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.listContent, medicosFiltrados.length === 0 && styles.emptyListContent]}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            colors={["#3182CE"]} 
            tintColor="#3182CE" 
          />
        }
      />
    </View>
  ); 
}