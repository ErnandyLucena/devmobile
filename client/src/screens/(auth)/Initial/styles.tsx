import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  image: {
    width: "100%",
    height: 260,
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 60,
    color: "#666",
    lineHeight: 22,
    fontFamily: "sans-serif-condensed"
  },
  buttonContainer: {
    gap: 12,
  },
   loginButton: {
    backgroundColor: '#2D6CDF',
    width: '70%',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  registerButton: {
    backgroundColor: '#E5EEFF',
    width: '70%',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center'
  },
  registerText: {
    color: '#2260FF',
    fontSize: 16,
    fontWeight: '600',
  },
});