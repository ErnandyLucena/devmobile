import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { getAllMedicos, getAllFuncionarios }  // Aqui, você também pode implementar o serviço de funcionários

export default function EquipeScreen({ navigation }: any) {
  const [selectedFilter, setSelectedFilter] = useState<"medicos" | "funcionarios">("medicos");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFilterSelect = (filter: "medicos" | "funcionarios") => {
    setSelectedFilter(filter);
    setSearchQuery(""); 
    setSearchResults([]); // Clear previous search results when switching filters
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      setSearchResults([]); // Reset results if no search text
      return;
    }

    setLoading(true);
    try {
      if (selectedFilter === "medicos") {
        const result = await getAllMedicos(searchQuery); // Pass search query to your service
        setSearchResults(result);
      } else {
        const result = await getAllFuncionarios(searchQuery); // Implement this in your service
        setSearchResults(result);
      }
    } catch (error) {
      console.log("Erro ao buscar:", error);
      Alert.alert("Erro", "Não foi possível realizar a busca.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Equipe Clínica</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Filtros */}
        <View style={styles.filterSection}>
          <Text style={styles.sectionTitle}>Selecione o Tipo</Text>
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === "medicos" && styles.filterButtonActive
              ]}
              onPress={() => handleFilterSelect("medicos")}
            >
              <Text style={[
                styles.filterButtonText,
                selectedFilter === "medicos" && styles.filterButtonTextActive
              ]}>
                Médicos
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[ 
                styles.filterButton,
                selectedFilter === "funcionarios" && styles.filterButtonActive
              ]}
              onPress={() => handleFilterSelect("funcionarios")}
            >
              <Text style={[ 
                styles.filterButtonText,
                selectedFilter === "funcionarios" && styles.filterButtonTextActive
              ]}>
                Funcionários
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Campo de Busca */}
        <View style={styles.searchSection}>
          <Text style={styles.sectionTitle}>
            Buscar {selectedFilter === "medicos" ? "Médicos" : "Funcionários"}
          </Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder={`Digite o nome do ${selectedFilter === "medicos" ? "médico" : "funcionário"}...`}
              placeholderTextColor="#A0AEC0"
              value={searchQuery}
              onChangeText={setSearchQuery}
              returnKeyType="search"
              onSubmitEditing={handleSearch}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity 
                style={styles.clearButton}
                onPress={() => {
                  setSearchQuery("");
                  setSearchResults([]); // Clear search results
                }}
              >
                <Text style={styles.clearButtonText}>×</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Results */}
        {loading ? (
          <Text>Carregando...</Text>
        ) : (
          <View>
            {searchResults.length === 0 ? (
              <Text>Nenhum {selectedFilter === "medicos" ? "médico" : "funcionário"} encontrado.</Text>
            ) : (
              searchResults.map((item, index) => (
                <View key={index}>
                  <Text>{item.nmPrestador || item.nome}</Text>
                  <Text>{item.especialidade || item.cargo}</Text>
                </View>
              ))
            )}
          </View>
        )}

        {/* Botões de Ação */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("MedicosList")}
          >
            <Text style={styles.actionButtonText}>Ver Todos os Médicos</Text>
            <Text style={styles.actionButtonArrow}>{">"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("FuncList")}
          >
            <Text style={styles.actionButtonText}>Ver Todos os Funcionários</Text>
            <Text style={styles.actionButtonArrow}>{">"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.newButton]}
            onPress={() => navigation.navigate(
              selectedFilter === "medicos" ? "MedicosNovo" : "FuncNovo"
            )}
          >
            <Text style={[styles.actionButtonText, styles.newButtonText]}>
              + Novo {selectedFilter === "medicos" ? "Médico" : "Funcionário"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
