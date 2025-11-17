import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    height: 70,
    backgroundColor: "#2D3ED6",
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  hourBox: {
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 4,
  },
  hourText: {
    color: "#000",
    fontWeight: "700",
  },
  title: { color: "#fff", fontWeight: "600" },
  patient: { color: "#F0F0F0", fontSize: 12 },
});
