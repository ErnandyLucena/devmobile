import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  daySelectorContainer: {
    marginTop: 30,
    paddingHorizontal: 10,
  },

  infoPanelsSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 20,
    gap: 10,
  },

  // Estilos para Ações Rápidas
  quickActionsSection: {
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: "700",
    color: "#2D3748",
    marginBottom: 16,
  },
  
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  
  actionButton: {
    width: '48%', // Para 2 colunas
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 12,
  },
  
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  
  actionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4A5568",
    textAlign: "center",
  },
  
  // Estilo para estado vazio (opcional)
  emptyState: {
    alignItems: "center",
    padding: 24,
    backgroundColor: "#F7FAFC",
    borderRadius: 12,
    marginTop: 16,
  },
  
  emptyStateText: {
    fontSize: 14,
    color: "#718096",
    marginBottom: 12,
    textAlign: "center",
  },
  
  scheduleButton: {
    backgroundColor: "#2B5BFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  
  scheduleButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});