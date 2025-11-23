import { View, Text } from "react-native";
import { styles } from "./styles";
import { useAuth } from "../../context/auth/AuthContext";

export function Header() {
  const { user } = useAuth();

  // DEBUG - Verifique o que está vindo no user
  console.log("🔍 Header - user data:", user);

  // Função para obter o nome de exibição
  const getDisplayName = () => {
    if (!user) {
      console.log("❌ Header: Nenhum usuário logado");
      return "Usuário";
    }

    if (user.tipo === "medico") {
      return user.nomeAbreviado || user.nomeCompleto || user.nomeComplete || "Médico";
    }

    return user.nomeCompleto || user.nomeComplete || user.nomeAbreviado || "Funcionário";
  };

  // Função para gerar iniciais do avatar
  const getAvatarLetters = () => {
    const displayName = getDisplayName();
    
    if (!displayName || displayName === "Usuário" || displayName === "Médico" || displayName === "Funcionário") {
      return "US";
    }

    try {
      const words = displayName.split(' ').filter(word => word.length > 0);
      
      if (words.length === 0) return "US";
      if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
      
      return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    } catch (error) {
      return "US";
    }
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