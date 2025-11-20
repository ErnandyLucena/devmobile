import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2B5BFF",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2B5BFF",
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  // Nova linha para título e botão lado a lado
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2D3748",
  },
  // Botão menor ao lado do título
  smallNewButton: {
    backgroundColor: "#2B5BFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  smallNewButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  // Remove o botão grande anterior
  // newButton: { ... },
  // newButtonText: { ... },

  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#2B5BFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2D3748",
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 80,
    alignItems: "center",
  },
  statusConfirmed: {
    backgroundColor: "#C6F6D5",
  },
  statusPending: {
    backgroundColor: "#FEEBC8",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2D3748",
  },
  cardInfo: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 14,
    color: "#718096",
    fontWeight: "500",
    width: 70,
  },
  infoValue: {
    fontSize: 14,
    color: "#4A5568",
    fontWeight: "400",
    flex: 1,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  observations: {
    fontSize: 12,
    color: "#A0AEC0",
    fontStyle: "italic",
    flex: 1,
    marginRight: 8,
  },
  arrow: {
    color: "#718096",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyState: {
    alignItems: "center",
    padding: 40,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginTop: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#718096",
    marginBottom: 16,
    textAlign: "center",
  },
  emptyStateButton: {
    backgroundColor: "#2B5BFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyStateButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});