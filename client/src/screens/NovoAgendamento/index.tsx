import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { Header } from "../../components/Header";

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
    cdPrestador: "330" 
  });

  const handleSalvar = () => {
    // Validação básica
    if (!formData.data || !formData.horaInicio || !formData.horaFim || !formData.idPaciente) {
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
        idPaciente: parseInt(formData.idPaciente)
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
    <View style={styles.container}>
      <Header />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.form}>
          <Text style={styles.title}>Novo Agendamento</Text>

          {/* Data */}
          <View style={styles.field}>
            <Text style={styles.label}>Data *</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                value={formData.data}
                onChangeText={(text) => updateField("data", text)}
              />
            </View>
          </View>

          {/* Horário Início */}
          <View style={styles.field}>
            <Text style={styles.label}>Hora Início *</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="HH:MM"
                value={formData.horaInicio}
                onChangeText={(text) => updateField("horaInicio", text)}
              />
            </View>
          </View>

          {/* Horário Fim */}
          <View style={styles.field}>
            <Text style={styles.label}>Hora Fim *</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="HH:MM"
                value={formData.horaFim}
                onChangeText={(text) => updateField("horaFim", text)}
              />
            </View>
          </View>

          {/* Status */}
          <View style={styles.field}>
            <Text style={styles.label}>Status</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={formData.status}
                onChangeText={(text) => updateField("status", text)}
              />
            </View>
          </View>

          {/* Tipo de Agendamento */}
          <View style={styles.field}>
            <Text style={styles.label}>Tipo de Agendamento</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={formData.tipoAgendamento}
                onChangeText={(text) => updateField("tipoAgendamento", text)}
              />
            </View>
          </View>

          {/* ID do Paciente */}
          <View style={styles.field}>
            <Text style={styles.label}>ID do Paciente *</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="ID do paciente"
                keyboardType="numeric"
                value={formData.idPaciente}
                onChangeText={(text) => updateField("idPaciente", text)}
              />
            </View>
          </View>

          {/* Observações */}
          <View style={styles.field}>
            <Text style={styles.label}>Observações</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Observações do agendamento"
              multiline
              numberOfLines={4}
              value={formData.observacoes}
              onChangeText={(text) => updateField("observacoes", text)}
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
              style={styles.saveButton}
              onPress={handleSalvar}
            >
              <Text style={styles.saveButtonText}>Salvar Agendamento</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}