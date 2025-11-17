import { View, Text } from "react-native";
import {styles}  from "./styles";

export function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.greeting}>Olá, Bem-Vindo</Text>
      <Text style={styles.doctorName}>Dr Gabriela Borba</Text>
    </View>
  );
}
