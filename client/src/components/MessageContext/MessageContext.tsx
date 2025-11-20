import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
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
      case "success": return "✅";
      case "error": return "❌";
      case "warning": return "⚠️";
      default: return "ℹ️";
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
          {/* Ícone do tipo */}
          <View style={[styles.iconContainer, { backgroundColor: getColor() }]}>
            <Text style={styles.icon}>{getIcon()}</Text>
          </View>

          {/* Mensagem */}
          <Text style={styles.title}>
            {type === "success" && "Sucesso!"}
            {type === "error" && "Erro!"}
            {type === "warning" && "Atenção!"}
            {type === "info" && "Informação"}
          </Text>
          
          <Text style={styles.message}>{message}</Text>

          {/* Botão */}
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