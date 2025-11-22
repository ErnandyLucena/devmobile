import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
    color: "#333",
    fontFamily: "sans-serif-condensed"
  },
  formContainer: {
    gap: 20,
  },
  inputContainer: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4C4C4C",
    fontFamily: "sans-serif-condensed"
  },
  input: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#ECF1FF",
    color: "#343434ff",
  },
  registerButton: {
    backgroundColor: "#2B5BFF",
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    height: 50,
    width: 300,
    alignSelf: "center",
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  loginText: {
    color: "#666",
    fontSize: 16,
    fontFamily: "sans-serif-condensed"
  },
  loginLink: {
    color: "#2B5BFF",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "sans-serif-condensed"
  },
  typeButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#666",
    borderRadius: 8,
  },

  typeButtonSelected: {
    backgroundColor: "#2B5BFF",
    borderColor: "#2B5BFF",
  },

  typeButtonText: {
    color: "#333",
  },

  typeButtonTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  passwordWrapper: {
    position: "relative",
    justifyContent: "center",
  },

  eyeButton: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: [{ translateY: -12 }],
    padding: 4,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});