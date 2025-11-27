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
import { getAllFuncionarios } from "../../../../services/funcionario.service";

export default function FuncListScreen({ navigation }) {
  const [funcionarios, setFuncionarios] = useState([]);
  const [funcionariosFiltrados, setFuncionariosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");

  // ---------------------------
  // 🔥 Carregar Funcionários
  // ---------------------------
  const loadFuncionarios = async () => {
    try {
      const data = await getAllFuncionarios();

      // 🔥 CORREÇÃO: Normalizar situação para string
      const funcionariosComSituacao = data.map(funcionario => ({
        ...funcionario,
        situacao: Array.isArray(funcionario.situacao)
          ? funcionario.situacao[0] || "Ativo"
          : funcionario.situacao || "Ativo",
      }));

      // 🔥 CORREÇÃO: Considerar Arquivado na ordenação
      const funcionariosOrdenados = funcionariosComSituacao.sort((a, b) => {
        const ordem = { "Ativo": 1, "Inativo": 2, "Arquivado": 3 };
        return ordem[a.situacao] - ordem[b.situacao];
      });

      setFuncionarios(funcionariosOrdenados);
      setFuncionariosFiltrados(funcionariosOrdenados);

    } catch (error) {
      console.log("Erro ao carregar funcionários:", error);
      Alert.alert("Erro", "Não foi possível carregar a lista de funcionários");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ---------------------------
  // 🔎 Filtro de pesquisa
  // ---------------------------
  const filtrarFuncionarios = (texto) => {
    setSearchText(texto);

    if (texto === "") {
      setFuncionariosFiltrados(funcionarios);
      return;
    }

    const textoLower = texto.toLowerCase();

    const filtrados = funcionarios.filter(funcionario =>
      funcionario.nomeCompleto?.toLowerCase().includes(textoLower) ||
      funcionario.cargo?.toLowerCase().includes(textoLower) ||
      funcionario.setor?.toLowerCase().includes(textoLower) ||
      funcionario.email?.toLowerCase().includes(textoLower)
    );

    setFuncionariosFiltrados(filtrados);
  };

  const limparBusca = () => {
    setSearchText("");
    setFuncionariosFiltrados(funcionarios);
  };

  // Atualiza ao retornar para tela
  useFocusEffect(
    React.useCallback(() => {
      loadFuncionarios();
    }, [navigation])
  );

  const onRefresh = () => {
    setRefreshing(true);
    loadFuncionarios();
  };

  // ---------------------------
  // Helpers de Status
  // ---------------------------
  const getStatusText = (situacao) => {
    switch (situacao) {
      case "Ativo": return "Ativo";
      case "Inativo": return "Inativo";
      case "Arquivado": return "Arquivado";
      default: return "Ativo";
    }
  };

  const getStatusColor = (situacao) => {
    switch (situacao) {
      case "Ativo": return "#38A169";
      case "Inativo": return "#D69E2E";
      case "Arquivado": return "#718096";
      default: return "#38A169";
    }
  };

  const getStatusBackground = (situacao) => {
    switch (situacao) {
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
    return situacao === "Inativo"
      ? [styles.card, styles.cardInactive]
      : styles.card;
  };

  // ---------------------------
  // 🔥 Renderização dos Cards
  // ---------------------------
  const renderFuncionarioCard = ({ item }) => (
    <TouchableOpacity
      style={getCardStyle(item.situacao)}
      onPress={() => navigation.navigate("FuncDetalhes", { funcionarioId: item.id })}
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
            {item.nomeCompleto
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
            {item.nomeCompleto || "Nome não informado"}
          </Text>

          <Text style={[
            styles.especialidade,
            item.situacao === "Inativo" && styles.textInactive,
          ]}>
            {item.cargo || "Cargo não informado"}
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
          Setor: {item.setor || "Não informado"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  // ---------------------------
  // Estados
  // ---------------------------
  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateTitle}>
        {searchText ? "Nenhum funcionário encontrado" : "Nenhum funcionário cadastrado"}
      </Text>
      <Text style={styles.emptyStateText}>
        {searchText
          ? "Tente ajustar os termos da busca."
          : "Clique no botão 'Novo Funcionário' para adicionar o primeiro funcionário ao sistema."
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
      <Text style={styles.loadingText}>Carregando funcionários...</Text>
    </View>
  );

  const funcionariosAtivos = funcionariosFiltrados.filter(m => m.situacao === "Ativo").length;
  const funcionariosInativos = funcionariosFiltrados.filter(m => m.situacao === "Inativo").length;

  if (loading && funcionarios.length === 0) {
    return renderLoadingState();
  }

  // ---------------------------
  // UI Principal
  // ---------------------------
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7FAFC" />

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nome, cargo, setor ou email..."
            value={searchText}
            onChangeText={filtrarFuncionarios}
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
            {funcionariosFiltrados.length} funcionário{funcionariosFiltrados.length !== 1 ? 's' : ''} {searchText ? 'encontrado' : 'cadastrado'}{funcionariosFiltrados.length !== 1 ? 's' : ''}
          </Text>
          <View style={styles.statusCount}>
            <Text style={styles.activeCount}>
              {funcionariosAtivos} ativo{funcionariosAtivos !== 1 ? 's' : ''}
            </Text>
            <Text style={styles.inactiveCount}>
              {funcionariosInativos} inativo{funcionariosInativos !== 1 ? 's' : ''}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.novoBtn}
          onPress={() => navigation.navigate("FuncNovo")}
          activeOpacity={0.8}
        >
          <Text style={styles.novoTxt}> + Novo Funcionário</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={funcionariosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderFuncionarioCard}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.listContent, funcionariosFiltrados.length === 0 && styles.emptyListContent]}
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
