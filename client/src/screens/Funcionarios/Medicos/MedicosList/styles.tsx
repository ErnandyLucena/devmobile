import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FAFC",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
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
  novoBtn: {
    backgroundColor: "#2B5BFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: "#2B5BFF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
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
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
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
  avatarText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  cardInfo: {
    flex: 1,
  },
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
    textAlign: "center",
    lineHeight: 20,
  },

  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: '#F7FAFC',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2D3748',
  },
  searchIcon: {
    fontSize: 16,
    color: '#A0AEC0',
    marginLeft: 8,
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#A0AEC0',
    fontWeight: 'bold',
  },
  cardInactive: {
    backgroundColor: '#F7FAFC',
    borderColor: '#E2E8F0',
    opacity: 0.8,
  },
  avatarInactive: {
    backgroundColor: '#CBD5E0',
  },
  avatarTextInactive: {
    color: '#718096',
  },
  textInactive: {
    color: '#718096',
  },
  statusCount: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  activeCount: {
    fontSize: 14,
    color: '#38A169',
    fontWeight: '500',
  },
  inactiveCount: {
    fontSize: 14,
    color: '#718096',
  },
  clearSearchButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#3182CE',
    borderRadius: 8,
  },
  clearSearchText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
   sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F7FAFC",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D3748",
  },

  cardArquivado: {
    backgroundColor: '#F7FAFC',
    borderColor: '#E2E8F0',
    opacity: 0.7,
  },
  avatarArquivado: {
    backgroundColor: '#CBD5E0',
  },
  avatarTextArquivado: {
    color: '#718096',
  },
  textArquivado: {
    color: '#718096',
  },
  arquivadoCount: {
    fontSize: 14,
    color: '#718096',
  },
  arquivadosSection: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#718096',
  },
  arquivadosTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#718096",
    marginBottom: 12,
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#F7FAFC",
  },
  // Campo de Busca
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#F7FAFC',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2D3748',
    padding: 0,
  },
  searchIcon: {
    fontSize: 16,
    color: '#A0AEC0',
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#A0AEC0',
    fontWeight: 'bold',
  },
  // Header ajustado
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: "#F7FAFC",
  },
  // ... outros estilos permanecem iguais ...
  statusCount: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
    flexWrap: 'wrap',
  },
  activeCount: {
    fontSize: 14,
    color: '#38A169',
    fontWeight: '500',
  },
  inactiveCount: {
    fontSize: 14,
    color: '#D69E2E',
    fontWeight: '500',
  },
  arquivadoCount: {
    fontSize: 14,
    color: '#718096',
    fontWeight: '500',
  },
  clearSearchButton: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#3182CE',
    borderRadius: 8,
  },
  clearSearchText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  // ... outros estilos existentes ...
  container: {
    flex: 1,
    backgroundColor: "#F7FAFC",
  },
  // Campo de Busca
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#F7FAFC',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2D3748',
    padding: 0,
    marginRight: 8,
  },
  clearButton: {
    padding: 2,
  },
  // Header ajustado
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: "#F7FAFC",
  },
  // ... outros estilos permanecem iguais ...
  statusCount: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
    flexWrap: 'wrap',
  },
  activeCount: {
    fontSize: 14,
    color: '#38A169',
    fontWeight: '500',
  },
  inactiveCount: {
    fontSize: 14,
    color: '#D69E2E',
    fontWeight: '500',
  },
  arquivadoCount: {
    fontSize: 14,
    color: '#718096',
    fontWeight: '500',
  },
  clearSearchButton: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#3182CE',
    borderRadius: 8,
  },
  clearSearchText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  // ... outros estilos existentes ...

});