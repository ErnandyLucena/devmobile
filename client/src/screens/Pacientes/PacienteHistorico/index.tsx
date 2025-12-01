import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Linking
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { consultaService } from "../../../services/consulta.service";

export default function HistoricoPacienteScreen() {
  const route = useRoute();
  const { paciente } = route.params;

  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    async function load() {
      const result = await consultaService.getHistoricoByPacienteCpf(paciente.cpf);

      // Ordenar por data mais recente
      result.sort((a, b) => new Date(b.dataConclusao) - new Date(a.dataConclusao));

      setHistorico(result);
      setLoading(false);
    }

    load();
  }, []);

  const toggleCardExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const formatarTelefone = (telefone) => {
    if (!telefone) return "Não informado";

    // Remove todos os caracteres não numéricos
    const numeros = telefone.replace(/\D/g, '');

    // Formata conforme o tamanho
    if (numeros.length === 11) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
    } else if (numeros.length === 10) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
    } else {
      return telefone;
    }
  };

  const fazerLigacao = () => {
    if (paciente.telefone) {
      const numero = paciente.telefone.replace(/\D/g, '');
      Linking.openURL(`tel:${numero}`);
    }
  };

  const enviarWhatsApp = () => {
    if (paciente.telefone) {
      const numero = paciente.telefone.replace(/\D/g, '');
      const mensagem = `Olá ${paciente.nome.split(' ')[0]}, tudo bem?`;
      Linking.openURL(`whatsapp://send?phone=55${numero}&text=${encodeURIComponent(mensagem)}`);
    }
  };

  const renderPacienteInfo = () => (
    <View style={styles.patientCard}>
      <View style={styles.patientHeader}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>
            {paciente.nome.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.patientInfo}>
          <Text style={styles.patientName}>{paciente.nome}</Text>
          <Text style={styles.patientId}>CPF: {paciente.cpf}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.infoGrid}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Telefone</Text>
          <Text style={styles.infoValue}>
            {formatarTelefone(paciente.telefone)}
          </Text>

          {paciente.telefone && (
            <View style={styles.contactButtons}>
              <TouchableOpacity
                style={styles.contactButton}
                onPress={fazerLigacao}
              >
                <Ionicons name="call-outline" size={16} color="#6366F1" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.contactButton}
                onPress={enviarWhatsApp}
              >
                <Ionicons name="logo-whatsapp" size={16} color="#25D366" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Consultas</Text>
          <Text style={styles.infoValue}>{historico.length}</Text>
          <Text style={styles.infoSubtext}>
            {historico.length === 1 ? 'consulta registrada' : 'consultas registradas'}
          </Text>
        </View>
      </View>

      {/* Informações adicionais se disponíveis */}
      {(paciente.email || paciente.dataNascimento) && (
        <>
          <View style={styles.divider} />
          <View style={styles.additionalInfo}>
            {paciente.email && (
              <View style={styles.additionalInfoItem}>
                <Ionicons name="mail-outline" size={14} color="#6B7280" />
                <Text style={styles.additionalInfoText}>{paciente.email}</Text>
              </View>
            )}

            {paciente.dataNascimento && (
              <View style={styles.additionalInfoItem}>
                <Ionicons name="calendar-outline" size={14} color="#6B7280" />
                <Text style={styles.additionalInfoText}>
                  {new Date(paciente.dataNascimento).toLocaleDateString('pt-BR')}
                </Text>
              </View>
            )}
          </View>
        </>
      )}
    </View>
  );

  const renderConsultaCard = (item) => {
    const isExpanded = expandedCard === item.id;
    const formattedDate = new Date(item.dataConclusao).toLocaleDateString("pt-BR", {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.historyCard,
          isExpanded && styles.historyCardExpanded
        ]}
        onPress={() => toggleCardExpand(item.id)}
        activeOpacity={0.9}
      >
        <View style={styles.cardHeader}>
          <View style={styles.dateBadge}>
            <Text style={styles.dateText}>{formattedDate}</Text>
          </View>
          <View style={styles.cardHeaderRight}>
            <Text style={styles.consultType}>Consulta Médica</Text>
            <Ionicons
              name={isExpanded ? "chevron-up" : "chevron-down"}
              size={20}
              color="#6B7280"
            />
          </View>
        </View>

        {isExpanded && (
          <View style={styles.cardContent}>
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Diagnóstico</Text>
              <Text style={styles.fieldValue}>
                {item.diagnostico || "Não informado"}
              </Text>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Procedimento Realizado</Text>
              <Text style={styles.fieldValue}>
                {item.procedimentoRealizado || "Nenhum procedimento registrado"}
              </Text>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Exames Solicitados</Text>
              <Text style={styles.fieldValue}>
                {item.examesSolicitados || "Nenhum exame solicitado"}
              </Text>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Medicação Prescrita</Text>
              <Text style={styles.fieldValue}>
                {item.medicacaoPrescrita || "Nenhuma medicação prescrita"}
              </Text>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Observações Médicas</Text>
              <Text style={styles.fieldValue}>
                {item.observacoesMedicas || "Nenhuma observação adicional"}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.doctorInfo}>
              <View style={styles.doctorAvatar}>
                <Text style={styles.doctorAvatarText}>
                  {item.nomeMedico?.charAt(0) || "M"}
                </Text>
              </View>
              <View>
                <Text style={styles.doctorLabel}>Médico Responsável</Text>
                <Text style={styles.doctorName}>
                  {item.nomeMedico || "Médico não especificado"}
                </Text>

                {item.especialidadeMedico && (
                  <Text style={styles.doctorSpecialty}>
                    {item.especialidadeMedico}
                  </Text>
                )}

              </View>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderPacienteInfo()}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Histórico de Consultas</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{historico.length}</Text>
          </View>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6366F1" />
            <Text style={styles.loadingText}>Carregando histórico...</Text>
          </View>
        ) : historico.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" style={styles.emptyIcon} color="#9CA3AF" />
            <Text style={styles.emptyTitle}>Nenhum histórico encontrado</Text>
            <Text style={styles.emptySubtitle}>
              Este paciente ainda não possui consultas concluídas no sistema
            </Text>
          </View>
        ) : (
          historico.map(renderConsultaCard)
        )}

        <View style={styles.footerSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}