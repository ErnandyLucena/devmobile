import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from "../../context/AuthContext"; 

export function ProfileScreen() {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Profile</Text>

      <View style={styles.userRow}>
        <Ionicons name="person-circle-outline" size={42} color="#2D3ED6" />
        <Text style={styles.name}>Dr Gabriela Borba</Text>
      </View>

      <Text style={styles.label}>Especialidade</Text>
      <View style={styles.box}>
        <TextInput value="Ortopedista" editable={false} style={styles.input} />
      </View>

      <Text style={styles.label}>CRM</Text>
      <View style={styles.box}>
        <TextInput value="343535" editable={false} style={styles.input} />
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Ionicons name="log-out-outline" size={20} color="#333" />
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },

  title: { fontSize: 22, textAlign: "center", fontWeight: "600", marginVertical: 20 },
  name: { fontSize: 18, fontWeight: "600", color: "#2D3ED6", marginLeft: 10 },

  userRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },

  label: { marginTop: 12, marginBottom: 6, fontSize: 14, color: "#333" },

  box: {
    backgroundColor: "#2D3ED6",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  input: { color: "#fff", fontSize: 16 },

  logoutBtn: {
    marginTop: 40,
    backgroundColor: "#E5E5E5",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },

  logoutText: { fontSize: 16, color: "#333" },
});
