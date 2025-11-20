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
    marginBottom: 20,
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
});