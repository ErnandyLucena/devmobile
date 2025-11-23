import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "./styles";
import { getAllFuncionarios } from "../../../../services/funcionario.service";

export default function FuncListScreen() {
  const navigation = useNavigation();
  const [funcionarios, setFuncionarios] = useState([]);
  const route = useRoute();

  useEffect(() => {
    async function load() {
      const data = await getAllFuncionarios();

      // Formatar os dados para a tela
      const formatado = data.map(f => ({
        idFuncionario: f.id,
        nome: f.nomeCompleto,
        cargo: f.cargo,
        setor: f.setor,
        status: f.situacao?.[0] ?? "Ativo",
        email: f.email,
        telefone: f.tel,
      }));

      setFuncionarios(formatado);
    }

    load();
  }, [route.params?.updated]); // Recarrega quando a tela de edição indica que houve uma atualização

  const getStatusColor = (status: string) => {
    return status === "Ativo" ? "#38A169" : "#E53E3E";
  };

  const getStatusBackground = (status: string) => {
    return status === "Ativo" ? "#C6F6D5" : "#FED7D7";
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Cabeçalho com contador e botão Novo */}
        <View style={styles.headerRow}>
          <Text style={styles.counterText}>
            {funcionarios.length} funcionário{funcionarios.length !== 1 ? 's' : ''} encontrado{funcionarios.length !== 1 ? 's' : ''}
          </Text>
          <TouchableOpacity
            style={styles.smallNewButton}
            onPress={() => navigation.navigate("FuncNovo")}
          >
            <Text style={styles.smallNewButtonText}>+ Novo</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de Funcionários */}
        <FlatList
          data={funcionarios}
          scrollEnabled={false}
          keyExtractor={(item) => item.idFuncionario.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("FuncDetalhes", { funcionario: item })}
            >
              <View style={styles.cardHeader}>
                <View style={styles.userInfo}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {item.nome.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.nameContainer}>
                    <Text style={styles.name}>{item.nome}</Text>
                    <Text style={styles.email}>{item.email}</Text>
                  </View>
                </View>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusBackground(item.status) }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: getStatusColor(item.status) }
                  ]}>
                    {item.status}
                  </Text>
                </View>
              </View>

              <View style={styles.cardDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Cargo:</Text>
                  <Text style={styles.detailValue}>{item.cargo}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Setor:</Text>
                  <Text style={styles.detailValue}>{item.setor}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Telefone:</Text>
                  <Text style={styles.detailValue}>{item.telefone}</Text>
                </View>
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.arrow}>{">"}</Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>Nenhum funcionário encontrado</Text>
              <TouchableOpacity
                style={styles.emptyStateButton}
                onPress={() => navigation.navigate("FuncNovo")}
              >
                <Text style={styles.emptyStateButtonText}>Cadastrar primeiro funcionário</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </ScrollView>
    </View>
  );
}
