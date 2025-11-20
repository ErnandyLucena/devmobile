// screens/Medicos/MedicosList.js
import React from "react";
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet,
  StatusBar
} from "react-native";
import { styles } from "./styles"; 

export default function MedicosListScreen({ navigation }) {
  const medicos = [
    {
      cdPrestador: 330,
      nmPrestador: "JOAO RODRIGUES DE ARAUJO NETO",
      especialidade: "Cardiologia",
      situacao: "Ativo",
    },
    {
      cdPrestador: 331,
      nmPrestador: "MARIA SILVA SANTOS",
      especialidade: "Pediatria",
      situacao: "Disponível",
    },
    {
      cdPrestador: 332,
      nmPrestador: "CARLOS ALBERTO MENDES",
      especialidade: "Ortopedia",
      situacao: "Ausente",
    },
  ];

  const getStatusColor = (situacao) => {
    switch (situacao) {
      case "Disponível":
      case "Ativo":
        return "#38A169";
      case "Ausente":
        return "#D69E2E";
      case "Inativo":
        return "#E53E3E";
      default:
        return "#718096";
    }
  };

  const getStatusBackground = (situacao) => {
    switch (situacao) {
      case "Disponível":
      case "Ativo":
        return "#C6F6D5";
      case "Ausente":
        return "#FEFCBF";
      case "Inativo":
        return "#FED7D7";
      default:
        return "#EDF2F7";
    }
  };

  const renderMedicoCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("MedicosDetalhes", { medico: item })}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.nmPrestador
              .split(' ')
              .map(n => n[0])
              .join('')
              .toUpperCase()
              .substring(0, 2)}
          </Text>
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.name} numberOfLines={1}>
            {item.nmPrestador}
          </Text>
          <Text style={styles.especialidade}>
            {item.especialidade}
          </Text>
        </View>
      </View>
      
      <View style={styles.cardFooter}>
        <View style={[
          styles.statusBadge,
          { backgroundColor: getStatusBackground(item.situacao) }
        ]}>
          <Text style={[
            styles.statusText,
            { color: getStatusColor(item.situacao) }
          ]}>
            {item.situacao}
          </Text>
        </View>
        <Text style={styles.idText}>ID: {item.cdPrestador}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateTitle}>Nenhum médico encontrado</Text>
      <Text style={styles.emptyStateText}>
        Clique no botão "Novo Médico" para adicionar o primeiro médico ao sistema.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7FAFC" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.subtitle}>
            {medicos.length} médico{medicos.length !== 1 ? 's' : ''} cadastrado{medicos.length !== 1 ? 's' : ''}
          </Text>
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
        keyExtractor={(item) => item.cdPrestador.toString()}
        renderItem={renderMedicoCard}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        style={styles.list}
      />
    </View>
  );
}

