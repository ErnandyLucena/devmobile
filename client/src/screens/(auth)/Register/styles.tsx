// styles.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: "#fff",
    justifyContent: "flex-start", 
    paddingTop: 80, 
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
    color: "#809CFF",
    fontFamily: "sans-serif-condensed"
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
});