// components/ConfirmationModal/ConfirmationModal.tsx
import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

interface ConfirmationModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "warning" | "danger" | "info";
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationModal({
  visible,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  type = "warning",
  onConfirm,
  onCancel
}: ConfirmationModalProps) {
  
  const getIcon = () => {
    switch (type) {
      case "warning": return "⚠️";
      case "danger": return "🚨";
      default: return "ℹ️";
    }
  };

  const getColor = () => {
    switch (type) {
      case "warning": return "#D69E2E";
      case "danger": return "#E53E3E";
      default: return "#2B5BFF";
    }
  };

  const getConfirmButtonStyle = () => {
    switch (type) {
      case "warning": return styles.warningButton;
      case "danger": return styles.dangerButton;
      default: return styles.primaryButton;
    }
  };

  return (
    <Modal 
      transparent 
      visible={visible} 
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Ícone do tipo */}
          <View style={[styles.iconContainer, { backgroundColor: getColor() }]}>
            <Text style={styles.icon}>{getIcon()}</Text>
          </View>

          {/* Título e Mensagem */}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          {/* Botões */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={onCancel}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelButtonText}>{cancelText}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.confirmButton, getConfirmButtonStyle()]} 
              onPress={onConfirm}
              activeOpacity={0.8}
            >
              <Text style={styles.confirmButtonText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}