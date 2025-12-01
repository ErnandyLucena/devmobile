import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  /* ================================
   *   CONTAINER PRINCIPAL
   * ================================ */
  container: {
    flex: 1,
    backgroundColor: "#F7FAFC",
  },

  /* ================================
   *   HEADER
   * ================================ */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: "#F7FAFC",
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2D3748",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#718096",
    fontWeight: "500",
  },

  /* ================================
   *   BOTÃO "NOVO"
   * ================================ */
  novoBtn: {
    backgroundColor: "#2B5BFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: "#2B5BFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    minWidth: 120,
  },
  novoTxt: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },

  /* ================================
   *   LISTA
   * ================================ */
  list: { flex: 1 },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  /* ================================
   *   CARDS
   * ================================ */
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },

  cardInactive: {
    backgroundColor: "#F7FAFC",
    borderColor: "#E2E8F0",
    opacity: 0.8,
  },

  cardArquivado: {
    backgroundColor: "#F7FAFC",
    borderColor: "#E2E8F0",
    opacity: 0.7,
  },

  /* ===== Header do Card ===== */
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2B5BFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarInactive: {
    backgroundColor: "#CBD5E0",
  },
  avatarArquivado: {
    backgroundColor: "#CBD5E0",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  avatarTextInactive: { color: "#718096" },
  avatarTextArquivado: { color: "#718096" },

  cardInfo: { flex: 1 },

  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2D3748",
    marginBottom: 4,
  },
  especialidade: {
    fontSize: 14,
    color: "#4A5568",
    fontWeight: "500",
  },

  textInactive: { color: "#718096" },
  textArquivado: { color: "#718096" },

  /* ===== Footer do Card ===== */
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  idText: {
    fontSize: 12,
    color: "#718096",
    fontWeight: "500",
  },

  /* ================================
   *   CONTADORES
   * ================================ */
  statusCount: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 4,
  },
  activeCount: {
    fontSize: 14,
    color: "#38A169",
    fontWeight: "500",
  },
  inactiveCount: {
    fontSize: 14,
    color: "#D69E2E",
    fontWeight: "500",
  },
  arquivadoCount: {
    fontSize: 14,
    color: "#718096",
    fontWeight: "500",
  },

  /* ================================
   *   CAMPO DE BUSCA
   * ================================ */
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#2D3748",
    padding: 0,
    marginRight: 8,
  },
  searchIcon: { fontSize: 16, color: "#A0AEC0" },
  clearButton: { padding: 4 },
  clearButtonText: {
    fontSize: 16,
    color: "#A0AEC0",
    fontWeight: "bold",
  },

  clearSearchButton: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#3182CE",
    borderRadius: 8,
  },
  clearSearchText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  /* ================================
   *   EMPTY STATE
   * ================================ */
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2D3748",
    marginBottom: 8,
    textAlign: "center",
  },
  emptyStateText: {
    fontSize: 14,
    color: "#718096",
    lineHeight: 20,
    textAlign: "center",
  },

  /* ================================
   *   LOADING
   * ================================ */
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7FAFC",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#2D3748",
    fontWeight: "500",
  },
});
