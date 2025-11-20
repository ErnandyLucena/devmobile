// screens/EquipeScreen.tsx
import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  KeyboardAvoidingView,
  Platform 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";

export default function EquipeScreen({ navigation }: any) {
  const [selectedFilter, setSelectedFilter] = useState<"medicos" | "funcionarios">("medicos");
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilterSelect = (filter: "medicos" | "funcionarios") => {
    setSelectedFilter(filter);
    setSearchQuery(""); 
  };

  const handleSearch = () => {
    // Aqui você implementaria a lógica de busca
    console.log("Buscando:", searchQuery, "em", selectedFilter);
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
                onPress={() => setSearchQuery("")}
              >
                <Text style={styles.clearButtonText}>×</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

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

        {/* Estatísticas (Opcional) */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Resumo</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Médicos</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Funcionários</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>20</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}