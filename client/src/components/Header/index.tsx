// Header.tsx (versão simples)
import { View, Text } from "react-native";
import { styles } from "./styles";

export function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.userInfo}>
        <View style={styles.textContainer}>
          <Text style={styles.greeting}>Olá, Bem-Vindo</Text>
          <Text style={styles.doctorName}>Dr. Gabriela Borba</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>GB</Text>
        </View>
      </View>
    </View>
  );
}