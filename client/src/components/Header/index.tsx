import React from "react";
import { View, Text } from "react-native";
import { useAuth } from "../../context/auth/AuthContext";
import { styles } from "./styles";

export function Header() {
  const { user } = useAuth();

  // Função para obter o nome de exibição
  const getDisplayName = () => {
    if (!user) return "Usuário";

    if (user.tipo === "funcionario" && user.nomeCompleto) {
      return user.nomeCompleto;
    }

    if (user.nmMnemonico) return user.nmMnemonico;
    if (user.nmPrestador) return user.nmPrestador;

    return "Usuário";
  };

  // Função para gerar iniciais do avatar
  const getAvatarLetters = () => {
    const displayName = getDisplayName();
    if (!displayName || displayName === "Usuário") return "US";

    const words = displayName.split(" ").filter(word => word.length > 0);
    if (words.length === 0) return "US";
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();

    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  const displayName = getDisplayName();
  const avatarLetters = getAvatarLetters();

  return (
    <View style={styles.header}>
      <View style={styles.userInfo}>
        <View style={styles.textContainer}>
          <Text style={styles.greeting}>Olá, Bem-Vindo</Text>
          <Text style={styles.doctorName} numberOfLines={1}>
            {displayName}
          </Text>
        </View>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{avatarLetters}</Text>
        </View>
      </View>
    </View>
  );
}
