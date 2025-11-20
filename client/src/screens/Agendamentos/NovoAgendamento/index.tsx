import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Alert,
  KeyboardAvoidingView,
  Platform 
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";

export function NovoAgendamentoScreen() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    data: "",
    horaInicio: "",
    horaFim: "",
    status: "Confirmado",
    tipoAgendamento: "Consulta",
    observacoes: "",
    idPaciente: "",
    name: "",
    cdPrestador: "330" 
  });

  const handleSalvar = () => {
    // Validação básica
    if (!formData.data || !formData.horaInicio || !formData.horaFim || !formData.name) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios");
      return;
    }

    const agendamentoData = {
      data: formData.data,
      horaInicio: formData.horaInicio,
      horaFim: formData.horaFim,
      status: formData.status,
      tipoAgendamento: formData.tipoAgendamento,
      observacoes: formData.observacoes,
      paciente: {
        idPaciente: parseInt(formData.idPaciente) || 0
      },
      medico: {
        cdPrestador: parseInt(formData.cdPrestador)
      }
    };

    console.log("Dados do agendamento:", agendamentoData);
    // Aqui você faria a chamada para a API
    Alert.alert("Sucesso", "Agendamento criado com sucesso!");
    navigation.goBack();
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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

          {/* Nome do Paciente */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nome do Paciente *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Digite o nome do paciente"
              placeholderTextColor="#A0AEC0"
              value={formData.name}
              onChangeText={(text) => updateField("name", text)}
              returnKeyType="next"
            />
          </View>

          {/* ID do Paciente */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>ID do Paciente (Opcional)</Text>
            <TextInput
              style={styles.textInput}
              placeholder="ID do paciente"
              placeholderTextColor="#A0AEC0"
              keyboardType="numeric"
              value={formData.idPaciente}
              onChangeText={(text) => updateField("idPaciente", text)}
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
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.saveButton,
                (!formData.data || !formData.horaInicio || !formData.horaFim || !formData.name) && 
                styles.saveButtonDisabled
              ]}
              onPress={handleSalvar}
              disabled={!formData.data || !formData.horaInicio || !formData.horaFim || !formData.name}
            >
              <Text style={styles.saveButtonText}>
                {(!formData.data || !formData.horaInicio || !formData.horaFim || !formData.name) 
                  ? "Preencha os campos" 
                  : "Salvar Agendamento"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}