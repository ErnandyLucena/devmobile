import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  KeyboardAvoidingView,
  Platform 
} from "react-native";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "./styles";

export function ReagendarConsultaScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Dados recebidos da tela de detalhes
  const { consulta } = route.params;

  const [formData, setFormData] = useState({
    data: consulta.data,
    horaInicio: consulta.horaInicio,
    horaFim: consulta.horaFim,
    tipo: consulta.tipo,
    observacoes: consulta.observacoes,
  });

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleReagendar = () => {
    Alert.alert("Sucesso", "Consulta reagendada com sucesso!");
    navigation.goBack();
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
        <View style={styles.form}>
          {/* Informações do Paciente */}
          <View style={styles.patientCard}>
            <Text style={styles.patientName}>{consulta.paciente}</Text>
            <Text style={styles.consultInfo}>
              Consulta atual: {consulta.data} • {consulta.horaInicio} - {consulta.horaFim}
            </Text>
          </View>

          {/* Data */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nova Data *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#A0AEC0"
              value={formData.data}
              onChangeText={(text) => updateField("data", text)}
              returnKeyType="next"
            />
          </View>

          {/* Hora início */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nova Hora Início *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="HH:MM"
              placeholderTextColor="#A0AEC0"
              value={formData.horaInicio}
              onChangeText={(text) => updateField("horaInicio", text)}
              returnKeyType="next"
            />
          </View>

          {/* Hora fim */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nova Hora Fim *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="HH:MM"
              placeholderTextColor="#A0AEC0"
              value={formData.horaFim}
              onChangeText={(text) => updateField("horaFim", text)}
              returnKeyType="next"
            />
          </View>

          {/* Tipo */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Tipo de Consulta</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Tipo da consulta"
              placeholderTextColor="#A0AEC0"
              value={formData.tipo}
              onChangeText={(text) => updateField("tipo", text)}
              returnKeyType="next"
            />
          </View>

          {/* Observações */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Observações</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Observações sobre o reagendamento..."
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
                (!formData.data || !formData.horaInicio || !formData.horaFim) && 
                styles.saveButtonDisabled
              ]}
              onPress={handleReagendar}
              disabled={!formData.data || !formData.horaInicio || !formData.horaFim}
            >
              <Text style={styles.saveButtonText}>
                {(!formData.data || !formData.horaInicio || !formData.horaFim) 
                  ? "Preencha os campos" 
                  : "Salvar Reagendamento"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}