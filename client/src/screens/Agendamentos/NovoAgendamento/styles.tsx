import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  scrollView: {
    flex: 1,
    padding: 20,
  },

  inputGroup: {
    marginBottom: 18,
  },

  inputLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2D3748",
    marginBottom: 6,
  },

  textInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#2D3748",
    borderWidth: 1,
    borderColor: "#E2E8F0",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },

  textArea: {
    minHeight: 110,
    textAlignVertical: "top",
  },

  /* ================================
       SELETOR DE PACIENTE
  ================================= */
  pacienteSelector: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },

  pacienteSelecionadoNome: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2D3748",
  },

  pacienteSelecionadoCpf: {
    fontSize: 13,
    color: "#718096",
  },

  /* ================================
       MODAL
  ================================= */
  modalContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 50,
  },

  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2D3748",
  },

  searchInput: {
    backgroundColor: "#F5F7FA",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: "#2D3748",
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  pacienteItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  pacienteNome: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2D3748",
  },

  pacienteCpf: {
    fontSize: 14,
    color: "#718096",
    marginTop: 2,
  },

  /* ================================
        BOTÃO SALVAR
  ================================= */
  saveButton: {
    marginTop: 26,
    backgroundColor: "#2B5BFF",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",

    shadowColor: "#2B5BFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },

  saveButtonDisabled: {
    backgroundColor: "#A0AEC0",
    shadowColor: "#ff0000ff",
  },
   cancelButton: {
    marginTop: 12,
    backgroundColor: "#ffffffff",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",

    shadowColor: "#c0a0a0ff",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },

  cancelButtonText: {
    color: "#ff0000ff",
    fontWeight: "700",
    fontSize: 16,
  },
});
