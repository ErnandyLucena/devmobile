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
import { getAllPacientes } from "../../../services/pacientes.service"; 

export default function PacientesListScreen({ navigation }) {
  const [pacientes, setPacientes] = useState([]);
  const [pacientesFiltrados, setPacientesFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");

  const loadPacientes = async () => {
    try {
      const data = await getAllPacientes();
      
      const pacientesOrdenados = data.sort((a, b) => 
        (a.nome || "").localeCompare(b.nome || "")
      );

      setPacientes(pacientesOrdenados);
      setPacientesFiltrados(pacientesOrdenados);
    } catch (error) {
      console.log("Erro ao carregar pacientes:", error);
      Alert.alert("Erro", "Não foi possível carregar a lista de pacientes");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const filtrarPacientes = (texto) => {
    setSearchText(texto);
    
    if (texto === "") {
      setPacientesFiltrados(pacientes);
    } else {
      const textoLower = texto.toLowerCase();
      const filtrados = pacientes.filter(paciente => 
        paciente.nome?.toLowerCase().includes(textoLower) ||
        paciente.cpf?.includes(texto) ||
        paciente.email?.toLowerCase().includes(textoLower) ||
        paciente.telefone?.includes(texto)
      );
      setPacientesFiltrados(filtrados);
    }
  };

  const limparBusca = () => {
    setSearchText("");
    setPacientesFiltrados(pacientes);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadPacientes();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    loadPacientes();
  };

  const formatarTelefone = (telefone) => {
    if (!telefone) return "Não informado";
    return telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  };

const handleVerDetalhes = (paciente) => {
  console.log("🔍 Navegando para DetalhesPaciente com ID:", paciente.id);
  console.log("📱 Navigation object:", navigation);
  
  navigation.navigate("DetalhesPaciente", { 
    pacienteId: paciente.id 
  });
};

  const renderPacienteCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.nome
              ?.split(" ")
              .map(n => n[0])
              .join("")
              .substring(0, 2)
              .toUpperCase()}
          </Text>
        </View>

        <View style={styles.cardInfo}>
          <Text style={styles.name} numberOfLines={1}>
            {item.nome || "Nome não informado"}
          </Text>
          <Text style={styles.telefone}>
            {formatarTelefone(item.telefone) || "Telefone não informado"}
          </Text>
        </View>
      </View>

      <View style={styles.cardActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.detailsButton]}
          onPress={() => handleVerDetalhes(item)}
          activeOpacity={0.7}
        >
          <Ionicons name="eye" size={16} color="#2B5BFF" />
          <Text style={[styles.actionButtonText, styles.detailsButtonText]}>
            Ver Detalhes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.historyButton]}
          onPress={() => navigation.navigate("HistoricoPaciente", { paciente: item })}
          activeOpacity={0.7}
        >
          <Ionicons name="time" size={16} color="#718096" />
          <Text style={[styles.actionButtonText, styles.historyButtonText]}>
            Ver Histórico
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateTitle}>
        {searchText ? "Nenhum paciente encontrado" : "Nenhum paciente cadastrado"}
      </Text>
      <Text style={styles.emptyStateText}>
        {searchText 
          ? "Tente ajustar os termos da busca."
          : "Clique no botão 'Novo Paciente' para adicionar o primeiro paciente ao sistema."
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
      <Text style={styles.loadingText}>Carregando pacientes...</Text>
    </View>
  );

  if (loading && pacientes.length === 0) {
    return renderLoadingState();
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7FAFC" />

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nome, CPF, email ou telefone..."
            value={searchText}
            onChangeText={filtrarPacientes}
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
            {pacientesFiltrados.length} paciente{pacientesFiltrados.length !== 1 ? 's' : ''} {searchText ? 'encontrado' : 'cadastrado'}{pacientesFiltrados.length !== 1 ? 's' : ''}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.novoBtn}
          onPress={() => navigation.navigate("PacientesNovo")}
          activeOpacity={0.8}
        >
          <Text style={styles.novoTxt}> + Novo Paciente</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={pacientesFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderPacienteCard}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.listContent, pacientesFiltrados.length === 0 && styles.emptyListContent]}
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