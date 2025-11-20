import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";

export function AgendamentosScreen() {
  const navigation = useNavigation();

  // MOCK — depois você troca pela API
  const agendamentos = [
    {
      id: 1,
      paciente: "Maria Silva",
      data: "2025-02-20",
      horaInicio: "14:00",
      horaFim: "14:30",
      status: "Confirmado",
      tipo: "Consulta",
      observacoes: "Levar exames anteriores.",
    },
    {
      id: 2,
      paciente: "João Pereira",
      data: "2025-02-22",
      horaInicio: "09:00",
      horaFim: "09:30",
      status: "Pendente",
      tipo: "Retorno",
      observacoes: "",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header Personalizado com Seta de Voltar */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Agendamentos</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Cabeçalho com título e botão lado a lado */}
          <View style={styles.headerRow}>
            <Text style={styles.sectionTitle}>Todos os Agendamentos</Text>
            <TouchableOpacity
              style={styles.smallNewButton}
              onPress={() => navigation.navigate("NovoAgendamento")}
            >
              <Text style={styles.smallNewButtonText}>+ Novo</Text>
            </TouchableOpacity>
          </View>
          
          {/* Lista de Agendamentos */}
          {agendamentos.length > 0 ? (
            agendamentos.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() =>
                  navigation.navigate("DetalhesConsulta", {
                    consulta: item,
                  })
                }
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{item.paciente}</Text>
                  <View style={[
                    styles.statusBadge,
                    item.status === 'Confirmado' ? styles.statusConfirmed : styles.statusPending
                  ]}>
                    <Text style={styles.statusText}>{item.status}</Text>
                  </View>
                </View>
                
                <View style={styles.cardInfo}>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Data:</Text>
                    <Text style={styles.infoValue}>{item.data}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Horário:</Text>
                    <Text style={styles.infoValue}>{item.horaInicio} - {item.horaFim}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Tipo:</Text>
                    <Text style={styles.infoValue}>{item.tipo}</Text>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <Text style={styles.observations}>
                    {item.observacoes || "Sem observações"}
                  </Text>
                  <Text style={styles.arrow}>{">"}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>Nenhum agendamento encontrado</Text>
              <TouchableOpacity
                style={styles.emptyStateButton}
                onPress={() => navigation.navigate("NovoAgendamento")}
              >
                <Text style={styles.emptyStateButtonText}>Criar primeiro agendamento</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}