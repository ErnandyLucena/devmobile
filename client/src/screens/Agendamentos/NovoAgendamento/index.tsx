import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  Modal,
  FlatList,
  ActivityIndicator
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { styles } from "./styles";
import { cadastrarAgendamento } from "../../../services/agendamentos.service";
import { getAllPacientes } from "../../../services/pacientes.service";

export function NovoAgendamentoScreen() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    data: "",
    horaInicio: "",
    horaFim: "",
    status: "Confirmado",
    tipoAgendamento: "Consulta",
    observacoes: "",
    cpfPaciente: "",
    nomePaciente: ""
  });

  const [pacientes, setPacientes] = useState([]);
  const [pacientesFiltrados, setPacientesFiltrados] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchPaciente, setSearchPaciente] = useState("");
  const [loading, setLoading] = useState(false);
  const [carregandoPacientes, setCarregandoPacientes] = useState(false);

  // Carrega a lista de pacientes
  useEffect(() => {
    carregarPacientes();
  }, []);

  const carregarPacientes = async () => {
    try {
      setCarregandoPacientes(true);
      const pacientesData = await getAllPacientes();
      setPacientes(pacientesData);
      setPacientesFiltrados(pacientesData);
    } catch (error) {
      console.log("Erro ao carregar pacientes:", error);
      Alert.alert("Erro", "Não foi possível carregar a lista de pacientes");
    } finally {
      setCarregandoPacientes(false);
    }
  };

  const filtrarPacientes = (texto) => {
    setSearchPaciente(texto);
    if (texto === "") {
      setPacientesFiltrados(pacientes);
    } else {
      const textoLower = texto.toLowerCase();
      const filtrados = pacientes.filter(paciente => 
        paciente.nome?.toLowerCase().includes(textoLower) ||
        paciente.cpf?.includes(texto)
      );
      setPacientesFiltrados(filtrados);
    }
  };

  const selecionarPaciente = (paciente) => {
    setFormData(prev => ({
      ...prev,
      cpfPaciente: paciente.cpf,
      nomePaciente: paciente.nome
    }));
    setModalVisible(false);
    setSearchPaciente("");
  };

  const formatarCPF = (cpf) => {
    if (!cpf) return "";
    const numbers = cpf.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return numbers.replace(/(\d{3})(\d+)/, '$1.$2');
    if (numbers.length <= 9) return numbers.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatarTelefone = (telefone) => {
    if (!telefone) return "";
    const numbers = telefone.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 6) return numbers.replace(/(\d{2})(\d+)/, '($1) $2');
    if (numbers.length <= 10) return numbers.replace(/(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const validarFormulario = () => {
    if (!formData.data) {
      Alert.alert("Atenção", "Preencha a data do agendamento");
      return false;
    }

    if (!formData.horaInicio) {
      Alert.alert("Atenção", "Preencha a hora de início");
      return false;
    }

    if (!formData.horaFim) {
      Alert.alert("Atenção", "Preencha a hora de fim");
      return false;
    }

    if (!formData.cpfPaciente) {
      Alert.alert("Atenção", "Selecione um paciente");
      return false;
    }

    // Validação de data
    const dataAgendamento = new Date(formData.data);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    if (dataAgendamento < hoje) {
      Alert.alert("Atenção", "Não é possível agendar para datas passadas");
      return false;
    }

    // Validação de horário
    if (formData.horaInicio >= formData.horaFim) {
      Alert.alert("Atenção", "A hora de fim deve ser após a hora de início");
      return false;
    }

    return true;
  };

  const handleSalvar = async () => {
    if (!validarFormulario()) return;

    setLoading(true);
    try {
      const dadosParaSalvar = {
        ...formData,
        data: new Date(formData.data).toISOString(),
        horaInicio: new Date(`2000-01-01T${formData.horaInicio}`).toISOString(),
        horaFim: new Date(`2000-01-01T${formData.horaFim}`).toISOString(),
      };

      const resultado = await cadastrarAgendamento(dadosParaSalvar);

      if (resultado.success) {
        Alert.alert("Sucesso", "Agendamento criado com sucesso!");
        navigation.goBack();
      } else {
        throw new Error(resultado.error);
      }
    } catch (error) {
      console.log("Erro ao criar agendamento:", error);
      Alert.alert("Erro", "Não foi possível criar o agendamento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderPacienteItem = ({ item }) => (
    <TouchableOpacity
      style={styles.pacienteItem}
      onPress={() => selecionarPaciente(item)}
    >
      <View style={styles.pacienteInfo}>
        <Text style={styles.pacienteNome}>{item.nome}</Text>
        <Text style={styles.pacienteCpf}>{formatarCPF(item.cpf)}</Text>
        <Text style={styles.pacienteTelefone}>{formatarTelefone(item.telefone)}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color="#A0AEC0" />
    </TouchableOpacity>
  );

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
        {/* Formulário */}
        <View style={styles.form}>
          {/* Paciente */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Paciente *</Text>
            <TouchableOpacity
              style={styles.pacienteSelector}
              onPress={() => setModalVisible(true)}
            >
              {formData.nomePaciente ? (
                <View>
                  <Text style={styles.pacienteSelecionadoNome}>{formData.nomePaciente}</Text>
                  <Text style={styles.pacienteSelecionadoCpf}>{formatarCPF(formData.cpfPaciente)}</Text>
                </View>
              ) : (
                <Text style={styles.pacientePlaceholder}>Selecione um paciente</Text>
              )}
              <Ionicons name="chevron-down" size={16} color="#A0AEC0" />
            </TouchableOpacity>
          </View>

          {/* Data */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Data *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#A0AEC0"
              value={formData.data}
              onChangeText={(text) => updateField("data", text)}
              returnKeyType="next"
            />
          </View>

          {/* Horário Início */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Hora Início *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="HH:MM"
              placeholderTextColor="#A0AEC0"
              value={formData.horaInicio}
              onChangeText={(text) => updateField("horaInicio", text)}
              returnKeyType="next"
            />
          </View>

          {/* Horário Fim */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Hora Fim *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="HH:MM"
              placeholderTextColor="#A0AEC0"
              value={formData.horaFim}
              onChangeText={(text) => updateField("horaFim", text)}
              returnKeyType="next"
            />
          </View>

          {/* Status */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Status</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Status do agendamento"
              placeholderTextColor="#A0AEC0"
              value={formData.status}
              onChangeText={(text) => updateField("status", text)}
              returnKeyType="next"
            />
          </View>

          {/* Tipo de Agendamento */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Tipo de Agendamento</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Tipo de agendamento"
              placeholderTextColor="#A0AEC0"
              value={formData.tipoAgendamento}
              onChangeText={(text) => updateField("tipoAgendamento", text)}
              returnKeyType="next"
            />
          </View>

          {/* Observações */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Observações</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Observações do agendamento..."
              placeholderTextColor="#A0AEC0"
              multiline
              numberOfLines={4}
              value={formData.observacoes}
              onChangeText={(text) => updateField("observacoes", text)}
              textAlignVertical="top"
              returnKeyType="done"
            />
          </View>

          {/* Botões */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
              disabled={loading}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.saveButton,
                (!formData.data || !formData.horaInicio || !formData.horaFim || !formData.cpfPaciente) && 
                styles.saveButtonDisabled
              ]}
              onPress={handleSalvar}
              disabled={!formData.data || !formData.horaInicio || !formData.horaFim || !formData.cpfPaciente || loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.saveButtonText}>
                  {(!formData.data || !formData.horaInicio || !formData.horaFim || !formData.cpfPaciente) 
                    ? "Preencha os campos" 
                    : "Salvar Agendamento"}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Modal de Seleção de Paciente */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Selecionar Paciente</Text>
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => {
                setModalVisible(false);
                setSearchPaciente("");
              }}
            >
              <Ionicons name="close" size={24} color="#2D3748" />
            </TouchableOpacity>
          </View>

          {/* Barra de busca */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar por nome ou CPF..."
              value={searchPaciente}
              onChangeText={filtrarPacientes}
              placeholderTextColor="#A0AEC0"
            />
            <Ionicons name="search" size={20} color="#A0AEC0" />
          </View>

          {/* Lista de pacientes */}
          {carregandoPacientes ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#2B5BFF" />
              <Text style={styles.loadingText}>Carregando pacientes...</Text>
            </View>
          ) : (
            <FlatList
              data={pacientesFiltrados}
              keyExtractor={(item) => item.id}
              renderItem={renderPacienteItem}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>
                    {searchPaciente ? "Nenhum paciente encontrado" : "Nenhum paciente cadastrado"}
                  </Text>
                </View>
              }
            />
          )}
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}