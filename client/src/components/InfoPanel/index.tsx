import { View, Text } from "react-native";
import { styles } from "./styles";

interface InfoPanelProps {
  value: string;
  label: string;
}

export function InfoPanel({ value, label }: InfoPanelProps) {
  return (
    <View style={styles.box}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}
