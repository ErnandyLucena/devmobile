import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  // Botão voltar
  backButton: {
    marginBottom: 18,
  },
  backText: {
    fontSize: 16,
    color: "#4A90E2",
    fontWeight: "600",
  },

  // Títulos
  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 12,
    marginTop: 10,
  },

  // Informações do paciente
  infoBox: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 25,
  },

  label: {
    fontSize: 14,
    color: "#555",
    fontWeight: "600",
    marginTop: 10,
  },

  value: {
    fontSize: 16,
    color: "#111",
    marginTop: 4,
    fontWeight: "500",
  },

  // Cards de histórico
  card: {
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 14,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    borderWidth: 1,
    borderColor: "#ECECEC",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  }
});
