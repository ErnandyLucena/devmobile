import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { styles } from "./styles"; 

interface MessageModalProps {
  visible: boolean;
  message: string;
  type?: "success" | "error" | "warning" | "info";
  onClose: () => void;
}

export default function MessageModal({ 
  visible, 
  message, 
  type = "info", 
  onClose 
}: MessageModalProps) {
  
  const getIcon = () => {
    switch (type) {
      case "success": return "checkmark-circle";
      case "error": return "close-circle";
      case "warning": return "warning";
      default: return "information-circle";
    }
  };

  const getColor = () => {
    switch (type) {
      case "success": return "#38A169";
      case "error": return "#E53E3E";
      case "warning": return "#D69E2E";
      default: return "#2B5BFF";
    }
  };

  return (
    <Modal 
      transparent 
      visible={visible} 
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>

          <View style={[styles.iconContainer, { backgroundColor: getColor() }]}>
            <Ionicons name={getIcon()} size={32} color="#FFFFFF" />
          </View>

          <Text style={styles.title}>
            {type === "success" && "Sucesso!"}
            {type === "error" && "Erro!"}
            {type === "warning" && "Atenção!"}
            {type === "info" && "Informação"}
          </Text>
          
          <Text style={styles.message}>{message}</Text>

          <TouchableOpacity 
            style={[styles.button, { backgroundColor: getColor() }]} 
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}