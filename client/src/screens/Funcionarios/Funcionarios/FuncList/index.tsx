// screens/Funcionarios/FuncList.tsx
import React from "react";
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  ScrollView 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";

export default function FuncListScreen() {
  const navigation = useNavigation();

  const funcionarios = [
    {
      idFuncionario: 501,
      nome: "Carla Menezes",
      cargo: "Atendente",
      setor: "Recepção",
      status: "Ativo",
      email: "carla.menezes@clinica.com",
      telefone: "(11) 98877-6655"
    },
    {
      idFuncionario: 502,
      nome: "João Silva",
      cargo: "Enfermeiro",
      setor: "Enfermaria",
      status: "Ativo",
      email: "joao.silva@clinica.com",
      telefone: "(11) 97766-5544"
    },
    {
      idFuncionario: 503,
      nome: "Maria Santos",
      cargo: "Administradora",
      setor: "Administração",
      status: "Inativo",
      email: "maria.santos@clinica.com",
      telefone: "(11) 96655-4433"
    }
  ];

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