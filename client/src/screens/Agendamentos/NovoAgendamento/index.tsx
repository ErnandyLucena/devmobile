// ------------- NovoAgendamentoScreen.js 100% corrigido com MessageModal -------------
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
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
import MessageModal from "../../../components/MessageContext/MessageContext";

export function NovoAgendamentoScreen() {
  const navigation = useNavigation();

  // 🔵 Estado do modal de mensagens
  const [modalMsgVisible, setModalMsgVisible] = useState(false);
  const [modalMsgType, setModalMsgType] = useState("info");
  const [modalMsgText, setModalMsgText] = useState("");

  const openMessage = (type, text) => {
    setModalMsgType(type);
    setModalMsgText(text);
    setModalMsgVisible(true);
  };

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

  // Carregar pacientes
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
      openMessage("error", "Erro ao carregar pacientes.");
    } finally {
      setCarregandoPacientes(false);
    }
  };

  const filtrarPacientes = (texto) => {
    setSearchPaciente(texto);
    if (!texto) return setPacientesFiltrados(pacientes);

    const textoLower = texto.toLowerCase();
    const filtrados = pacientes.filter(p =>
      p.nome?.toLowerCase().includes(textoLower) ||
      p.cpf?.includes(texto)
    );

    setPacientesFiltrados(filtrados);
  };

  const selecionarPaciente = (paciente) => {
    setFormData(prev => ({
      ...prev,
      cpfPaciente: paciente.cpf,
      nomePaciente: paciente.nome
    }));
    setModalVisible(false);
  };

  const converterDataParaISO = (dataBR) => {
    if (!dataBR) return "";
    const partes = dataBR.split("/");
    if (partes.length !== 3) return "";
    const [dia, mes, ano] = partes;
    return `${ano}-${mes}-${dia}`;
  };

  // 🔵 Todas mensagens agora usam o modal
  const validarFormulario = () => {
    if (!formData.data) {
      openMessage("warning", "Preencha a data.");
      return false;
    }

    if (!formData.horaInicio || !formData.horaFim) {
      openMessage("warning", "Preencha os horários.");
      return false;
    }

    if (!formData.cpfPaciente) {
      openMessage("warning", "Selecione um paciente.");
      return false;
    }

    const dataISO = converterDataParaISO(formData.data);
    const dataAgendamento = new Date(dataISO);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    if (dataAgendamento < hoje) {
      openMessage("warning", "Não é possível agendar para datas passadas.");
      return false;
    }

    if (formData.horaInicio >= formData.horaFim) {
      openMessage("warning", "Hora final deve ser maior que a inicial.");
      return false;
    }

    return true;
  };

  const handleSalvar = async () => {
    if (!validarFormulario()) return;

    setLoading(true);

    try {
      const dataISO = converterDataParaISO(formData.data);

      const dadosParaSalvar = {
        ...formData,
        data: dataISO,
        horaInicio: `${dataISO}T${formData.horaInicio}:00`,
        horaFim: `${dataISO}T${formData.horaFim}:00`,
      };

      const resultado = await cadastrarAgendamento(dadosParaSalvar);

      if (resultado.success) {
        openMessage("success", "Agendamento criado com sucesso!");

        setTimeout(() => {
          navigation.goBack();
        }, 800);
      }
    } catch (error) {
      openMessage("error", "Falha ao salvar agendamento.");
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
      <View>
        <Text style={styles.pacienteNome}>{item.nome}</Text>
        <Text style={styles.pacienteCpf}>{item.cpf}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color="#A0AEC0" />
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.scrollView}>
        
        {/* Paciente */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Paciente *</Text>
          <TouchableOpacity
            style={styles.pacienteSelector}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.pacienteSelecionadoNome}>
              {formData.nomePaciente || "Selecione um paciente"}
            </Text>
            <Ionicons name="chevron-down" size={16} color="#A0AEC0" />
          </TouchableOpacity>
        </View>

        {/* Data */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Data *</Text>
          <TextInput
            style={styles.textInput}
            placeholder="DD/MM/YYYY"
            value={formData.data}
            onChangeText={text => updateField("data", text)}
          />
        </View>

        {/* Hora Início */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Hora Início *</Text>
          <TextInput
            style={styles.textInput}
            placeholder="HH:MM"
            value={formData.horaInicio}
            onChangeText={text => updateField("horaInicio", text)}
          />
        </View>

        {/* Hora Fim */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Hora Fim *</Text>
          <TextInput
            style={styles.textInput}
            placeholder="HH:MM"
            value={formData.horaFim}
            onChangeText={text => updateField("horaFim", text)}
          />
        </View>

        {/* Observações */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Observações</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            multiline
            value={formData.observacoes}
            onChangeText={text => updateField("observacoes", text)}
          />
        </View>

        {/* Botão salvar */}
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSalvar}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.saveButtonText}>Salvar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Modal Pacientes */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>

          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Selecionar Paciente</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.searchInput}
            placeholder="Buscar..."
            value={searchPaciente}
            onChangeText={filtrarPacientes}
          />

          {carregandoPacientes ? (
            <ActivityIndicator size="large" />
          ) : (
            <FlatList
              data={pacientesFiltrados}
              keyExtractor={item => item.id}
              renderItem={renderPacienteItem}
            />
          )}

        </View>
      </Modal>

      {/* 🔵 Modal de Mensagens */}
      <MessageModal
        visible={modalMsgVisible}
        message={modalMsgText}
        type={modalMsgType}
        onClose={() => setModalMsgVisible(false)}
      />
    </KeyboardAvoidingView>
  );
}
