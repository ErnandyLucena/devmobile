import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "./styles";
import React, { useState } from "react";
import MessageModal from "../../../components/MessageContext/MessageContext";

export function DetalhesConsultaScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);

  const { consulta } = route.params as {
    consulta: {
      id: number;
      paciente: string;
      data: string;
      horaInicio: string;
      horaFim: string;
      status: string;
      tipo: string;
      observacoes: string;
    };
  };

  return (
    <View style={styles.container}>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Card de Informações */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.patientName}>{consulta.paciente}</Text>
            <View style={[
              styles.statusBadge,
              consulta.status === 'Confirmado' ? styles.statusConfirmed : 
              consulta.status === 'Pendente' ? styles.statusPending : styles.statusCanceled
            ]}>
              <Text style={styles.statusText}>{consulta.status}</Text>
            </View>
          </View>

          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Data</Text>
              <Text style={styles.infoValue}>{consulta.data}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Horário</Text>
              <Text style={styles.infoValue}>{consulta.horaInicio} - {consulta.horaFim}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Tipo</Text>
              <Text style={styles.infoValue}>{consulta.tipo}</Text>
            </View>
          </View>

          {/* Observações */}
          <View style={styles.observationsSection}>
            <Text style={styles.observationsLabel}>Observações</Text>
            <Text style={styles.observationsText}>
              {consulta.observacoes || "Nenhuma observação registrada."}
            </Text>
          </View>
        </View>

        {/* Ações (Cancelar e Reagendar) */}
        <View style={styles.actionsSection}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.cancelButtonText}>Cancelar Consulta</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.rescheduleButton}
            onPress={() => navigation.navigate("ReagendarConsulta", { consulta })}
          >
            <Text style={styles.rescheduleButtonText}>Reagendar Consulta</Text>
          </TouchableOpacity>
        </View>

        {/* Botão Concluir Consulta - Agora dentro do ScrollView */}
        <View style={styles.concludeSection}>
          <TouchableOpacity
            style={styles.concludeButton}
            onPress={() => navigation.navigate("ConcluirConsulta", { consulta })}
          >
            <Text style={styles.concludeButtonText}>Concluir Consulta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal de mensagem */}
      <MessageModal
        visible={modalVisible}
        message="Consulta cancelada com sucesso!"
        type="success"
        onClose={() => {
          setModalVisible(false);
          navigation.goBack();  
        }}
      />
    </View>
  );
}