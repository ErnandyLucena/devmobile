import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  // Layout principal
  container: {
    flex: 1,
    backgroundColor: "#F7FAFC",
  },
  
  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2D3748",
  },
  headerRight: {
    width: 40,
  },
  
  // Scroll e conteúdo
  scrollView: {
    flex: 1,
    backgroundColor: "#F7FAFC",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  
  // Seções do formulário
  formSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D3748",
    marginBottom: 20,
  },
  
  // Inputs
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4A5568",
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#2D3748",
    backgroundColor: "#FFFFFF",
  },
  helperText: {
    fontSize: 12,
    color: "#718096",
    marginTop: 4,
    fontStyle: 'italic',
  },
  
  // Seção de informações (para edição)
  infoSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4A5568",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: "#2D3748",
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  
  // Botões de ação
  actionsSection: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E53E3E",
  },
  saveButton: {
    backgroundColor: "#2B5BFF",
    shadowColor: "#2B5BFF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  saveButtonDisabled: {
    backgroundColor: "#A0AEC0",
    shadowOpacity: 0,
    elevation: 0,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF", // CORRIGIDO: Texto em branco para todos os botões de ação
  },
  cancelButtonText: {
    color: "#E53E3E", // Texto vermelho apenas para o botão cancelar
  },
  saveButtonText: {
    color: "#FFFFFF", // Texto branco para o botão salvar
  },
  
  // Estados de carregamento
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#F7FAFC",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#4A5568',
    fontWeight: '500',
  },
  
  // Modal styles (se necessário)
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#4A5568',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});