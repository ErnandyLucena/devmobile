// styles.ts
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
    paddingBottom: 110,
  },
  form: {
    padding: 20,
    gap: 20,
  },

  // Estados de carregamento
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#4A5568",
    fontWeight: "500",
  },

  // Card do paciente
  patientCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderLeftWidth: 4,
    borderLeftColor: "#2B5BFF",
  },
  patientName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D3748",
    marginBottom: 8,
  },
  consultInfo: {
    fontSize: 14,
    color: "#718096",
    marginBottom: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  consultType: {
    fontSize: 14,
    color: "#718096",
    flexDirection: "row",
    alignItems: "center",
  },

  // Inputs
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2D3748",
  },
  textInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: "#4A5568",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  helperText: {
    fontSize: 12,
    color: "#718096",
    fontStyle: "italic",
    marginTop: 4,
  },


  rowButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    flex: 1,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
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

  saveButtonDisabled: {
    backgroundColor: "#A0AEC0",
    shadowColor: "#A0AEC0",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },


  dangerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonDisabled: {
    opacity: 0.5,
  },

  buttonsContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },

  saveButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: "#2B5BFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2B5BFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "row",
    gap: 8,
  },
  dangerButton: {
    flex: 1, 
    paddingVertical: 16, 
    borderRadius: 8,
    backgroundColor: "#E53E3E",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

});
