import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { Ionicons } from '@expo/vector-icons';

export default function EquipeScreen({ navigation }: any) {
  const [selectedFilter, setSelectedFilter] = useState<"medicos" | "funcionarios">("medicos");

  const handleFilterSelect = (filter: "medicos" | "funcionarios") => {
    setSelectedFilter(filter);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >

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

        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("MedicosList")}
          >
            <Text style={styles.actionButtonText}>Ver Todos os Médicos</Text>
            <Ionicons name="people-outline" size={20} color="#2D3748" style={{ marginRight: 8 }} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("FuncList")}
          >
            <Text style={styles.actionButtonText}>Ver Todos os Funcionários</Text>
            <Ionicons name="briefcase-outline" size={20} color="#2D3748" style={{ marginRight: 8 }} />
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