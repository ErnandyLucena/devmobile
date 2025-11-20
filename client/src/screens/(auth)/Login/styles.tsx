// styles.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: "#fff",
    justifyContent: "flex-start", 
    paddingTop: 150, 
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
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  forgotPasswordText: {
    color: "#2260FF",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "sans-serif-condensed"
  },
  loginButton: {
    backgroundColor: "#2B5BFF",
    borderRadius: 25, 
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    height: 50, 
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "sans-serif-condensed",
  },
  divider: {
    textAlign: "center",
    color: "#666",
    marginVertical: 20,
    fontSize: 14,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  registerText: {
    color: "#666",
    fontSize: 16,
    fontFamily: "sans-serif-condensed"
  },
  registerLink: {
    color: "#2B5BFF",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "sans-serif-condensed"
  },
});