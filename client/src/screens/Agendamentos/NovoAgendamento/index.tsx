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
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

import { styles } from "./styles";
import { cadastrarAgendamento } from "../../../services/agendamentos.service";
import { getAllPacientes } from "../../../services/pacientes.service";
import MessageModal from "../../../components/MessageContext/MessageContext";

export function NovoAgendamentoScreen() {
  const navigation = useNavigation();

  const [modalMsgVisible, setModalMsgVisible] = useState(false);
  const [modalMsgType, setModalMsgType] = useState("info");
  const [modalMsgText, setModalMsgText] = useState("");

  const openMessage = (type, text) => {
    setModalMsgType(type);
    setModalMsgText(text);
    setModalMsgVisible(true);
  };

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showHoraInicioPicker, setShowHoraInicioPicker] = useState(false);
  const [showHoraFimPicker, setShowHoraFimPicker] = useState(false);

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
    const filtrados = pacientes.filter(
      (p) =>
        p.nome?.toLowerCase().includes(textoLower) ||
        p.cpf?.includes(texto)
    );

    setPacientesFiltrados(filtrados);
  };

  const selecionarPaciente = (paciente) => {
    setFormData((prev) => ({
      ...prev,
      cpfPaciente: paciente.cpf,
      nomePaciente: paciente.nome
    }));
    setModalVisible(false);
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const formatarData = (date) => {
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const ano = date.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const converterDataParaISO = (dataBR) => {
    if (!dataBR) return "";
    const [dia, mes, ano] = dataBR.split("/");
    return `${ano}-${mes}-${dia}`;
  };

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
      openMessage("warning", "Não é possível agendar para uma data anterior a hoje.");
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
        horaFim: `${dataISO}T${formData.horaFim}:00`
      };

      const resultado = await cadastrarAgendamento(dadosParaSalvar);

      if (resultado.success) {
        openMessage("success", "Agendamento criado com sucesso!");

        setTimeout(() => {
          navigation.goBack();
        }, 800);
      }
    } catch (error) {
      openMessage("error", "Erro ao salvar agendamento.");
    } finally {
      setLoading(false);
    }
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
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Paciente *</Text>
          <TouchableOpacity
            style={styles.pacienteSelector}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.pacienteSelecionadoNome}>
              {formData.nomePaciente || "Selecione um paciente"}
            </Text>
            <Ionicons name="chevron-down" size={18} color="#006effff" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Data *</Text>

          <TouchableOpacity
            style={[
              styles.textInput,
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }
            ]}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={{ color: formData.data ? "#000000ff" : "#000000ff" }}>
              {formData.data || "DD/MM/YYYY"}
            </Text>

            <Ionicons name="calendar-outline" size={22} color="#005effff" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Hora Início *</Text>

          <TouchableOpacity
            style={[
              styles.textInput,
              { flexDirection: "row", justifyContent: "space-between" }
            ]}
            onPress={() => setShowHoraInicioPicker(true)}
          >
            <Text style={{ color: formData.horaInicio ? "#000" : "#999" }}>
              {formData.horaInicio || "HH:MM"}
            </Text>

            <Ionicons name="time-outline" size={22} color="#0077ffff" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Hora Fim *</Text>

          <TouchableOpacity
            style={[
              styles.textInput,
              { flexDirection: "row", justifyContent: "space-between" }
            ]}
            onPress={() => setShowHoraFimPicker(true)}
          >
            <Text style={{ color: formData.horaFim ? "#000" : "#999" }}>
              {formData.horaFim || "HH:MM"}
            </Text>

            <Ionicons name="time-outline" size={22} color="#0077ffff" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Observações</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            multiline
            value={formData.observacoes}
            onChangeText={(t) => updateField("observacoes", t)}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSalvar}>
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Text style={styles.saveButtonText}>Salvar</Text>
              <Ionicons name="save-outline" size={20} color="#FFF" />
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
            <Ionicons name="close-circle-outline" size={20} color="#FF0000" />
          </View>
        </TouchableOpacity>
      </ScrollView>

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
              keyExtractor={(item) => item.id}
              renderItem={renderPacienteItem}
            />
          )}
        </View>
      </Modal>

      <MessageModal
        visible={modalMsgVisible}
        message={modalMsgText}
        type={modalMsgType}
        onClose={() => setModalMsgVisible(false)}
      />

      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="spinner"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) updateField("data", formatarData(selectedDate));
          }}
        />
      )}

      {showHoraInicioPicker && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          display="spinner"
          onChange={(event, selectedDate) => {
            setShowHoraInicioPicker(false);
            if (selectedDate) {
              const h = String(selectedDate.getHours()).padStart(2, "0");
              const m = String(selectedDate.getMinutes()).padStart(2, "0");
              updateField("horaInicio", `${h}:${m}`);
            }
          }}
        />
      )}
      
      {showHoraFimPicker && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          display="spinner"
          onChange={(event, selectedDate) => {
            setShowHoraFimPicker(false);
            if (selectedDate) {
              const h = String(selectedDate.getHours()).padStart(2, "0");
              const m = String(selectedDate.getMinutes()).padStart(2, "0");
              updateField("horaFim", `${h}:${m}`);
            }
          }}
        />
      )}
    </KeyboardAvoidingView>
  );
}
