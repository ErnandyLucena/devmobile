import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 60,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },

  loadingText: {
    marginTop: 10,
    color: "#555",
    fontSize: 16,
  },

  /* CARD PRINCIPAL */
  mainCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },

  /* AVATAR + NOME */
  avatarSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: "#2B5BFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  avatarText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
  },

  nameSection: {
    flex: 1,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
  },

  statusBadge: {
    marginTop: 6,
    backgroundColor: "#E2E8F0",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#555",
  },

  /* SEÇÃO DE INFORMAÇÕES */
  infoSection: {
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
    marginBottom: 10,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  infoLabel: {
    fontSize: 14,
    color: "#777",
    width: 110,
  },

  infoValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
    textAlign: "right",
    flex: 1,
  },

  /* BOTÕES */
  actionsSection: {
    marginTop: 10,
    gap: 14,
  },

  editButton: {
    backgroundColor: "#2B5BFF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  archiveButton: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#E53E3E",
  },

  archiveButtonText: {
    color: "#E53E3E",
    fontSize: 16,
    fontWeight: "600",
  },
  // 🔽 Cole abaixo dos estilos já existentes:

modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  justifyContent: "center",
  alignItems: "center",
},

modalContainer: {
  width: "85%",
  backgroundColor: "#fff",
  borderRadius: 12,
  padding: 20,
  elevation: 10,
  shadowColor: "#000",
  shadowOpacity: 0.25,
  shadowRadius: 4,
},

modalTitle: {
  fontSize: 20,
  fontWeight: "bold",
  color: "#333",
  textAlign: "center",
  marginBottom: 10,
},

modalMessage: {
  fontSize: 16,
  color: "#555",
  textAlign: "center",
  marginBottom: 25,
},

modalButtons: {
  flexDirection: "row",
  justifyContent: "space-between",
},

modalCancelButton: {
  flex: 1,
  paddingVertical: 12,
  marginRight: 10,
  borderRadius: 8,
  backgroundColor: "#E0E0E0",
  alignItems: "center",
},

modalCancelText: {
  color: "#333",
  fontSize: 16,
  fontWeight: "bold",
},

modalDeleteButton: {
  flex: 1,
  paddingVertical: 12,
  marginLeft: 10,
  borderRadius: 8,
  backgroundColor: "#E53E3E",
  alignItems: "center",
},

modalDeleteText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "bold",
},
});
