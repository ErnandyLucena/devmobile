import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40, 
  },

  // Estados de carregamento
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#4A5568',
    fontWeight: '500',
  },
  errorText: {
    marginTop: 12,
    fontSize: 16,
    color: '#E53E3E',
    fontWeight: '500',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: "#2B5BFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingBottom: 16,
  },
  patientName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2D3748",
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  statusConfirmed: {
    backgroundColor: "#C6F6D5",
  },
  statusPending: {
    backgroundColor: "#FEEBC8",
  },
  statusCanceled: {
    backgroundColor: "#FED7D7",
  },
  statusCompleted: {
    backgroundColor: "#BEE3F8",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2D3748",
  },
  infoSection: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f8f9fa",
  },
  infoLabel: {
    fontSize: 14,
    color: "#718096",
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 14,
    color: "#4A5568",
    fontWeight: "600",
  },
  observationsSection: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 16,
  },
  observationsLabel: {
    fontSize: 14,
    color: "#718096",
    fontWeight: "600",
    marginBottom: 8,
  },
  observationsText: {
    fontSize: 14,
    color: "#4A5568",
    lineHeight: 20,
  },
  actionsSection: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E53E3E",
    alignItems: "center",
    backgroundColor: "#fff",
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  cancelButtonText: {
    color: "#E53E3E",
    fontSize: 14,
    fontWeight: "600",
  },
  rescheduleButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: "#2B5BFF",
    alignItems: "center",
    shadowColor: "#2B5BFF",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  rescheduleButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  concludeSection: {
    alignItems: "center",
    marginBottom: 16,
  },
  concludeButton: {
    backgroundColor: "#38A169",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#38A169",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    width: "100%",
  },
  concludeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  dangerSection: {
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#E53E3E",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
    gap: 8,
    width: "100%",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});