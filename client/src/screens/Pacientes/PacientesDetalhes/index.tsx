import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles'; 
import { getPacienteById } from '../../../services/pacientes.service'; 

export default function DetalhesPacienteScreen({ route, navigation }) {
  const { pacienteId } = route.params;
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarPaciente();
  }, [pacienteId]);

  const carregarPaciente = async () => {
    try {
      setLoading(true);
      const pacienteData = await getPacienteById(pacienteId);
      setPaciente(pacienteData);
    } catch (error) {
      console.log('Erro ao carregar paciente:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados do paciente');
    } finally {
      setLoading(false);
    }
  };

  const handleEditar = () => {
    navigation.navigate('PacientesEditar', { 
      paciente: paciente,
      onPacienteAtualizado: carregarPaciente 
    });
  };

  const handleVoltar = () => {
    navigation.goBack();
  };

  const getIniciais = (nome) => {
    if (!nome) return '??';
    return nome
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getCorAvatar = (nome) => {
    const cores = [
      '#2B5BFF', '#3182CE', '#38A169', '#DD6B20', 
      '#E53E3E', '#805AD5', '#D53F8C', '#319795'
    ];
    const index = nome ? nome.charCodeAt(0) % cores.length : 0;
    return cores[index];
  };

  const formatarData = (timestamp) => {
    if (!timestamp) return 'Data não disponível';
    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleDateString('pt-BR');
    }
    return 'Data não disponível';
  };

  const formatarTelefone = (telefone) => {
    if (!telefone) return 'Não informado';
    const numeros = telefone.replace(/\D/g, '');
    
    if (numeros.length === 11) {
      return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (numeros.length === 10) {
      return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    
    return telefone;
  };

  const formatarCPF = (cpf) => {
    if (!cpf) return 'Não informado';
    const numeros = cpf.replace(/\D/g, '');
    
    if (numeros.length === 11) {
      return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    
    return cpf;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2B5BFF" />
        <Text style={styles.loadingText}>Carregando dados do paciente...</Text>
      </View>
    );
  }

  if (!paciente) {
    return (
      <View style={styles.loadingContainer}>
        <Ionicons name="alert-circle-outline" size={48} color="#E53E3E" />
        <Text style={styles.errorText}>Paciente não encontrado</Text>
        <TouchableOpacity style={styles.backButton} onPress={handleVoltar}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7FAFC" />
    
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainCard}>
          <View style={styles.avatarSection}>
            <View 
              style={[
                styles.avatar, 
                { backgroundColor: getCorAvatar(paciente.nome) }
              ]}
            >
              <Text style={styles.avatarText}>
                {getIniciais(paciente.nome)}
              </Text>
            </View>
            <View style={styles.nameSection}>
              <Text style={styles.name} numberOfLines={2}>
                {paciente.nome || 'Nome não informado'}
              </Text>
              <View style={[styles.statusBadge, { backgroundColor: '#E6FFFA' }]}>
                <Ionicons name="checkmark-circle" size={12} color="#234E52" />
                <Text style={[styles.statusText, { color: '#234E52' }]}>
                  Ativo
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.infoSection}>
            <View style={styles.sectionHeader}>
              <Ionicons name="person-outline" size={20} color="#4A5568" />
              <Text style={styles.sectionTitle}>Informações Pessoais</Text>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Ionicons name="card-outline" size={16} color="#718096" />
                <Text style={styles.infoLabel}>CPF</Text>
              </View>
              <Text style={styles.infoValue}>
                {formatarCPF(paciente.cpf)}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Ionicons name="mail-outline" size={16} color="#718096" />
                <Text style={styles.infoLabel}>Email</Text>
              </View>
              <Text style={styles.infoValue}>
                {paciente.email || 'Não informado'}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Ionicons name="call-outline" size={16} color="#718096" />
                <Text style={styles.infoLabel}>Telefone</Text>
              </View>
              <Text style={styles.infoValue}>
                {formatarTelefone(paciente.telefone)}
              </Text>
            </View>
          </View>

          <View style={styles.infoSection}>
            <View style={styles.sectionHeader}>
              <Ionicons name="fingerprint-outline" size={20} color="#4A5568" />
              <Text style={styles.sectionTitle}>Identificação</Text>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Ionicons name="key-outline" size={16} color="#718096" />
                <Text style={styles.infoLabel}>ID do Paciente</Text>
              </View>
              <Text style={[styles.infoValue, styles.idText]}>
                {paciente.id}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Ionicons name="calendar-outline" size={16} color="#718096" />
                <Text style={styles.infoLabel}>Cadastrado em</Text>
              </View>
              <Text style={styles.infoValue}>
                {formatarData(paciente.criadoEm)}
              </Text>
            </View>

            {paciente.atualizadoEm && (
              <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
                <View style={styles.infoLabelContainer}>
                  <Ionicons name="refresh-outline" size={16} color="#718096" />
                  <Text style={styles.infoLabel}>Atualizado em</Text>
                </View>
                <Text style={styles.infoValue}>
                  {formatarData(paciente.atualizadoEm)}
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={handleEditar}
        >
          <Text style={styles.editButtonText}>Editar Paciente</Text>
          <Ionicons name="create-outline" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}