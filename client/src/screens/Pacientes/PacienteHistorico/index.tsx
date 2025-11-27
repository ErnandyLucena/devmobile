import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { consultaService } from "../../../services/consulta.service"
import styles from "./styles"; 

export default function HistoricoPacienteScreen() {
    const route = useRoute();
    const navigation = useNavigation();

    const { paciente } = route.params;
    const [historico, setHistorico] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function carregarHistorico() {
            const data = await consultaService.getHistoricoByPacienteId(paciente.cpf);
            setHistorico(data);
            setLoading(false);
        }
        carregarHistorico();
    }, [paciente]);

  return (
  <ScrollView style={styles.container}>
    
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Text style={styles.backText}>← Voltar</Text>
    </TouchableOpacity>

    <Text style={styles.headerTitle}>Histórico do Paciente</Text>

    <View style={styles.infoBox}>
      <Text style={styles.label}>Nome:</Text>
      <Text style={styles.value}>{paciente.nome}</Text>

      <Text style={styles.label}>CPF:</Text>
      <Text style={styles.value}>{paciente.cpf}</Text>

      <Text style={styles.label}>Telefone:</Text>
      <Text style={styles.value}>{paciente.telefone}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{paciente.email}</Text>
    </View>

    <Text style={styles.sectionTitle}>Consultas Concluídas</Text>

    {loading ? (
      <ActivityIndicator size="large" color="#4A90E2" />
    ) : historico.length === 0 ? (
      <Text style={styles.emptyText}>Nenhum histórico encontrado.</Text>
    ) : (
      historico.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.label}>Data concluída:</Text>
          <Text style={styles.value}>{item.dataConclusao}</Text>

          <Text style={styles.label}>Diagnóstico:</Text>
          <Text style={styles.value}>{item.diagnostico || "—"}</Text>

          <Text style={styles.label}>Procedimento realizado:</Text>
          <Text style={styles.value}>{item.procedimentoRealizado || "—"}</Text>

          <Text style={styles.label}>Exames solicitados:</Text>
          <Text style={styles.value}>{item.examesSolicitados || "—"}</Text>

          <Text style={styles.label}>Medicação prescrita:</Text>
          <Text style={styles.value}>{item.medicacaoPrescrita || "—"}</Text>

          <Text style={styles.label}>Observações médicas:</Text>
          <Text style={styles.value}>{item.observacoesMedicas || "—"}</Text>

          <Text style={styles.label}>Médico responsável:</Text>
          <Text style={styles.value}>{item.nomeMedico || "—"}</Text>

          <Text style={styles.label}>Agendamento vinculado:</Text>
          <Text style={styles.value}>{item.agendamentoId}</Text>
        </View>
      ))
    )}
  </ScrollView>
);
}
