import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  novoButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2D3ED6",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  novoButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  agendamentosList: {
    paddingHorizontal: 20,
    gap: 10,
  },
});