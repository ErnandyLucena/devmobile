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
    paddingBottom: 120, 
  },
  patientCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  patientName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2D3748",
    marginBottom: 4,
  },
  dateTimeContainer: {
    marginTop: 8,
  },
  dateTimeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateTimeLabel: {
    fontSize: 14,
    color: "#718096",
    fontWeight: "500",
  },
  dateTimeValue: {
    fontSize: 12,
    color: "#4A5568",
    fontWeight: "600",
    textAlign: "right",
    flexShrink: 1,
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  typeLabel: {
    fontSize: 14,
    color: "#718096",
    fontWeight: "500",
  },
  consultType: {
    fontSize: 14,
    color: "#2B5BFF",
    fontWeight: "600",
  },
  form: {
    gap: 20,
    marginBottom: 24,
  },
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
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  autoInfoSection: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
  },
  autoInfoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#718096",
    marginBottom: 12,
  },
  autoInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 6,
  },
  autoInfoLabelContainer: {
    flex: 1,
  },
  autoInfoValueContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  autoInfoLabel: {
    fontSize: 14,
    color: "#718096",
    fontWeight: "500",
  },
  autoInfoValue: {
    fontSize: 14,
    color: "#4A5568",
    fontWeight: "600",
    textAlign: "right",
  },
  autoInfoSubValue: {
    fontSize: 12,
    color: "#A0AEC0",
    fontWeight: "400",
    marginTop: 2,
  },
  saveButton: {
    backgroundColor: "#38A169",
    paddingVertical: 16,
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
  },
  saveButtonDisabled: {
    backgroundColor: "#A0AEC0",
    shadowColor: "#A0AEC0",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});