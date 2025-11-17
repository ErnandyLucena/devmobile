import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 60,
    marginBottom: 40,
  },
  formContainer: {
    gap: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#333",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#2B5BFF",
    borderRadius: 4,
  },
  link: {
    textAlign: "center",
    color: "#2B5BFF",
    marginTop: 16,
    fontSize: 16,
    fontWeight: "500",
  },
});